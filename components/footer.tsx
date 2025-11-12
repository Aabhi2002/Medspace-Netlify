import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'

export function Footer() {
  return (
    <footer id="footer-main" className="bg-[#DFF2F1] pt-0 pb-12 border-t-0">
      {/* Gradient border at top */}
      <div className="h-[3px] w-full bg-gradient-to-r from-teal-400 to-blue-500 mb-10" />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1 - Logo + Social */}
        <div>
          <Image src="/Medspaces Logo(1).png" alt="MedSpaces Logo" width={150} height={90} />
          <p className="mt-3 text-base text-gray-700 font-medium">Space to Care. Freedom to Grow.</p>
          <div className="flex items-center gap-4 mt-6">
            <a href="https://www.instagram.com/medspaces_/?igsh=czJ4c2o1ZXY0bTEy#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 transition">
              <FaInstagram className="text-2xl text-pink-500 hover:text-pink-700" />
            </a>
          </div>
        </div>
        {/* Column 2 - Quick Links */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 text-lg">Quick Links</h4>
          <ul className="space-y-2 text-base text-gray-600">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/how-it-works">How It Works</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        {/* Column 3 - Contact */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 text-lg">Contact</h4>
          <ul className="text-base text-gray-600 space-y-2">
            <li>Banjara Hills, Hyderabad</li>
            <li>www.medspaces.in</li>
            <li>+91 9966933382</li>
            <li>contact@medspaces.in</li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-12">
        © {new Date().getFullYear()} MedSpaces. All rights reserved.
      </p>
    </footer>
  )
}
