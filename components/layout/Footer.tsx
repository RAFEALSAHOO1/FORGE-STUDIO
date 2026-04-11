'use client'

import Link from 'next/link'
import { Flame, Instagram, Twitter, Globe, Mail } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'Browse All', href: '/browse' },
    { label: 'Posters', href: '/browse?category=posters' },
    { label: 'Invitations', href: '/browse?category=invitations' },
    { label: 'Branding & Logos', href: '/browse?category=marketing' },
    { label: 'Social Media', href: '/browse?category=social-media' },
    { label: 'Business Cards', href: '/browse?category=business-cards' },
    { label: 'Menu Design', href: '/browse?category=menus' },
  ],
  Studio: [
    { label: 'The Forge', href: '/forge' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Track Order', href: '/order-tracking' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Refund Policy', href: '/terms#refunds' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <Flame size={24} className="text-white" />
              <span className="text-white font-semibold text-xl tracking-tight">DesignForge</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Custom premium visual design solutions. From concept to delivery, we craft experiences that resonate.
            </p>
            <div className="flex gap-3 mb-6">
              {[Instagram, Twitter, Globe].map((Icon, i) => (
                <button key={i} className="glow-morph rounded-full p-2.5 text-white/60 hover:text-white hover:bg-white/5 transition-all">
                  <Icon size={16} />
                </button>
              ))}
            </div>
            <a href="mailto:hello@designforge.studio" className="flex items-center gap-2 text-white/30 text-sm hover:text-white transition-colors">
              <Mail size={14} /> hello@designforge.studio
            </a>
          </div>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white/40 text-xs tracking-widest uppercase mb-5">{section}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/50 text-sm hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">© 2025 DesignForge Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/20 text-xs hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/20 text-xs hover:text-white/50 transition-colors">Terms</Link>
            <p className="text-white/10 text-xs tracking-widest uppercase">Crafted with precision</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
