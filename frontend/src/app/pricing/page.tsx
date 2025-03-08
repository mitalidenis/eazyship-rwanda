'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'

const countries = [
  'Rwanda',
  'China',
  'USA',
  'Dubai',
  'Kenya',
  'Uganda',
  'Tanzania',
  'South Africa'
]

const pricingPlans = [
  {
    name: 'Basic',
    price: 19,
    features: [
      'Up to 5kg',
      'Standard shipping',
      'Basic tracking',
    ],
  },
  {
    name: 'Premium',
    price: 49,
    features: [
      'Up to 20kg',
      'Express shipping',
      'Advanced tracking',
      'Insurance included',
    ],
  },
  {
    name: 'Business',
    price: 99,
    features: [
      'Over 20kg',
      'Priority shipping',
      'Real-time tracking',
      'Premium insurance',
      'Dedicated support',
    ],
  },
]

export default function Pricing() {
  const [formData, setFormData] = useState({
    fromCountry: 'Rwanda',
    toCountry: '',
    length: '',
    width: '',
    height: '',
    weight: ''
  })
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.toCountry) {
      alert('Please select a destination country')
      return
    }
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Calculator Section */}
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Calculator</h1>
            <p className="text-lg text-gray-600">Calculate shipping costs for your package</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fromCountry" className="block text-sm font-medium text-gray-700 mb-2">
                    From Country
                  </label>
                  <select
                    id="fromCountry"
                    name="fromCountry"
                    value={formData.fromCountry}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900"
                  >
                    {countries.map(country => (
                      <option key={country} value={country} className="text-gray-900">
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="toCountry" className="block text-sm font-medium text-gray-700 mb-2">
                    To Country
                  </label>
                  <select
                    id="toCountry"
                    name="toCountry"
                    value={formData.toCountry}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900"
                    required
                  >
                    <option value="" className="text-gray-400">Select destination</option>
                    {countries.map(country => (
                      <option key={country} value={country} className="text-gray-900">
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    id="length"
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-2">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    id="width"
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  Calculate Price
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pricing Plans</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the perfect shipping plan for your needs
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  plan.name === 'Premium' ? 'ring-2 ring-primary-600' : ''
                }`}
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 text-center">{plan.name}</h3>
                  <p className="mt-4 text-gray-600 text-center">
                    {plan.name === 'Basic'
                      ? 'Perfect for small packages'
                      : plan.name === 'Premium'
                      ? 'Best for regular shippers'
                      : 'For large shipments'}
                  </p>
                  <p className="mt-8 text-5xl font-bold text-gray-900 text-center">${plan.price}</p>
                  <p className="mt-2 text-gray-500 text-center">per shipment</p>
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="ml-3 text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-6">
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Login/Signup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                  Sign in to Continue
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Please sign in to your account or create a new one to view shipping rates and place orders.
                </p>
              </div>

              <div className="mt-5 sm:mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => router.push('/auth/login')}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/auth/signup')}
                  className="w-full bg-white text-primary-600 py-2 px-4 rounded-md border border-primary-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  Create an account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
