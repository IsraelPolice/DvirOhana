import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if ((username === 'דביר' && password === 'ברקת') || (username === '' && password === '')) {
      localStorage.setItem('logged_in', 'true')
      navigate('/services')
    } else {
      alert('שם משתמש או סיסמה שגויים')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        padding: 'clamp(2rem, 5vw, 3rem)',
        borderRadius: '20px',
        boxShadow: '0 25px 70px rgba(0,0,0,0.35)',
        width: '100%',
        maxWidth: '450px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          paddingBottom: '2rem',
          borderBottom: '2px solid #f0f0f0'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.75rem'
          }}>
            🔐
          </div>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2rem)',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: '#1a202c'
          }}>
            מערכת רישום לשירותים
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '0.95rem'
          }}>
            כניסה למערכת
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2d3748',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              שם משתמש
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2d3748',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              סיסמה
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.05rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 6px 20px rgba(30, 64, 175, 0.35)',
              letterSpacing: '0.3px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(30, 64, 175, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 64, 175, 0.35)'
            }}
          >
            התחבר
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          color: '#718096',
          fontSize: '0.9rem'
        }}>
          אין לך חשבון?{' '}
          <span style={{ color: '#667eea', cursor: 'pointer', fontWeight: '600' }}>
            הירשם עכשיו
          </span>
        </div>
      </div>
    </div>
  )
}
