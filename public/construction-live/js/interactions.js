/**
 * BuildIQ Global Interactions Handler
 * Makes every button, tab, and interactive element functional across all modules.
 */
class BuildIQInteractions {
    constructor() {
        this.toastContainer = null;
        this._createToastContainer();
        this._bindGlobal();
    }

    _createToastContainer() {
        this.toastContainer = document.createElement('div');
        this.toastContainer.id = 'toast-container';
        Object.assign(this.toastContainer.style, {
            position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
            zIndex: '9999', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center'
        });
        document.body.appendChild(this.toastContainer);
    }

    toast(msg, tone = 'info') {
        const t = document.createElement('div');
        const colors = { success: '#35d07f', danger: '#ff5a5f', warning: '#ffd166', info: '#39a7ff' };
        Object.assign(t.style, {
            padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
            color: '#fff', background: colors[tone] || colors.info, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            opacity: '0', transform: 'translateY(10px)', transition: 'all 0.3s ease', whiteSpace: 'nowrap'
        });
        t.textContent = msg;
        this.toastContainer.appendChild(t);
        requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
        setTimeout(() => {
            t.style.opacity = '0'; t.style.transform = 'translateY(10px)';
            setTimeout(() => t.remove(), 300);
        }, 2500);
    }

    _btnFeedback(btn, text, tone, resetMs = 2000) {
        const orig = btn.innerHTML;
        const origBorder = btn.style.borderColor;
        const origColor = btn.style.color;
        const iconMap = { success: 'check-circle', warning: 'loader', info: 'check', danger: 'x-circle' };
        btn.innerHTML = `<i data-lucide="${iconMap[tone] || 'check'}"></i> ${text}`;
        btn.style.borderColor = `var(--${tone})`;
        btn.style.color = `var(--${tone})`;
        if (window.lucide) lucide.createIcons();
        if (resetMs > 0) {
            setTimeout(() => {
                btn.innerHTML = orig;
                btn.style.borderColor = origBorder;
                btn.style.color = origColor;
                if (window.lucide) lucide.createIcons();
            }, resetMs);
        }
    }

    _bindGlobal() {
        document.getElementById('workspace')?.addEventListener('click', (e) => {
            const btn = e.target.closest('button, .badge[style*="cursor"], .task-card-mini, .role-option');
            if (!btn) return;

            // Skip if already handled by drone interactions
            if (btn.id && btn.id.startsWith('drone-')) return;
            if (btn.dataset.dismissAlert !== undefined) return;
            if (btn.dataset.feedIndex !== undefined) return;

            const text = btn.textContent.trim();
            const parentTop = btn.closest('.card-top');

            // ─── TAB / FILTER BADGES ───
            if (this._handleTabs(btn, text)) return;

            // ─── TABLE ACTION BUTTONS ───
            if (this._handleTableActions(btn, text)) return;

            // ─── PAGE ACTION BUTTONS (top-right) ───
            if (btn.closest('.page-actions') && this._handlePageActions(btn, text)) return;

            // ─── CARD-LEVEL BUTTONS ───
            if (this._handleCardButtons(btn, text)) return;

            // ─── TASK CARDS ───
            if (this._handleTaskCards(btn, e)) return;

            // ─── WORKER QUICK ACTIONS ───
            if (this._handleWorkerActions(btn, text)) return;

            // ─── NOTIFICATION CHECKBOXES ───
            if (btn.closest('.metric-row') && btn.type === 'checkbox') return;

            // ─── COMMS CHANNEL CLICK ───
            if (this._handleCommsChannel(btn, e)) return;

            // ─── GENERIC FALLBACK for any unhandled btn ───
            if (btn.tagName === 'BUTTON' && !btn.dataset.handled) {
                this._handleGeneric(btn, text);
            }
        });
    }

    // ─── TAB / FILTER BADGES ───
    _handleTabs(btn, text) {
        const tabRow = btn.closest('div[style*="border-bottom"], .card-top');
        if (!tabRow) return false;
        const isTab = (btn.classList.contains('badge') && tabRow.style.cssText?.includes('border-bottom')) ||
                      (btn.classList.contains('badge') && tabRow.classList.contains('card-top') && btn.parentElement.style.cssText?.includes('gap'));

        if (!isTab) return false;

        const siblings = btn.parentElement.querySelectorAll('.badge');
        if (siblings.length < 2) return false;

        siblings.forEach(s => {
            s.className = 'badge ghost';
            s.style.borderColor = 'var(--border)';
        });
        btn.className = 'badge info';
        btn.style.borderColor = '';
        this.toast(`Switched to: ${text}`, 'info');
        return true;
    }

    // ─── TABLE ACTIONS (Review, View, Download, Receipt, Pay, more-horizontal) ───
    _handleTableActions(btn, text) {
        if (!btn.closest('table, .data-table')) return false;

        if (text.includes('Review')) {
            this._btnFeedback(btn, 'Reviewed', 'success');
            this.toast('Vendor review opened', 'info');
        } else if (text.includes('Pay Now')) {
            this._btnFeedback(btn, 'Processing...', 'warning', 0);
            setTimeout(() => {
                this._btnFeedback(btn, 'Paid', 'success', 0);
                const statusCell = btn.closest('tr')?.querySelector('.badge');
                if (statusCell) { statusCell.className = 'badge success'; statusCell.textContent = 'Paid'; }
                this.toast('Payment processed successfully', 'success');
            }, 1500);
        } else if (text.includes('Receipt')) {
            this._btnFeedback(btn, 'Downloaded', 'success');
            this.toast('Receipt PDF downloaded', 'success');
        } else if (btn.querySelector('[data-lucide="eye"]')) {
            this.toast('Document preview opened', 'info');
        } else if (btn.querySelector('[data-lucide="download"]')) {
            this._btnFeedback(btn, '✓', 'success');
            this.toast('File downloaded', 'success');
        } else if (btn.querySelector('[data-lucide="more-horizontal"]')) {
            this.toast('User options menu', 'info');
        } else {
            return false;
        }
        return true;
    }

    // ─── PAGE HEADER ACTIONS ───
    _handlePageActions(btn, text) {
        const map = {
            'Export Data': ['Data export started', 'success'],
            'Add Site': ['New site wizard opened', 'info'],
            'Share Report': ['Report link copied to clipboard', 'success'],
            'New Action': ['Action created', 'success'],
            'ESG Report': ['ESG Report generating...', 'info'],
            'Upload DWG/Revit': ['File browser opened', 'info'],
            'Run Auto-Check': ['AI verification running...', 'warning'],
            'Create Task': ['New task dialog opened', 'info'],
            'Templates': ['Template gallery opened', 'info'],
            'New Project': ['New project wizard started', 'info'],
            'Add Member': ['Invite member dialog opened', 'info'],
            'CSV Export': ['CSV file downloaded', 'success'],
            'Download Report': ['Report PDF generated', 'success'],
            'Generate Report': ['Report engine started...', 'warning'],
            'Mark All Read': ['All notifications marked as read', 'success'],
            'Save Changes': ['Settings saved successfully', 'success'],
            'Permissions': ['Permission matrix opened', 'info'],
            'Add User': ['Invite user form opened', 'info'],
            'This Quarter': ['Showing Q2 2026 data', 'info'],
            'Broadcast': ['Broadcast message dialog opened', 'info'],
            'New Request': ['Material request form opened', 'info'],
            'View Live Feed': ['Switching to Drone Center...', 'info'],
            'Download Full Report': ['Full report PDF generated', 'success'],
            'Upload File': ['File upload dialog opened', 'info'],
            'Make Payment': ['Payment gateway opened', 'info'],
        };

        for (const [key, [msg, tone]] of Object.entries(map)) {
            if (text.includes(key)) {
                this._btnFeedback(btn, key.includes('Download') || key.includes('Export') || key.includes('Save') || key.includes('Mark') ? 'Done!' : key, 'success');
                this.toast(msg, tone);
                // Navigate to drone for "View Live Feed"
                if (key === 'View Live Feed' && window.app) {
                    setTimeout(() => window.app.switchModule('drone'), 800);
                }
                return true;
            }
        }
        return false;
    }

    // ─── CARD-LEVEL BUTTONS ───
    _handleCardButtons(btn, text) {
        // Plan checker verification results
        if (text.includes('Generate Audit Report')) {
            this._btnFeedback(btn, 'Generating...', 'warning', 0);
            setTimeout(() => {
                this._btnFeedback(btn, 'Audit Report Ready', 'success', 3000);
                this.toast('Audit report generated — 2 violations flagged', 'success');
            }, 2000);
            return true;
        }
        // Waste Review Action Plan
        if (text.includes('Review Action Plan')) {
            this._btnFeedback(btn, 'Plan Opened', 'success');
            this.toast('Concrete waste action plan loaded', 'info');
            return true;
        }
        // Project View Details
        if (text.includes('View details')) {
            this.toast('Project details panel opened', 'info');
            return true;
        }
        // Archive Project
        if (text.includes('Archive')) {
            const card = btn.closest('.card');
            if (card) {
                card.style.opacity = '0.4';
                card.style.pointerEvents = 'none';
            }
            this.toast('Project archived successfully', 'success');
            return true;
        }
        // Kanban Add Card
        if (text.includes('Add card')) {
            const col = btn.closest('div[style*="flex-direction:column"]');
            if (col) {
                const taskArea = col.querySelector('div[style*="min-height"]');
                if (taskArea) {
                    const newCard = document.createElement('div');
                    newCard.className = 'card';
                    newCard.style.cssText = 'padding:16px; cursor:grab; border-top:3px solid var(--accent); transition:all 0.2s; opacity:0; transform:translateY(10px);';
                    newCard.innerHTML = `
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <div class="badge info" style="font-size:10px; padding:2px 6px;">new</div>
                            <i data-lucide="more-horizontal" style="width:16px; color:var(--text-muted);"></i>
                        </div>
                        <strong style="font-size:14px; display:block; margin-bottom:12px; line-height:1.4;">New Task (click to edit)</strong>
                        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:12px;">
                            <div style="display:flex; align-items:center; gap:6px;">
                                <div class="avatar" style="width:20px; height:20px; font-size:9px;">ME</div>
                                <span style="font-size:11px; color:var(--text-muted);">You</span>
                            </div>
                        </div>`;
                    taskArea.appendChild(newCard);
                    if (window.lucide) lucide.createIcons();
                    requestAnimationFrame(() => { newCard.style.opacity = '1'; newCard.style.transform = 'translateY(0)'; });
                    // Update counter
                    const counter = col.querySelector('span[style*="padding:2px 8px"]');
                    if (counter) counter.textContent = parseInt(counter.textContent) + 1;
                }
            }
            this.toast('New card added', 'success');
            return true;
        }
        // Reports PDF/Excel/Share
        if (text.includes('PDF')) {
            this._btnFeedback(btn, 'Downloaded', 'success');
            this.toast('PDF report downloaded', 'success');
            return true;
        }
        if (text.includes('Excel')) {
            this._btnFeedback(btn, 'Downloaded', 'success');
            this.toast('Excel spreadsheet downloaded', 'success');
            return true;
        }
        if (text.includes('Share')) {
            this._btnFeedback(btn, 'Link Copied', 'success');
            this.toast('Share link copied to clipboard', 'success');
            return true;
        }
        // Check In/Out (Worker)
        if (text.includes('Check Out') || text.includes('Slide to Check Out')) {
            this._btnFeedback(btn, 'Checked Out ✓', 'success', 0);
            this.toast('You have checked out. See you tomorrow!', 'success');
            return true;
        }
        // Filter button (Payments)
        if (text.includes('Filter')) {
            this.toast('Filters applied: All invoices', 'info');
            return true;
        }
        // Report Hazard
        if (text.includes('Report Hazard')) {
            this._btnFeedback(btn, 'Hazard Reported!', 'warning', 3000);
            this.toast('Safety hazard report submitted to site officer', 'danger');
            return true;
        }
        // Phone call buttons
        if (btn.querySelector('[data-lucide="phone"]')) {
            this.toast('Initiating call...', 'info');
            return true;
        }
        // Comms send button
        if (btn.querySelector('[data-lucide="send"]')) {
            const input = btn.parentElement?.querySelector('input');
            if (input && input.value.trim()) {
                const msgArea = btn.closest('.card')?.querySelector('div[style*="display:grid"]');
                if (msgArea) {
                    const msgDiv = document.createElement('div');
                    msgDiv.style.cssText = 'padding:14px; border:1px solid var(--accent); border-radius:var(--radius-md); background:rgba(255,122,26,0.05); opacity:0; transform:translateY(8px); transition:all 0.3s;';
                    msgDiv.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:6px"><strong style="font-size:13px">You</strong><span style="font-size:11px;color:var(--text-dim)">Just now</span></div><p style="font-size:13px;color:var(--text-secondary)">${input.value}</p>`;
                    msgArea.appendChild(msgDiv);
                    requestAnimationFrame(() => { msgDiv.style.opacity = '1'; msgDiv.style.transform = 'translateY(0)'; });
                    input.value = '';
                }
                this.toast('Message sent', 'success');
            } else {
                this.toast('Type a message first', 'warning');
            }
            return true;
        }
        // Plan checker zoom
        if (btn.querySelector('[data-lucide="zoom-in"]')) {
            const bp = document.querySelector('.plan-blueprint');
            if (bp) { const s = parseFloat(bp.dataset.zoom || 1); bp.dataset.zoom = s + 0.15; bp.style.transform = `scale(${s + 0.15})`; bp.style.transformOrigin = 'center'; }
            this.toast('Zoomed in', 'info');
            return true;
        }
        if (btn.querySelector('[data-lucide="zoom-out"]')) {
            const bp = document.querySelector('.plan-blueprint');
            if (bp) { const s = parseFloat(bp.dataset.zoom || 1); bp.dataset.zoom = Math.max(0.5, s - 0.15); bp.style.transform = `scale(${Math.max(0.5, s - 0.15)})`; }
            this.toast('Zoomed out', 'info');
            return true;
        }
        return false;
    }

    // ─── TASK CARDS (Kanban) ───
    _handleTaskCards(btn, e) {
        const taskCard = e.target.closest('.card[style*="cursor:grab"], .card[style*="cursor: grab"]');
        if (!taskCard) return false;
        const moreIcon = e.target.closest('[data-lucide="more-horizontal"]');
        if (moreIcon) {
            this.toast('Task menu: Edit / Move / Delete', 'info');
            return true;
        }
        return false;
    }

    // ─── WORKER QUICK ACTIONS ───
    _handleWorkerActions(btn, text) {
        const quickMap = {
            'Upload Work': ['Work photo upload opened', 'info'],
            'Request Material': ['Material request form opened', 'info'],
            'Report Hazard': ['Hazard report submitted', 'danger'],
            'Msg Engineer': ['Message to Engineer sent', 'success']
        };
        for (const [key, [msg, tone]] of Object.entries(quickMap)) {
            if (text.includes(key)) {
                this._btnFeedback(btn, '✓ Done', 'success');
                this.toast(msg, tone);
                return true;
            }
        }
        return false;
    }

    // ─── COMMS CHANNEL SELECT ───
    _handleCommsChannel(btn, e) {
        const channelItem = e.target.closest('.task-card-mini[style*="cursor"]');
        if (!channelItem) return false;
        const card = channelItem.closest('.card');
        if (!card) return false;

        // Highlight selected channel
        card.querySelectorAll('.task-card-mini').forEach(c => c.style.background = '');
        channelItem.style.background = 'rgba(255,122,26,0.08)';

        const channelName = channelItem.querySelector('h4')?.textContent;
        if (channelName) {
            // Update the chat header
            const chatCard = card.nextElementSibling;
            if (chatCard) {
                const header = chatCard.querySelector('.card-top span');
                if (header) header.textContent = channelName;
            }
            this.toast(`Switched to: ${channelName}`, 'info');
        }
        return true;
    }

    // ─── BLUEPRINT CHECK MARKERS ───
    _handleCheckMarkers() {
        document.addEventListener('click', (e) => {
            const marker = e.target.closest('.check-marker');
            if (!marker) return;
            if (marker.classList.contains('fail')) {
                this.toast('Violation: See verification panel for details', 'danger');
            } else {
                this.toast('This area passed all IS code checks', 'success');
            }
        });
    }

    // ─── GENERIC FALLBACK ───
    _handleGeneric(btn, text) {
        if (text.length > 1 && text.length < 50) {
            btn.dataset.handled = 'true';
            // Skip if it looks like pure text label
            if (!btn.classList.contains('badge') || btn.parentElement.style.cssText?.includes('border-bottom')) return;
        }
    }
}

// Also handle notification toggles and check markers
document.addEventListener('DOMContentLoaded', () => {
    window.biqInteractions = new BuildIQInteractions();
    window.biqInteractions._handleCheckMarkers();
});
