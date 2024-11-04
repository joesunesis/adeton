import { Link } from 'lucide-react'
import router from 'next/router'
import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'

export default function Footer () {
  return (
    <footer className="shadow-lg border-t border-gray-300 p-4 flex justify-between items-center w-full top-0 z-50">
      <nav className="stcky z-[100] w-full bg-white/75 backdrop-blur-lg transition-all">
        footer
      </nav>
    </footer>
  )
}