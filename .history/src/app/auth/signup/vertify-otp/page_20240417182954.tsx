'use client'

import { InputFormik } from '@/Components/InputFormik'
import { vertifyOtp } from '@/app/api/auth/auth.api'
import { VertifyOtpInput, VertifyOtpResponse } from '@/types/auth.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import * as yup from 'yup'

const initialValues: VertifyOtpInput = {
	Otp: '',
	email: '',
}

const VertifyOtp = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutate, error, data, reset, context } = useMutation({
		mutationKey: ['vertifyOtp'],
		mutationFn: (body: VertifyOtpInput) => {
			console.log('body', body)
			return vertifyOtp({
				email: localStorage.getItem('email-register') || '',
				Otp: body.Otp,
			})
		},
	})

	const errorForm = useMemo(() => {
		if (isAxiosError(error)) {
			return error.response?.data.errors
		}
	}, [error])

	const onSubmit = async (
		values: VertifyOtpInput,
		{ setSubmitting, resetForm }: FormikHelpers<VertifyOtpInput>
	) => {
		console.log('values', values)
		mutate(values, {
			onSuccess: ({ data }) => {
				setSubmitting(true)
				resetForm()
				if (data.data === 'ok' || data.success) router.push('/auth/signup/')
			},
			onError: (error: any) => {
				setSubmitting(true)
				resetForm({
					values: {
						...values,
					},
				})
			},
		})
	}
	return (
		<div>
			<div className="mb-[50px]">
				<h1 className="text-4xl">Vertify Otp</h1>
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
					Otp: yup.string().required('Please enter your otp'),
				})}
				onSubmit={onSubmit}
			>
				{(formik: any) => (
					<Form>
						<InputFormik
							name="Otp"
							placeholder="Enter your otp"
							id="Otp"
							label="Otp"
							type="text"
						></InputFormik>
						<button
							type="submit"
							disabled={formik.isSubmitting}
							className="w-full p-4 mt-5 font-semibold text-white bg-[#ff90e8] rounded-lg"
						>
							{formik.isSubmitting ? (
								<div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
							) : (
								'Vertify otp'
							)}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default VertifyOtp
