'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [verificationCode, setVerificationCode] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        
        setUserEmail(values.email)
        
        toast.success('Verification code sent to your email!')
        setStep(2)
      } catch (error) {
        toast.error('Signup failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
  })

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      
      if (verificationCode) {
        setShowSuccess(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else {
        toast.error('Please enter the verification code')
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-primary-700 py-8 px-4 shadow-md rounded-lg sm:px-10">
          {step === 1 ? (
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    {...formik.getFieldProps('name')}
                    className="block w-full appearance-none rounded-md border border-primary-300 bg-primary-800 text-white px-3 py-2 placeholder:text-white placeholder:opacity-70 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-primary-300"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="mt-2 text-sm text-red-400">
                      {formik.errors.name}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...formik.getFieldProps('email')}
                    className="block w-full appearance-none rounded-md border border-primary-300 bg-primary-800 text-white px-3 py-2 placeholder:text-white placeholder:opacity-70 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-primary-300"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="mt-2 text-sm text-red-400">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    {...formik.getFieldProps('password')}
                    className="block w-full appearance-none rounded-md border border-primary-300 bg-primary-800 text-white px-3 py-2 placeholder:text-white placeholder:opacity-70 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-primary-300"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="mt-2 text-sm text-red-400">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-white"
                >
                  Confirm password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    {...formik.getFieldProps('confirmPassword')}
                    className="block w-full appearance-none rounded-md border border-primary-300 bg-primary-800 text-white px-3 py-2 placeholder:text-white placeholder:opacity-70 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-primary-300"
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <div className="mt-2 text-sm text-red-400">
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-primary-600 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerificationSubmit}>
              <div>
                <p className="text-sm text-white mb-4">
                  We've sent a verification code to {userEmail}. Please enter it
                  below to complete your registration.
                </p>
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-medium text-white"
                >
                  Verification Code
                </label>
                <div className="mt-1">
                  <input
                    id="verificationCode"
                    type="text"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-primary-300 bg-primary-800 text-white px-3 py-2 placeholder:text-white placeholder:opacity-70 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-primary-300"
                    placeholder="Enter verification code"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-primary-600 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  {isLoading ? 'Verifying...' : 'Verify and Complete'}
                </button>
              </div>

              <div className="text-sm text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Go back
                </button>
              </div>
            </form>
          )}

          {showSuccess && (
            <div className="mt-4 rounded-md bg-green-800 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-400">
                    Account created successfully! Redirecting...
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
