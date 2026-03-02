import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, Category, Service } from '../lib/supabase'

export default function ServicesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectAll, setSelectAll] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('logged_in') !== 'true') {
      navigate('/')
      return
    }

    loadData()
  }, [navigate])

  const loadData = async () => {
    const { data: categoriesData } = await supabase
      .from('categories')
      .select('*')
      .order('display_order')

    const { data: servicesData } = await supabase
      .from('services')
      .select('*')
      .order('name')

    if (categoriesData) setCategories(categoriesData)
    if (servicesData) setServices(servicesData)
  }

  const filteredServices = services.filter(service => {
    const matchesCategory = !selectedCategory || service.category_id === selectedCategory
    const matchesSearch = service.name.includes(searchTerm) || service.description.includes(searchTerm)
    return matchesCategory && matchesSearch
  })

  const toggleService = (serviceId: string) => {
    const newSelected = new Set(selectedServices)
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId)
    } else {
      newSelected.add(serviceId)
    }
    setSelectedServices(newSelected)
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedServices(new Set())
    } else {
      setSelectedServices(new Set(filteredServices.map(s => s.id)))
    }
    setSelectAll(!selectAll)
  }

  const handleContinue = () => {
    if (selectedServices.size === 0) {
      alert('נא לבחור לפחות שירות אחד')
      return
    }
    navigate('/submit', { state: { selectedServices: Array.from(selectedServices) } })
  }

  const handleLogout = () => {
    localStorage.removeItem('logged_in')
    navigate('/')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f7fafc, #edf2f7)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <header style={{
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            בחר שירותים
          </h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1.5rem',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            התנתק
          </button>
        </div>
      </header>

      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <input
            type="text"
            placeholder="חיפוש שירותים..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '1.5rem',
          alignItems: 'start'
        }}>
          <aside style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            position: 'sticky',
            top: '100px'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#2d3748'
            }}>
              קטגוריות
            </h2>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: !selectedCategory ? '#667eea' : 'transparent',
                color: !selectedCategory ? 'white' : '#4a5568',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                marginBottom: '0.5rem',
                textAlign: 'right',
                transition: 'all 0.2s'
              }}
            >
              הכל ({services.length})
            </button>
            {categories.map(cat => {
              const count = services.filter(s => s.category_id === cat.id).length
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: selectedCategory === cat.id ? '#667eea' : 'transparent',
                    color: selectedCategory === cat.id ? 'white' : '#4a5568',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    textAlign: 'right',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat.icon} {cat.name} ({count})
                </button>
              )
            })}
          </aside>

          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#2d3748' }}>
                  {filteredServices.length} שירותים זמינים
                </h3>
                <p style={{ margin: '0.25rem 0 0 0', color: '#718096' }}>
                  נבחרו: {selectedServices.size} שירותים
                </p>
              </div>
              <button
                onClick={handleSelectAll}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: selectAll ? '#e53e3e' : '#48bb78',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                {selectAll ? 'בטל הכל' : 'בחר הכל'}
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              {filteredServices.map(service => (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    border: selectedServices.has(service.id) ? '3px solid #667eea' : '3px solid transparent',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!selectedServices.has(service.id)) {
                      e.currentTarget.style.borderColor = '#cbd5e0'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedServices.has(service.id)) {
                      e.currentTarget.style.borderColor = 'transparent'
                    }
                  }}
                >
                  {selectedServices.has(service.id) && (
                    <div style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      width: '24px',
                      height: '24px',
                      background: '#667eea',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      ✓
                    </div>
                  )}
                  <h4 style={{
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: '#2d3748'
                  }}>
                    {service.name}
                  </h4>
                  {service.description && (
                    <p style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      color: '#718096',
                      lineHeight: '1.5'
                    }}>
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedServices.size > 0 && (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'white',
            boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
            padding: '1.25rem',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 50
          }}>
            <button
              onClick={handleContinue}
              style={{
                padding: '1rem 3rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.2rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              המשך עם {selectedServices.size} שירותים
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
