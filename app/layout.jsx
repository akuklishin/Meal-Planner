import './globals.css'
import { Inter } from 'next/font/google'
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Meal Planner',
  description: 'A web app to plan your meals',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
        <Nav />

        <main className="max-w-5xl mx-auto">

          <div className="m-16">

                {children}

            </div>

        </main>

        <Footer />
        </Provider>
      </body>
    </html>
  )
}
