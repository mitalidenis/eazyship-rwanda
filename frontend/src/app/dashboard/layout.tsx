'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  TruckIcon,
  CogIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Shipments', href: '/dashboard/shipments', icon: TruckIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
  { 
    name: 'Logout', 
    href: '/', 
    icon: ArrowLeftStartOnRectangleIcon 
  }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('token')
    // Redirect to login page
    router.push('/')
  }

  return (
    <div>
      {/* Popup Menu */}
      <Transition show={menuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setMenuOpen}>
          <Transition.Child
            as="div"
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-start justify-start">
              <Transition.Child
                as="div"
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-primary-600 min-h-screen">
                  <div className="flex px-4 pb-2 pt-5 justify-between items-center">
                    <span className="text-xl font-semibold text-white">EazyShip Rwanda</span>
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-white hover:text-gray-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Menu Links */}
                  <div className="space-y-2 px-4 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`
                          group flex items-center rounded-md px-4 py-3 text-base font-medium
                          ${pathname === item.href
                            ? 'bg-primary-700 text-white'
                            : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                          }
                        `}
                        onClick={() => {
                          setMenuOpen(false)
                          if (item.name === 'Logout') {
                            handleLogout()
                          }
                        }}
                      >
                        <item.icon 
                          className="mr-4 h-6 w-6 flex-shrink-0" 
                          aria-hidden="true" 
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Menu Button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 -m-2.5 p-2.5 text-gray-700"
        onClick={() => setMenuOpen(true)}
      >
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Main Content */}
      <main className="pl-16 py-10">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>

      {/* Dashboard Footer */}
      <footer className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="/logo.png" alt="EazyShip Rwanda" className="h-10 mb-4" />
              <p className="text-sm">Simplifying shipping solutions for businesses and individuals across Rwanda.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                <li><a href="/dashboard/shipments" className="hover:underline">Shipments</a></li>
                <li><a href="/dashboard/settings" className="hover:underline">Settings</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                <li><a href="/faq" className="hover:underline">FAQ</a></li>
                <li><a href="/help" className="hover:underline">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-500 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} EazyShip Rwanda. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      <Toaster position="top-right" />
    </div>
  )
}