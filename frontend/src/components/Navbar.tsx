'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">EazyShip Rwanda</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
            >
              Services
            </Link>
            <Link
              href="/help"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
            >
              Help
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Pricing
          </Link>
          <Link
            href="/services"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Services
          </Link>
          <Link
            href="/help"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Help
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            About
          </Link>
          <Link
            href="/auth/login"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}
