import { ReactNode } from 'react'
import FloatingWhatsApp from '../Common/FloatingWhatsApp'
import ScrollProgressBar from '../Common/ScrollProgressBar'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div
      className="main-layout"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#080808',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <ScrollProgressBar />
      {children}
      <FloatingWhatsApp />
    </div>
  )
}

export default MainLayout