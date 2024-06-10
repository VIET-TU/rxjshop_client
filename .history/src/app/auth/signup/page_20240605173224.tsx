'use client'

import { InputFormik } from '@/Components/InputFormik'
import { Form, Formik, FormikHelpers } from 'formik'
import Link from 'next/link'
import * as yup from 'yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LoginInput, SignUpInput } from '@/types/auth.type'
import { loginUser, signUp } from '@/app/api/auth/auth.api'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import useCheckAuth from '@/Components/hooks/useCheckAuth'
import { Spinner } from '@nextui-org/react'
import { HEADER } from '@/utils/constants'

const initialValues: SignUpInput = {
	email: localStorage.getItem('email-register') || '',
	firstName: '',
	lastName: '',
	password: '',
}

const SignUp = () => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { data: _authData, isLoading } = useCheckAuth()

	const { mutate, error, data, reset, context } = useMutation({
		mutationKey: ['signUp'],
		mutationFn: (body: SignUpInput) => {
			return signUp(body)
		},
	})

	const errorForm = useMemo(() => {
		if (isAxiosError(error)) {
			return error.response?.data.errors
		}
	}, [error])

	const onSignUpSubmit = (
		values: SignUpInput,
		{ setSubmitting, resetForm }: FormikHelpers<SignUpInput>
	) => {
		mutate(values, {
			onSuccess: ({ data }) => {
				setSubmitting(true)
				resetForm()
				if (data.success) router.push('/auth/login')
			},
			onError: () => {
				setSubmitting(true)
				resetForm({
					values: {
						...values,
						password: '',
					},
				})
			},
		})
	}
	const handleChange = () => {
		if (data || error) {
			reset()
		}
	}
	return (
		<>
			{isLoading ? (
				<div className="">
					<Spinner size="lg" />
				</div>
			) : (
				<div>
					<div className="mb-[40px]">
						<h1 className="text-4xl">Login</h1>
					</div>

					<div className="mb-[20px]">
						{errorForm && (
							<p className="text-sm text-red-600 dark:text-red-500 font-bold">
								<span className="">Oops!</span> {errorForm}
							</p>
						)}
					</div>
					<Formik
						initialValues={initialValues}
						validationSchema={yup.object({
							email: yup
								.string()
								.email('Please enter valid email address')
								.required('Please enter your email address'),
							firstName: yup
								.string()
								.min(2, 'firstName min length 2')
								.required('Please enter your firstName address'),
							lastName: yup
								.string()
								.min(2, 'firstName min length 2')
								.required('Please enter your firstName  address'),
							password: yup
								.string()
								.min(3, 'Your password must be at least 8 characters or greater')
								.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
									message:
										'Your password must have at least 1 uppercase, 1 lowercase, 1 special character',
								})
								.required('Please enter your password'),
						})}
						onSubmit={onSignUpSubmit}
					>
						{(formik: any) => (
							<Form onChange={handleChange}>
								<InputFormik
									name="email"
									placeholder="Enter your email"
									id="email"
									label="Email address"
									type="email"
								></InputFormik>
								<InputFormik
									name="firstName"
									placeholder="Enter your firstName"
									id="firstName"
									label="First name"
									type="text"
								></InputFormik>
								<InputFormik
									name="lastName"
									placeholder="Enter your lastName"
									id="firstName"
									label="Last name"
									type="text"
								></InputFormik>
								<InputFormik
									name="password"
									placeholder="Enter your password"
									id="password"
									label="Password"
									type="password"
								></InputFormik>

								<button
									type="submit"
									disabled={formik.isSubmitting}
									className="w-full p-4 mt-5 font-semibold text-white bg-[#ff90e8] rounded-lg"
								>
									{formik.isSubmitting ? (
										<div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
									) : (
										'Submit'
									)}
								</button>
							</Form>
						)}
					</Formik>
					<div className="mt-[20px] flex justify-between">
						<div>
							<span>Do not have an account?</span>{' '}
							<Link className="text-[#ff90e8]" href="/auth/signup/vertify-email">
								Sign up
							</Link>
						</div>
						<Link className="text-[#ff90e8]" href="/auth/signup">
							Forgot password
						</Link>
					</div>
				</div>
			)}
		</>
	)
}

export default SignUp
