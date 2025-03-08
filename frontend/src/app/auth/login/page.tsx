'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: 'user'
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      role: Yup.string()
        .oneOf(['user', 'admin'], 'Invalid role')
        .required('Role is required')
    }),
    onSubmit: async (values) => {
      setShowSuccess(true)
      setTimeout(() => {
        if (values.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/dashboard')
        }
      }, 1000)
    },
  })

  return (
    <div className="min-h-screen bg-primary-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-primary-700 py-8 px-4 shadow-md rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-white">
                Sign in as
              </label>
              <select
                id="role"
                name="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                className="mt-1 block w-full rounded-md border-gray-300 bg-primary-800 text-white py-2 pl-3 pr-10 text-base focus:border-primary-300 focus:outline-none focus:ring-primary-300"
              >
                <option value="user" className="text-white bg-primary-800">User</option>
                <option value="admin" className="text-white bg-primary-800">Administrator</option>
              </select>
              {formik.touched.role && formik.errors.role ? (
                <div className="mt-2 text-sm text-red-400">{formik.errors.role}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="block w-full appearance-none rounded-md border border-primary-300 bg-primary-800 text-white px-3 py-2 placeholder:text-white placeholder:opacity-70 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-primary-300"
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="mt-2 text-sm text-red-400">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="block w-full appearance-none rounded-md border border-primary-300 bg-primary-800 text-white px-3 py-2 placeholder:text-white placeholder:opacity-70 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-primary-300"
                  placeholder="Enter your password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="mt-2 text-sm text-red-400">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-primary-600 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>

          {showSuccess && (
            <div className="mt-4 rounded-md bg-green-800 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-400">
                    Login successful! Redirecting...
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
