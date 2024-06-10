'use client'

import { InputFormik } from '@/Components/InputFormik'
import { forgetPassowrd } from '@/app/api/auth/auth.api'
import { ForgetPasswordInput } from '@/types/auth.type'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Form, Formik, FormikHelpers } from 'formik'
import React, { useMemo, useState } from 'react'
import * as yup from 'yup'

const initialValues: ForgetPasswordInput = {
	email: '',
}

const ForgetPassword = () => {
	const [sendEmail, setSendEmail] = useState<string>('')

	const { mutate, error, data, reset, context } = useMutation({
		mutationKey: ['forgetPassword'],
		mutationFn: (body: ForgetPasswordInput) => {
			return forgetPassowrd(body)
		},
	})

	const errorForm = useMemo(() => {
		if (isAxiosError(error)) {
			return error.response?.data.errors
		}
	}, [error])

	const handleChange = () => {
		if (data || error) {
			reset()
		}
	}

	const handleSubmit = (
		values: ForgetPasswordInput,
		{ setSubmitting, resetForm }: FormikHelpers<ForgetPasswordInput>
	) => {
		mutate(values, {
			onSuccess: ({ data }) => {
				setSubmitting(true)
				resetForm()
				setSendEmail(() => data.message.toString())
			},
			onError: () => {
				setSubmitting(true)
				resetForm()
			},
		})
	}

	return (
		<>
			<div>
				<div className="mb-[40px]">
					<h1 className="text-4xl">Forget Passowrd</h1>
				</div>

				<div className="mb-[20px]">
					{errorForm && (
						<p className="text-sm text-red-600 dark:text-red-500 font-bold">
							<span className="">Oops!</span> {errorForm}
						</p>
					)}
				</div>
				{sendEmail && (
					<div className="mb-[20px]">
						<p className="text-sm text-red-600 dark:text-red-500 font-bold">{sendEmail}</p>
					</div>
				)}
				{!sendEmail && (
					<Formik
						initialValues={initialValues}
						validationSchema={yup.object({
							email: yup
								.string()
								.email('Please enter valid email address')
								.required('Please enter your email address'),
						})}
						onSubmit={handleSubmit}
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
				)}
			</div>
		</>
	)
}

export default ForgetPassword
