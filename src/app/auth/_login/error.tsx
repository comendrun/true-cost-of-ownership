'use client'
import { useRouter } from 'next/router'

const LoginErrorPage = () => {
  const router = useRouter()

  const handleRetry = () => {
    router.push('/login')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <h1>Login Error</h1>
      <p>There was an error with your login attempt. Please try again.</p>
      <button
        onClick={handleRetry}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Try Again
      </button>
    </div>
  )
}

export default LoginErrorPage
