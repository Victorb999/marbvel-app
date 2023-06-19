import './globals.css'
import { Montserrat } from 'next/font/google'
import { ReactNode } from 'react'
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Marvel app',
  description: 'Marvel App',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`flex justify-center items-center flex-col ${montserrat.className}`}
      >
        <div className="flex justify-center items-center bg-red-600 w-full h-16">
          <h1 className="text-white uppercase text-2xl tracking-wide font-black">
            Marvel App
          </h1>
        </div>
        {children}
      </body>
    </html>
  )
}
