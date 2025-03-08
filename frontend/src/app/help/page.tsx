'use client'

import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'How do I track my shipment?',
    answer: 'You can track your shipment by entering your tracking number on our homepage or in your dashboard. You\'ll receive real-time updates on your package\'s location and estimated delivery time.',
  },
  {
    question: 'What shipping options are available?',
    answer: 'We offer various shipping options including standard shipping, express shipping, and priority express shipping. Each option comes with different delivery timeframes and features.',
  },
  {
    question: 'How do I calculate shipping costs?',
    answer: 'You can calculate shipping costs using our Shipping Calculator on the Pricing page. Enter the package dimensions and select the origin and destination countries to get an estimate.',
  },
  {
    question: 'What are your delivery times?',
    answer: 'Delivery times vary depending on the shipping option and destination. Standard shipping typically takes 5-7 business days, while express shipping can deliver within 2-3 business days.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we offer international shipping services to and from Rwanda, China, USA, and Dubai. Additional destinations may be available upon request.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can reach our customer support team through our Contact page, by email at support@eazyship.rw, or by phone at +250 790 801 369.',
  },
]

export default function HelpPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={`${
                              open ? '-rotate-180' : 'rotate-0'
                            } h-6 w-6 transform`}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>

          {/* Help Center Section */}
          <div className="mt-16 pt-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Help Center
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Customer Support
                </h3>
                <p className="text-gray-500 mb-4">
                  Our support team is available 24/7 to assist you with any questions or concerns.
                </p>
                <a
                  href="mailto:support@eazyship.rw"
                  className="text-primary-600 hover:text-primary-500"
                >
                  Contact Support
                </a>
              </div>

              <div className="bg-white shadow rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Shipping Guide
                </h3>
                <p className="text-gray-500 mb-4">
                  Learn about our shipping processes, packaging guidelines, and best practices.
                </p>
                <button className="text-primary-600 hover:text-primary-500">
                  View Guide
                </button>
              </div>

              <div className="bg-white shadow rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Resources
                </h3>
                <p className="text-gray-500 mb-4">
                  Access our knowledge base, tutorials, and shipping documentation.
                </p>
                <button className="text-primary-600 hover:text-primary-500">
                  Browse Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
