import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Shree Radha Krishna Studio ErrorBoundary caught an exception:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '120px 24px 60px 24px',
            backgroundColor: '#080808',
            color: '#FFFFFF',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              marginBottom: '20px',
              boxShadow: '0 0 30px rgba(212, 175, 53, 0.5)',
            }}
          >
            📷
          </div>

          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              marginBottom: '12px',
              background: 'linear-gradient(90deg, #FFFFFF 30%, #D4AF37 70%, #F5E6B3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Something Went Unexpectedly Wrong
          </h2>

          <p
            style={{
              fontSize: '1rem',
              color: '#A0A0A0',
              maxWidth: '520px',
              marginBottom: '32px',
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Our studio experience encountered a transient error. Please reload the page or return to the main homepage.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: '14px 32px',
                minHeight: '44px',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
                color: '#080808',
                fontSize: '0.95rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(212, 175, 53, 0.4)',
              }}
            >
              Return To Home
            </button>

            <a
              href="https://wa.me/919460142572?text=Hi%20Shree%20Radha%20Krishna%20Studio,%20I%20encountered%20an%20issue%20on%20the%20website."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '14px 32px',
                minHeight: '44px',
                borderRadius: '30px',
                background: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(212, 175, 53, 0.4)',
                fontSize: '0.95rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              Contact Support
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
