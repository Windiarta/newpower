import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface DescriptionModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  locale: string
}

export default function DescriptionModal({ isOpen, onClose, title, description, locale }: DescriptionModalProps) {
  // Debug logging
  console.log('DescriptionModal render:', { isOpen, title, description: description?.substring(0, 50) + '...' })

  // Handle body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      console.log('Modal opened, body scroll hidden')
      return () => {
        document.body.style.overflow = 'unset'
        console.log('Modal closed, body scroll restored')
      }
    }
  }, [isOpen])

  if (!isOpen) {
    console.log('Modal not open, returning null')
    return null
  }

  console.log('Rendering modal with content')

  const modalContent = (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#111827',
            margin: 0
          }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9ca3af',
              padding: '4px'
            }}
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Body */}
        <div style={{
          padding: '24px',
          maxHeight: '60vh',
          overflowY: 'auto'
        }}>
          <div style={{
            color: '#374151',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}>
            {description}
          </div>
        </div>
        
        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '24px',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            {locale === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  )

  // Use portal to render modal outside the component tree
  return createPortal(modalContent, document.body)
}
