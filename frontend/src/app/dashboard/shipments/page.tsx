'use client'

import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  TruckIcon, 
  MagnifyingGlassIcon,
  CreditCardIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline'

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isShippingCalculatorOpen, setShippingCalculatorOpen] = useState(false)
  const [isPaymentMethodOpen, setPaymentMethodOpen] = useState(false)
  const [isConfirmationOpen, setConfirmationOpen] = useState(false)
  const [shippingDetails, setShippingDetails] = useState({
    senderName: '',
    senderAddress: '',
    fromCountry: '',
    toCountry: '',
    ecommerceStore: '', // New field
    productId: '',      // New field
    weight: '',
    length: '',
    width: '',
    height: '',
    shippingType: 'standard'
  })
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  })

  useEffect(() => {
    const savedShipments = localStorage.getItem('shipments')
    if (savedShipments) {
      setShipments(JSON.parse(savedShipments))
    }
  }, [])

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

  const ecommerceStores = [
    'Kikuu',
    'Amazon', 
    'Alibaba'
  ]

  const [paymentMethods] = useState([
    { id: 'mtn', name: 'MTN Mobile Money', icon: CreditCardIcon },
    { id: 'airtel', name: 'Airtel Money', icon: CreditCardIcon },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCardIcon }
  ])

  const openShippingCalculator = () => {
    setShippingDetails({
      senderName: '',
      senderAddress: '',
      fromCountry: '',
      toCountry: '',
      ecommerceStore: '', // Reset new fields
      productId: '',      // Reset new fields
      weight: '',
      length: '',
      width: '',
      height: '',
      shippingType: 'standard'
    })
    setShippingCalculatorOpen(true)
  }

  const calculateShippingCost = () => {
    const requiredFields = [
      { field: 'senderName', message: 'Please enter sender name' },
      { field: 'fromCountry', message: 'Please select from country' },
      { field: 'toCountry', message: 'Please select to country' },
      { field: 'ecommerceStore', message: 'Please select e-commerce store' }, // New validation
      { field: 'productId', message: 'Please enter product ID' },            // New validation
      { field: 'weight', message: 'Please enter package weight' },
      { field: 'length', message: 'Please enter package length' },
      { field: 'width', message: 'Please enter package width' },
      { field: 'height', message: 'Please enter package height' }
    ]

    const missingFields = requiredFields.filter(req => 
      !shippingDetails[req.field as keyof typeof shippingDetails]
    )

    if (missingFields.length > 0) {
      alert(missingFields.map(field => field.message).join('\n'))
      return
    }

    const baseCost = 5000
    const weightFactor = parseFloat(shippingDetails.weight) * 500
    const volumeFactor = 
      parseFloat(shippingDetails.length || '0') * 
      parseFloat(shippingDetails.width || '0') * 
      parseFloat(shippingDetails.height || '0') / 5000
    const typeFactor = shippingDetails.shippingType === 'express' ? 1.5 : 1
    
    const totalCost = baseCost + weightFactor * typeFactor + volumeFactor
    setEstimatedCost(Math.round(totalCost))
    
    setPaymentMethodOpen(true)
  }

  const handleShipmentConfirmation = () => {
    const newShipment = {
      id: `SHP${shipments.length + 1}`,
      trackingNumber: `TRK${Math.floor(Math.random() * 1000000000)}`,
      status: 'Processing',
      origin: shippingDetails.fromCountry,
      destination: shippingDetails.toCountry,
      estimatedDelivery: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      weight: `${shippingDetails.weight} kg`,
      type: shippingDetails.shippingType === 'express' ? 'Express' : 'Standard',
      ecommerceStore: shippingDetails.ecommerceStore, // New field
      productId: shippingDetails.productId           // New field
    }

    const updatedShipments = [...shipments, newShipment]
    setShipments(updatedShipments)
    localStorage.setItem('shipments', JSON.stringify(updatedShipments))
    
    setConfirmationOpen(true)
    setPaymentMethodOpen(false)
  }

  const filteredShipments = shipments.filter(shipment => 
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paymentMethodDetails = {
    'mtn': (
      <input 
        placeholder="MTN Mobile Money Number" 
        type="tel"
        className="w-full border p-2 rounded text-black mt-2"
        value={paymentDetails.phoneNumber}
        onChange={(e) => setPaymentDetails({
          ...paymentDetails, 
          phoneNumber: e.target.value
        })}
      />
    ),
    'airtel': (
      <input 
        placeholder="Airtel Money Number" 
        type="tel"
        className="w-full border p-2 rounded text-black mt-2"
        value={paymentDetails.phoneNumber}
        onChange={(e) => setPaymentDetails({
          ...paymentDetails, 
          phoneNumber: e.target.value
        })}
      />
    ),
    'card': (
      <div className="space-y-2 mt-2">
        <input 
          placeholder="Card Number" 
          type="text"
          className="w-full border p-2 rounded text-black"
          value={paymentDetails.cardNumber}
          onChange={(e) => setPaymentDetails({
            ...paymentDetails, 
            cardNumber: e.target.value
          })}
        />
        <div className="flex space-x-2">
          <input 
            placeholder="Expiry (MM/YY)" 
            type="text"
            className="w-full border p-2 rounded text-black"
            value={paymentDetails.cardExpiry}
            onChange={(e) => setPaymentDetails({
              ...paymentDetails, 
              cardExpiry: e.target.value
            })}
          />
          <input 
            placeholder="CVV" 
            type="text"
            className="w-full border p-2 rounded text-black"
            value={paymentDetails.cardCVV}
            onChange={(e) => setPaymentDetails({
              ...paymentDetails, 
              cardCVV: e.target.value
            })}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Shipments</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track and manage all your shipments in one place
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={openShippingCalculator}
            className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            Create Shipment
          </button>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search by tracking number or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Tracking Number</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Origin</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Destination</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Est. Delivery</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Weight</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">E-commerce Store</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Product ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-primary-600 sm:pl-6">
                  {shipment.trackingNumber}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    shipment.status === 'Delivered'
                      ? 'bg-green-50 text-green-700'
                      : shipment.status === 'In Transit'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    <TruckIcon className="mr-1 h-4 w-4" />
                    {shipment.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shipment.origin}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shipment.destination}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shipment.estimatedDelivery}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shipment.weight}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    shipment.type === 'Express'
                      ? 'bg-purple-50 text-purple-700'
                      : 'bg-gray-50 text-gray-700'
                  }`}>
                    {shipment.type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shipment.ecommerceStore}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{shipment.productId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Transition show={isShippingCalculatorOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShippingCalculatorOpen(false)}>
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-black">
                    Shipping Calculator
                  </Dialog.Title>
                  
                  <div className="mt-4 space-y-4">
                    <input 
                      placeholder="Sender Name" 
                      className="w-full border p-2 rounded text-black"
                      value={shippingDetails.senderName}
                      onChange={(e) => setShippingDetails({
                        ...shippingDetails, 
                        senderName: e.target.value
                      })}
                    />
                    <select 
                      className="w-full border p-2 rounded text-black"
                      value={shippingDetails.fromCountry}
                      onChange={(e) => setShippingDetails({
                        ...shippingDetails, 
                        fromCountry: e.target.value
                      })}
                    >
                      <option value="">Select From Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    <select 
                      className="w-full border p-2 rounded text-black"
                      value={shippingDetails.toCountry}
                      onChange={(e) => setShippingDetails({
                        ...shippingDetails, 
                        toCountry: e.target.value
                      })}
                    >
                      <option value="">Select To Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    <select 
                      className="w-full border p-2 rounded text-black"
                      value={shippingDetails.ecommerceStore}
                      onChange={(e) => setShippingDetails({
                        ...shippingDetails, 
                        ecommerceStore: e.target.value
                      })}
                    >
                      <option value="">Select E-commerce Store</option>
                      {ecommerceStores.map(store => (
                        <option key={store} value={store}>{store}</option>
                      ))}
                    </select>
                    <input 
                      placeholder="Product ID" 
                      className="w-full border p-2 rounded text-black"
                      value={shippingDetails.productId}
                      onChange={(e) => setShippingDetails({
                        ...shippingDetails, 
                        productId: e.target.value
                      })}
                    />
                    <input 
                      placeholder="Package Weight (kg)" 
                      type="number"
                      className="w-full border p-2 rounded text-black"
                      value={shippingDetails.weight}
                      onChange={(e) => setShippingDetails({
                        ...shippingDetails, 
                        weight: e.target.value
                      })}
                    />
                    <div className="flex space-x-2">
                      <input 
                        placeholder="Length (cm)"
                        type="number"
                        className="w-full border p-2 rounded text-black"
                        value={shippingDetails.length}
                        onChange={(e) => setShippingDetails({
                          ...shippingDetails, 
                          length: e.target.value
                        })}
                      />
                      <input 
                        placeholder="Width (cm)"
                        type="number"
                        className="w-full border p-2 rounded text-black"
                        value={shippingDetails.width}
                        onChange={(e) => setShippingDetails({
                          ...shippingDetails, 
                          width: e.target.value
                        })}
                      />
                      <input 
                        placeholder="Height (cm)"
                        type="number"
                        className="w-full border p-2 rounded text-black"
                        value={shippingDetails.height}
                        onChange={(e) => setShippingDetails({
                          ...shippingDetails, 
                          height: e.target.value
                        })}
                      />
                    </div>
                    <select 
                      className="w-full border p-2 rounded text-black"
                      value={shippingDetails.shippingType}
                      onChange={(e) => setShippingDetails({
                        ...shippingDetails, 
                        shippingType: e.target.value
                      })}
                    >
                      <option value="standard">Standard Shipping</option>
                      <option value="express">Express Shipping</option>
                    </select>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button 
                      type="button" 
                      className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                      onClick={calculateShippingCost}
                    >
                      Calculate Cost
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


<Transition show={isPaymentMethodOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setPaymentMethodOpen(false)}>
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-black">
                    Select Payment Method
                  </Dialog.Title>
                  
                  <div className="mt-4 space-y-4">
                    <p className="text-black">Estimated Cost: {estimatedCost} RWF</p>
                    {paymentMethods.map((method) => (
                      <div key={method.id}>
                        <button
                          className={`w-full flex items-center justify-between p-4 border rounded-lg text-black 
                            ${selectedPaymentMethod === method.id ? 'bg-primary-100 border-primary-600' : 'hover:bg-gray-100'}`}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          <div className="flex items-center">
                            <method.icon className="h-6 w-6 mr-3" />
                            {method.name}
                          </div>
                          {selectedPaymentMethod === method.id && (
                            <CheckCircleIcon className="h-6 w-6 text-primary-600" />
                          )}
                        </button>
                        {selectedPaymentMethod === method.id && 
                          paymentMethodDetails[method.id as keyof typeof paymentMethodDetails]}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button 
                      type="button" 
                      className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                      onClick={handleShipmentConfirmation}
                      disabled={!selectedPaymentMethod}
                    >
                      Confirm Payment
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition show={isConfirmationOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setConfirmationOpen(false)}>
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <CheckCircleIcon className="h-16 w-16 mx-auto text-green-600 mb-4" />
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-black mb-2">
                    Shipment Confirmed
                  </Dialog.Title>
                  <p className="text-black mb-4">
                    Your shipment will arrive in 15 days. Thank you for shipping with us!
                  </p>
                  <button 
                    type="button" 
                    className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                    onClick={() => setConfirmationOpen(false)}
                  >
                    Close
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}