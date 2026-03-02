import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function SubmitPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const selectedServices = (location.state?.selectedServices || []) as string[]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName || !phone) {
      alert('נא למלא את כל השדות')
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          first_name: firstName,
          phone: phone,
          selected_services: selectedServices
        })

      if (error) throw error

      setShowSuccess(true)
      setTimeout(() => {
        navigate('/services')
      }, 3000)
    } catch (error) {
      console.error('Error submitting:', error)
      alert('אירעה שגיאה בשליחת הטופס')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          textAlign: 'center',
          maxWidth: '500px',
          margin: '1rem'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>
            ✅
          </div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '1rem'
          }}>
            הפרטים נשלחו בהצלחה!
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#718096',
            lineHeight: '1.6'
          }}>
            תודה! הפרטים שלך נשלחו ל-{selectedServices.length} חברות.
            <br />
            נציגי השירותים ייצרו איתך קשר בקרוב.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f7fafc, #edf2f7)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'white',
              margin: 0
            }}>
              השארת פרטים
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              marginTop: '0.5rem',
              fontSize: '1.1rem'
            }}>
              הפרטים שלך יישלחו ל-{selectedServices.length} חברות
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '2.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2d3748',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                שם פרטי
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="הזן את שמך"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
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
                fontSize: '1rem'
              }}>
                מספר טלפון
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05X-XXXXXXX"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
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

            <div style={{
              background: '#f7fafc',
              padding: '1.25rem',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <p style={{
                margin: 0,
                fontSize: '0.95rem',
                color: '#4a5568',
                lineHeight: '1.6'
              }}>
                בלחיצה על "שלח פרטים" אני מאשר/ת שליחת הפרטים שלי ל-{selectedServices.length} החברות שבחרתי
                ומסכים/ה לקבל פניות מנציגיהן.
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <button
                type="button"
                onClick={() => navigate('/services')}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: '#e2e8f0',
                  color: '#4a5568',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#cbd5e0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#e2e8f0'}
              >
                חזור
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  flex: 2,
                  padding: '1rem',
                  background: isSubmitting ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s',
                  boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {isSubmitting ? 'שולח...' : 'שלח פרטים'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
