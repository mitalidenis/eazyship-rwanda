'use client'

import { useState, useEffect } from 'react'
import { UserCircleIcon, BellIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

const notificationSettings = [
  {
    id: 'email' as const,
    title: 'Email Notifications',
    description: 'Receive updates via email'
  },
  {
    id: 'sms' as const,
    title: 'SMS Notifications',
    description: 'Receive text messages for important shipment alerts'
  },
  {
    id: 'push' as const,
    title: 'Push Notifications',
    description: 'Get real-time updates on your mobile device'
  }
]

type NotificationKey = 'email' | 'sms' | 'push'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const [formData, setFormData] = useState({
    ...profileData,
    notifications: {
      email: false,
      sms: false,
      push: false
    }
  })

  // Load saved profile on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    const savedNotifications = localStorage.getItem('userNotifications')

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile)
      setProfileData(parsedProfile)
      setFormData(prev => ({
        ...prev,
        ...parsedProfile
      }))
    }

    if (savedNotifications) {
      const parsedNotifications = JSON.parse(savedNotifications)
      setFormData(prev => ({
        ...prev,
        notifications: parsedNotifications
      }))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value
    }))
  }

  const handleNotificationToggle = (settingId: NotificationKey) => {
    const updatedNotifications = {
      ...formData.notifications,
      [settingId]: !formData.notifications[settingId]
    }

    setFormData(prev => ({
      ...prev,
      notifications: updatedNotifications
    }))

    // Save notifications to localStorage
    localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications))
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const updatedProfile = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    }

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile))
    
    setProfileData(updatedProfile)

    toast.success('Profile Updated Successfully!', {
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    })

    setIsLoading(false)
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    
    // Save notifications to localStorage
    localStorage.setItem('userNotifications', JSON.stringify(formData.notifications))

    toast.success('Notification Preferences Updated', {
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    })

    setIsLoading(false)
  }

  const tabs = [
    { 
      name: 'Profile', 
      icon: <UserCircleIcon className="h-5 w-5" />,
      key: 'profile' 
    },
    { 
      name: 'Notifications', 
      icon: <BellIcon className="h-5 w-5" />,
      key: 'notifications' 
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Account Settings
        </h1>

        {/* Tabs Container */}
        <div className="flex justify-center space-x-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md transition-all
                ${activeTab === tab.key 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}
              `}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === 'profile' && (
          <div className="bg-white shadow sm:rounded-lg p-6">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-900">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
              <p className="text-sm text-gray-500">Select how you want to receive updates</p>

              <div className="divide-y divide-gray-200">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between py-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{setting.title}</h3>
                      <p className="text-gray-500">{setting.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNotificationToggle(setting.id)}
                      className={`
                        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                        ${formData.notifications[setting.id] 
                          ? 'bg-primary-600' 
                          : 'bg-gray-200'}
                      `}
                    >
                      <span
                        className={`
                          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                          ${formData.notifications[setting.id] 
                            ? 'translate-x-5' 
                            : 'translate-x-0'}
                        `}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={handleSaveNotifications}
                  disabled={isLoading}
                  className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}