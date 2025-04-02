'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { GlobeAltIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [trackingResult, setTrackingResult] = useState('')
  const [formKey, setFormKey] = useState(0)

  const handleTracking = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const trackingId = (form.elements.namedItem('tracking') as HTMLInputElement).value
    setTrackingResult(`Tracking number ${trackingId} is currently in transit. Expected delivery: April 15, 2025`)
    setFormKey(formKey + 1)
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden bg-[#1A2C4F]">
        <Image 
          src="https://cdn.flightsim.to/images/25/rwandair-cargo-9xr-ww---pmdg-737-800-24631-1686074787-dVJ9F.jpg" 
          alt="EazyShip Rwanda Cargo Background" 
          fill 
          priority
          unoptimized
          className="absolute z-0 object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20 text-white h-full flex items-center justify-center">
          <div className="text-center max-w-2xl px-6">
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl font-serif mb-4 whitespace-nowrap">
              EazyShip Rwanda
            </h1>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Your Trusted Shipping Partner in Rwanda
            </h2>
            <p className="text-lg leading-8 text-gray-200">
              Fast, reliable, and secure shipping solutions connecting Rwanda to the world. Shop from international stores like Amazon, Alibaba, and Kikuu with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Tracking Section */}
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Track Your Package
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Enter your tracking number to get real-time updates on your shipment
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-xl">
            <form key={formKey} onSubmit={handleTracking} className="flex flex-col gap-4">
              <div className="flex gap-x-4">
                <label htmlFor="tracking-id" className="sr-only">
                  Tracking ID
                </label>
                <input
                  id="tracking-id"
                  name="tracking"
                  type="text"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-offset-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your tracking number"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Track
                </button>
              </div>
              {trackingResult && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">{trackingResult}</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-primary-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Fast Shipping</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for global shipping
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We provide comprehensive shipping solutions to meet all your international shipping needs
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="rounded-lg bg-primary-600 p-2">
                    <TruckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Fast Delivery
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Get your packages delivered quickly and securely with our express shipping options.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="rounded-lg bg-primary-600 p-2">
                    <GlobeAltIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Global Coverage
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Ship to and from Rwanda with our extensive network of partners.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="rounded-lg bg-primary-600 p-2">
                    <ShieldCheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Secure Handling
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Your packages are handled with care and fully insured throughout their journey.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Partner Stores */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shop from Our Partner Stores
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Access millions of products from the world's leading e-commerce platforms
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none">
            <div className="text-center p-6 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors">
              <h3 className="text-2xl font-semibold text-gray-900">Amazon</h3>
              <p className="mt-4 text-base text-gray-600">
                The world's largest online marketplace with over 12 million products. Shop everything from electronics to fashion.
              </p>
              <Link href="https://amazon.com" className="mt-4 text-primary-600 hover:text-primary-500 inline-block">
                Visit Store →
              </Link>
            </div>
            <div className="text-center p-6 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors">
              <h3 className="text-2xl font-semibold text-gray-900">Alibaba</h3>
              <p className="mt-4 text-base text-gray-600">
                Global B2B platform offering wholesale prices. Perfect for bulk orders and business supplies.
              </p>
              <Link href="https://alibaba.com" className="mt-4 text-primary-600 hover:text-primary-500 inline-block">
                Visit Store →
              </Link>
            </div>
            <div className="text-center p-6 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors">
              <h3 className="text-2xl font-semibold text-gray-900">Kikuu</h3>
              <p className="mt-4 text-base text-gray-600">
                African-focused e-commerce platform with great deals on fashion, electronics, and home goods.
              </p>
              <Link href="https://kikuu.com" className="mt-4 text-primary-600 hover:text-primary-500 inline-block">
                Visit Store →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}