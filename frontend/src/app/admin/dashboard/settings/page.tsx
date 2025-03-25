'use client'

import * as React from 'react'
import { useState, FormEvent } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    pushNotifications: true
  })

  const [profileSettings, setProfileSettings] = useState({
    name: 'Admin User',
    email: 'admin@eazyship.com',
    phoneNumber: '+250 788 123 456'
  })

  const [changePassword, setChangePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleProfileUpdate = (e: FormEvent) => {
    e.preventDefault()
    // Implement profile update logic
    alert('Profile Updated')
  }

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault()
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    // Implement password change logic
    alert('Password Changed')
  }

  return (
    <div className="p-6 space-y-10 bg-white text-gray-900">
      {/* Notifications Settings */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Email Notifications</span>
              <Switch
                checked={notifications.email}
                onChange={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                className={classNames(
                  notifications.email ? 'bg-primary-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    notifications.email ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">SMS Notifications</span>
              <Switch
                checked={notifications.sms}
                onChange={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                className={classNames(
                  notifications.sms ? 'bg-primary-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    notifications.sms ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Push Notifications</span>
              <Switch
                checked={notifications.pushNotifications}
                onChange={() => setNotifications(prev => ({ ...prev, pushNotifications: !prev.pushNotifications }))}
                className={classNames(
                  notifications.pushNotifications ? 'bg-primary-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    notifications.pushNotifications ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900 mb-4">Profile</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={profileSettings.name}
                onChange={(e) => setProfileSettings(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={profileSettings.email}
                onChange={(e) => setProfileSettings(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                value={profileSettings.phoneNumber}
                onChange={(e) => setProfileSettings(prev => ({ ...prev, phoneNumber: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-gray-900"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900 mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                value={changePassword.currentPassword}
                onChange={(e) => setChangePassword(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={changePassword.newPassword}
                onChange={(e) => setChangePassword(prev => ({ ...prev, newPassword: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={changePassword.confirmPassword}
                onChange={(e) => setChangePassword(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-gray-900"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}