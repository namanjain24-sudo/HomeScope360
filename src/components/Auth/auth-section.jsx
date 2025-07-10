"use client"

import { useState, useEffect } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"
import { auth } from "../../lib/firebase"
import "./auth-section.css"
import { useNavigate } from "react-router-dom"

const AuthSection = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [authMode, setAuthMode] = useState("initial")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      // No need to set user here, as we're not using the user variable
    })

    return () => unsubscribe()
  }, [])

  // COMPLETELY NEW APPROACH - Try to create account first
  const checkEmailExists = async (email) => {
    try {
      console.log("🔍 Checking if email exists:", email)

      // Try to create a user with a temporary password
      // If email exists, this will fail with 'email-already-in-use'
      // If email doesn't exist, this will fail with other errors (we'll catch and handle)

      const tempPassword = "temp-check-123456"
      await createUserWithEmailAndPassword(auth, email, tempPassword)

      // If we reach here, account was created (email didn't exist)
      // We need to delete this temporary account
      const currentUser = auth.currentUser
      if (currentUser) {
        await currentUser.delete()
        console.log("🗑️ Deleted temporary account")
      }

      console.log("✅ Email is NEW - directing to SIGNUP")
      return false // Email doesn't exist, show signup
    } catch (error) {
      console.log("🔍 Create account error:", error.code)

      if (error.code === "auth/email-already-in-use") {
        console.log("✅ Email EXISTS - directing to SIGNIN")
        return true // Email exists, show signin
      }

      // For any other error, assume email doesn't exist
      console.log("✅ Email is NEW (other error) - directing to SIGNUP")
      return false
    }
  }

  const handleEmailContinue = async () => {
    if (!email) {
      setError("Please enter your email address")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)
    setError("")

    try {
      console.log("=== EMAIL CHECK START ===")
      console.log("Email to check:", email)

      const emailExists = await checkEmailExists(email)

      console.log("=== FINAL RESULT ===")
      console.log("Email:", email)
      console.log("Exists:", emailExists)
      console.log("Action:", emailExists ? "SHOW SIGNIN" : "SHOW SIGNUP")
      console.log("==================")

      if (emailExists) {
        console.log("🔑 Showing SIGNIN form")
        setAuthMode("signin")
      } else {
        console.log("📝 Showing SIGNUP form")
        setAuthMode("signup")
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    setError("")

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      setMessage(`Welcome, ${result.user.displayName || result.user.email}!`)
      navigate("/")
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled")
      } else {
        setError(error.message || "Failed to sign in with Google")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async () => {
    if (!password) {
      setError("Please enter your password")
      return
    }

    setLoading(true)
    setError("")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setMessage("Successfully signed in!")
      console.log("User signed in:", userCredential.user)
      navigate("/")
    } catch (error) {
      console.error("Sign-in error:", error)
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        setError("Incorrect password. Please try again.")
      } else if (error.code === "auth/user-not-found") {
        setError("No account found with this email. Please sign up first.")
        setAuthMode("signup")
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.")
      } else {
        setError("Failed to sign in. Please check your credentials.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async () => {
    if (!fullName.trim()) {
      setError("Please enter your full name")
      return
    }

    if (!password) {
      setError("Please enter a password")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setLoading(true)
    setError("")

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: fullName.trim(),
      })

      setMessage(`Account created successfully! Welcome to HomeScope360, ${fullName}!`)
      console.log("User signed up:", userCredential.user)
      navigate("/")
    } catch (error) {
      console.error("Sign-up error:", error)
      if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please sign in instead.")
        setAuthMode("signin")
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak. Please choose a stronger password.")
      } else {
        setError("Failed to create account. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email address")
      return
    }

    setLoading(true)
    setError("")

    try {
      await sendPasswordResetEmail(auth, email)
      setMessage("Password reset link sent to your email!")
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email")
      } else {
        setError(error.message || "Failed to send reset email")
      }
    } finally {
      setLoading(false)
    }
  }

  // Rest of the authentication forms (when user is not logged in)
  const renderInitialForm = () => (
    <div className="auth-form">
      <div className="auth-header">
        <h2 className="auth-title">Sign in or create an account</h2>
        <p className="auth-terms">
          By clicking "Continue," you agree to HomeScope360's{" "}
          <a href="/terms" className="auth-link">
            terms of service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="auth-link">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <button onClick={handleGoogleAuth} disabled={loading} className="google-button">
        Continue with Google
      </button>

      <div className="divider">
        <span>or</span>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          placeholder="Enter your email"
        />
      </div>

      <button onClick={handleEmailContinue} disabled={loading || !email} className="continue-button">
        {loading ? "Checking..." : "Continue with email"}
      </button>

      <button onClick={() => setAuthMode("reset")} className="forgot-password-link">
        Forgot your password?
      </button>
    </div>
  )

  const renderSignInForm = () => (
    <div className="auth-form">
      <div className="auth-header">
        <h2 className="auth-title">Welcome back!</h2>
        <p className="auth-subtitle">Sign in to your account</p>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          disabled
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password *
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder="Enter your password"
          autoFocus
        />
      </div>

      <button onClick={handleSignIn} disabled={loading || !password} className="continue-button">
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <button onClick={() => setAuthMode("reset")} className="forgot-password-link">
        Forgot your password?
      </button>

      <button onClick={() => setAuthMode("initial")} className="back-button">
        ← Back
      </button>
    </div>
  )

  const renderSignUpForm = () => (
    <div className="auth-form">
      <div className="auth-header">
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">Welcome to HomeScope360!</p>
      </div>

      <div className="form-group">
        <label htmlFor="fullName" className="form-label">
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="form-input"
          placeholder="Enter your full name"
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          disabled
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password *
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder="Create a password (min 6 characters)"
        />
      </div>

      <button onClick={handleSignUp} disabled={loading || !password || !fullName.trim()} className="continue-button">
        {loading ? "Creating account..." : "Create account"}
      </button>

      <button onClick={() => setAuthMode("initial")} className="back-button">
        ← Back
      </button>
    </div>
  )

  const renderResetForm = () => (
    <div className="auth-form">
      <div className="auth-header">
        <h2 className="auth-title">Trouble logging in?</h2>
        <p className="auth-subtitle">Enter your email and we'll send a link to reset your password.</p>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          placeholder="Enter your email"
        />
      </div>

      <button onClick={handlePasswordReset} disabled={loading || !email} className="continue-button">
        {loading ? "Sending..." : "Send"}
      </button>

      <button onClick={() => setAuthMode("initial")} className="back-button">
        ← Back to sign in
      </button>
    </div>
  )

  // Only show authentication forms centered on the page
  return (
    <section className="auth-section">
      <div className="auth-container">
        {authMode === "initial" && renderInitialForm()}
        {authMode === "signin" && renderSignInForm()}
        {authMode === "signup" && renderSignUpForm()}
        {authMode === "reset" && renderResetForm()}

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
      </div>
    </section>
  )
}

export default AuthSection
