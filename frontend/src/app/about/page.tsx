'use client'

import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* CEO Quote Section */}
      <div className="relative isolate overflow-hidden bg-primary-600 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <figure className="mx-auto max-w-2xl text-center">
            <blockquote className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
              <p>
                "At EazyShip Rwanda, we're not just moving packages; we're connecting dreams, businesses, and people across borders. Our mission is to make global commerce accessible to every Rwandan, one delivery at a time."
              </p>
            </blockquote>
            <figcaption className="mt-8">
              <div className="mt-3 text-base">
                <div className="font-semibold text-white">Denis Mitali</div>
                <div className="text-primary-100">CEO & Founder, EazyShip Rwanda</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* About Content */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">About Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Bridge to Global Commerce
          </p>
          <div className="mt-6 text-lg leading-8 text-gray-600">
            <div className="bg-primary-50 rounded-xl p-8 mb-8">
              <p className="mb-4">
                Founded in 2025, EazyShip Rwanda emerged from a vision to transform how Rwandans access global markets. We recognized the challenges faced by local consumers and businesses in purchasing and receiving products from international retailers.
              </p>
              <p className="mb-4">
                Our solution was to create a comprehensive shipping service that combines reliability, speed, and customer-focused support. We've built strong partnerships with major e-commerce platforms and established a robust logistics network that spans continents.
              </p>
            </div>
            <div className="bg-primary-50 rounded-xl p-8">
              <p className="mb-4">
                Today, we're proud to serve thousands of customers, helping them shop from their favorite international stores with confidence. Our team of dedicated professionals works tirelessly to ensure every package reaches its destination safely and on time.
              </p>
              <p>
                Whether you're a business importing supplies or an individual shopping for personal items, EazyShip Rwanda is your trusted partner in making global shipping simple, affordable, and reliable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
