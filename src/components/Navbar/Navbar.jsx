"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth"
import { auth } from "../../lib/firebase"
import "./Navbar.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    displayName: "",
    photoURL: "",
  })
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        setEditForm({
          displayName: currentUser.displayName || "",
          photoURL: currentUser.photoURL || "",
        })
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      setIsEditing(false) // Reset edit mode when modal closes
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleProfileClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("profile-modal-overlay")) {
      setIsAnimating(false)
      setTimeout(() => {
        setIsModalOpen(false)
      }, 300)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    setIsModalOpen(false)
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    if (!isEditing && user) {
      // Reset form when entering edit mode
      setEditForm({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    if (!user) return

    setIsUpdating(true)
    try {
      await updateProfile(user, {
        displayName: editForm.displayName.trim() || null,
        photoURL: editForm.photoURL.trim() || null,
      })

      // Force a refresh of the user object
      await user.reload()

      setIsEditing(false)

      // Show success message (optional)
      console.log("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      // You could add error handling UI here
    } finally {
      setIsUpdating(false)
    }
  }

  const getInitials = (name) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() || "U"
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatJoinDate = () => {
    if (user?.metadata?.creationTime) {
      const date = new Date(user.metadata.creationTime)
      return `Member since ${date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`
    }
    return "Welcome to HomeScope360!"
  }

  const getProviderInfo = () => {
    if (user?.providerData && user.providerData.length > 0) {
      const provider = user.providerData[0]
      if (provider.providerId === "google.com") {
        return { name: "Google", icon: "🔗" }
      } else if (provider.providerId === "password") {
        return { name: "Email", icon: "📧" }
      }
    }
    return { name: "Email", icon: "📧" }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/" className="navbar-logo-link">
              HomeScope360
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="navbar-links">
            <li>
              <Link to="/how-it-works-buy" className="navbar-link">
                How it works
              </Link>
            </li>
            <li>
              <Link to="/home-insight" className="navbar-link">
                Home insights
              </Link>
            </li>
            <li>
              <Link to="/browse-homes" className="navbar-link">
                Browse homes
              </Link>
            </li>
          </ul>

          <div className="navbar-auth">
            {user ? (
              <>
                <button className="navbar-user-icon-btn" onClick={handleProfileClick}>
                  {user.photoURL ? (
                    <img src={user.photoURL || "/placeholder.svg"} alt="User" className="navbar-user-img" />
                  ) : (
                    <span className="navbar-user-svg-icon" aria-label="User icon">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18" cy="18" r="17" stroke="#333" strokeWidth="2" fill="white" />
                        <circle cx="18" cy="14" r="6" fill="#333" />
                        <path d="M6 29c0-4.418 5.373-8 12-8s12 3.582 12 8" fill="#333" />
                      </svg>
                    </span>
                  )}
                </button>
              </>
            ) : (
              <Link to="/auth" className="sign-in-link">
                Sign in
              </Link>
            )}
            <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? "show" : ""}`}>
          <ul className="mobile-links">
            <li>
              <Link to="/how-it-works-buy" className="mobile-link" onClick={toggleMenu}>
                How it works
              </Link>
            </li>
            <li>
              <Link to="/home-insight" className="mobile-link" onClick={toggleMenu}>
                Home insights
              </Link>
            </li>
            <li>
              <Link to="/browse-homes" className="mobile-link" onClick={toggleMenu}>
                Browse homes
              </Link>
            </li>
            <li className="sign-in-mobile">
              {user ? (
                <button className="navbar-user-icon-btn" onClick={handleProfileClick}>
                  {user.photoURL ? (
                    <img src={user.photoURL || "/placeholder.svg"} alt="User" className="navbar-user-img" />
                  ) : (
                    <span className="navbar-user-svg-icon" aria-label="User icon">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18" cy="18" r="17" stroke="#333" strokeWidth="2" fill="white" />
                        <circle cx="18" cy="14" r="6" fill="#333" />
                        <path d="M6 29c0-4.418 5.373-8 12-8s12 3.582 12 8" fill="#333" />
                      </svg>
                    </span>
                  )}
                </button>
              ) : (
                <Link to="/auth" className="mobile-link" onClick={toggleMenu}>
                  Sign in
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Professional Profile Modal */}
      {user && isModalOpen && (
        <div className={`profile-modal-overlay ${isAnimating ? "active" : ""}`} onClick={handleCloseModal}>
          <div
            className={`profile-modal-container ${isAnimating ? "active" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="profile-modal-close"
              onClick={() => {
                setIsAnimating(false)
                setTimeout(() => setIsModalOpen(false), 300)
              }}
              aria-label="Close profile modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Header Section */}
            <div className="profile-modal-header">
              <div className="profile-modal-avatar-container">
                {(isEditing ? editForm.photoURL : user.photoURL) ? (
                  <img
                    src={(isEditing ? editForm.photoURL : user.photoURL) || "/placeholder.svg"}
                    alt="Profile"
                    className="profile-modal-avatar"
                  />
                ) : (
                  <div className="profile-modal-avatar-placeholder">
                    {getInitials(isEditing ? editForm.displayName : user.displayName)}
                  </div>
                )}
                <div className="profile-modal-status-indicator"></div>
              </div>

              <div className="profile-modal-user-info">
                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="profile-edit-form">
                    <input
                      type="text"
                      name="displayName"
                      value={editForm.displayName}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="profile-edit-input profile-edit-name"
                    />
                    <input
                      type="url"
                      name="photoURL"
                      value={editForm.photoURL}
                      onChange={handleInputChange}
                      placeholder="Profile photo URL (optional)"
                      className="profile-edit-input profile-edit-photo"
                    />
                    <div className="profile-edit-buttons">
                      <button type="submit" className="profile-edit-save" disabled={isUpdating}>
                        {isUpdating ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        className="profile-edit-cancel"
                        onClick={handleEditToggle}
                        disabled={isUpdating}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2 className="profile-modal-name">{user.displayName || "HomeScope360 Member"}</h2>
                    <p className="profile-modal-email">{user.email}</p>
                    <div className="profile-modal-provider">
                      <span className="profile-modal-provider-icon">{getProviderInfo().icon}</span>
                      <span className="profile-modal-provider-text">Signed in with {getProviderInfo().name}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Account Information */}
            <div className="profile-modal-info">
              <div className="profile-modal-info-item">
                <div className="profile-modal-info-label">Account Status</div>
                <div className="profile-modal-info-value">
                  <span className="profile-modal-status-badge">Active</span>
                </div>
              </div>
              <div className="profile-modal-info-item">
                <div className="profile-modal-info-label">Email Verified</div>
                <div className="profile-modal-info-value">
                  <span
                    className={`profile-modal-verification-badge ${user.emailVerified ? "verified" : "unverified"}`}
                  >
                    {user.emailVerified ? "✓ Verified" : "⚠ Pending"}
                  </span>
                </div>
              </div>
              <div className="profile-modal-info-item">
                <div className="profile-modal-info-label">Member Since</div>
                <div className="profile-modal-info-value">{formatJoinDate()}</div>
              </div>
            </div>

            {/* Profile Management */}
            <div className="profile-modal-management">
              <div className="profile-modal-management-title">Profile Management</div>
              <div className="profile-modal-management-actions">
                <button
                  className="profile-modal-management-btn active"
                  onClick={handleEditToggle}
                  disabled={isUpdating}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>{isEditing ? "Editing Profile..." : "Edit Profile"}</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="profile-modal-footer">
              <button className="profile-modal-logout-btn" onClick={handleLogout}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="16,17 21,12 16,7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="21"
                    y1="12"
                    x2="9"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
