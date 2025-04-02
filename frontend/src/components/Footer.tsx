'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <h3 className="text-xl font-bold">EazyShip Rwanda</h3>
            <p className="text-sm leading-6 text-gray-300">
              Your trusted shipping partner in Rwanda.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/services" className="text-sm leading-6 text-gray-300 hover:text-white">
                      International Shipping
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Door-to-Door Delivery
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Package Consolidation
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/contact" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/help" className="text-sm leading-6 text-gray-300 hover:text-white">
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/about" className="text-sm leading-6 text-gray-300 hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Contact Info</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="text-sm leading-6 text-gray-300">
                    Office: KK 299 St, Kigali, Rwanda
                  </li>
                  <li className="text-sm leading-6 text-gray-300">
                    Phone: +250 790 801 369
                  </li>
                  <li className="text-sm leading-6 text-gray-300">
                    Email: info@eazyshiprwanda.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-300">
            &copy; {new Date().getFullYear()} EazyShip Rwanda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
