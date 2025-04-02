'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

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
      setIsLoading(true)
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password,
          role: values.role
        })

        if (result?.error) {
          toast.error(result.error)
          setIsLoading(false)
          return
        }

        // Use server-side redirect for more reliable routing
        if (values.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/dashboard')
        }
      } catch (error) {
        toast.error('An unexpected error occurred')
        setIsLoading(false)
      }
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
        <div className="bg-primary-800 py-8 px-4 shadow-md rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email"
                className="block w-full appearance-none rounded-md border border-primary-300 bg-primary-800 text-white px-3 py-2 placeholder:text-white placeholder:opacity-70 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-primary-300"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="mt-2 text-sm text-red-400">{formik.errors.email}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter your password"
                className="block w-full appearance-none rounded-md border border-primary-300 bg-primary-800 text-white px-3 py-2 placeholder:text-white placeholder:opacity-70 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-primary-300"
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="mt-2 text-sm text-red-400">{formik.errors.password}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-white">
                Sign in as
              </label>
              <div className="mt-1 relative">
                <select
                  id="role"
                  name="role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                  className="block w-full pl-3 pr-10 py-2 text-base border-primary-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-primary-700 text-white"
                >
                  <option value="user" className="text-white bg-primary-800">User</option>
                  <option value="admin" className="text-white bg-primary-800">Administrator</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-primary-600 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-primary-800 text-white">
                  Don't have an account?{' '}
                  <Link 
                    href="/auth/signup" 
                    className="text-primary-300 hover:text-primary-200 font-semibold"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}