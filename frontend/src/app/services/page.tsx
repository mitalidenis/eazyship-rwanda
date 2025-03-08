'use client'

import { TruckIcon, GlobeAltIcon, ShieldCheckIcon, CubeIcon, BuildingStorefrontIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function Services() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Our Services
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-50">
              We offer comprehensive shipping solutions to meet all your international shipping needs. From door-to-door delivery to secure package handling, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-primary-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:gap-x-8 sm:gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Door-to-Door Delivery */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-x-3">
                <div className="rounded-lg bg-primary-600 p-2">
                  <TruckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">Door-to-Door Delivery</h3>
              </div>
              <p className="mt-4 text-base leading-7 text-gray-600">
                We pick up your packages and deliver them directly to your doorstep, ensuring a seamless shipping experience from start to finish.
              </p>
            </div>

            {/* International Shipping */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-x-3">
                <div className="rounded-lg bg-primary-600 p-2">
                  <GlobeAltIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">International Shipping</h3>
              </div>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Ship to and from anywhere in the world with our extensive network of international shipping partners and carriers.
              </p>
            </div>

            {/* Secure Package Handling */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-x-3">
                <div className="rounded-lg bg-primary-600 p-2">
                  <ShieldCheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">Secure Package Handling</h3>
              </div>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Your packages are fully insured and handled with utmost care throughout their journey, giving you peace of mind.
              </p>
            </div>

            {/* Package Consolidation */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-x-3">
                <div className="rounded-lg bg-primary-600 p-2">
                  <CubeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">Package Consolidation</h3>
              </div>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Save on shipping costs by combining multiple packages into a single shipment, perfect for bulk orders.
              </p>
            </div>

            {/* Warehouse Storage */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-x-3">
                <div className="rounded-lg bg-primary-600 p-2">
                  <BuildingStorefrontIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">Warehouse Storage</h3>
              </div>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Store your packages in our secure warehouses until you're ready for delivery, with flexible storage options.
              </p>
            </div>

            {/* Express Delivery */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-x-3">
                <div className="rounded-lg bg-primary-600 p-2">
                  <ClockIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">Express Delivery</h3>
              </div>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Need it fast? Our express delivery service ensures your packages arrive as quickly as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
