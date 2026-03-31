import { useState, useEffect } from 'react'
import './ContactModal.css'

const ContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        reason: 'Project Inquiry',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setIsSuccess(false)
            setFormData({
                email: '',
                reason: 'Project Inquiry',
                message: ''
            })
        }
    }, [isOpen])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate sending email
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)

            // Auto close after success
            setTimeout(() => {
                onClose()
            }, 3000)
        }, 1500)
    }

    if (!isOpen) return null

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Let's Chat! 👋</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    {isSuccess ? (
                        <div className="success-message">
                            <span className="success-icon">✨</span>
                            <h3>Message Sent!</h3>
                            <p>Thanks for reaching out. I'll get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="hello@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reason">Reason for Contacting</label>
                                <select
                                    id="reason"
                                    name="reason"
                                    className="form-control"
                                    value={formData.reason}
                                    onChange={handleChange}
                                >
                                    <option value="Project Inquiry">New Project Inquiry 🚀</option>
                                    <option value="Job Opportunity">Job Opportunity 💼</option>
                                    <option value="Collaboration">Collaboration 🤝</option>
                                    <option value="Just Saying Hi">Just Saying Hi 👋</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-control"
                                    placeholder="Tell me about your project or idea..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message →'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContactModal
