import { useState } from 'react'
import './Logo.css'

const Logo = () => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <a
            href="#"
            className={`logo ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="logo-container">
                {/* Animated background circle */}
                <div className="logo-bg"></div>

                {/* Letter A */}
                <span className="logo-letter logo-a">A</span>

                {/* Letter U */}
                <span className="logo-letter logo-u">U</span>

                {/* Letter H */}
                <span className="logo-letter logo-h">H</span>

                {/* Dot with glow */}
                <span className="logo-dot">
                    <span className="dot-inner"></span>
                </span>
            </div>
        </a>
    )
}

export default Logo
