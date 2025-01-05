import './globals.css'
import { Toast } from '../components/ui/toast'

export const metadata = {
  title: 'Secondo Tempo',
  description: 'App per la gestione del ristorante',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        {children}
        <Toast />
      </body>
    </html>
  )
}
