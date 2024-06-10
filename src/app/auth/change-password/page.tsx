'use client'
import { InputFormik } from '@/Components/InputFormik'
import { changePassword } from '@/app/api/auth/auth.api'
import { ChangePasswordInput } from '@/types/auth.type'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import * as yup from 'yup'

interface IChangePasswordInput {
	password: string
}

const initialValues: IChangePasswordInput = {
	password: '',
}

const ChangePassword = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const token = searchParams.get('token') || ''
	const userId = searchParams.get('userId') || ''

	const { mutate, error, data, reset, context } = useMutation({
		mutationKey: ['changePassword'],
		mutationFn: (body: ChangePasswordInput) => {
			return changePassword(body)
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

	const onChangaPasswordSubmit = (
		values: IChangePasswordInput,
		{ setSubmitting, resetForm }: FormikHelpers<IChangePasswordInput>
	) => {
		const data: ChangePasswordInput = {
			password: values.password,
			token,
			userId,
		}
		mutate(data, {
			onSuccess: ({ data }) => {
				setSubmitting(true)
				resetForm()
				if (data.success) router.push('/auth/login')
			},
			onError: () => {
				setSubmitting(true)
				resetForm()
			},
		})
	}

	return (
		<div>
			<div className="mb-[40px]">
				<h1 className="text-4xl">Change password</h1>
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
					password: yup
						.string()
						.min(3, 'Your password must be at least 8 characters or greater')
						.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
							message:
								'Your password must have at least 1 uppercase, 1 lowercase, 1 special character',
						})
						.required('Please enter your password'),
				})}
				onSubmit={onChangaPasswordSubmit}
			>
				{(formik: any) => (
					<Form onChange={handleChange}>
						<InputFormik
							name="password"
							placeholder="Enter your password"
							id="password"
							label="New Password"
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
		</div>
	)
}

export default ChangePassword
