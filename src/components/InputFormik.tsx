import { useField } from 'formik'
import React from 'react'

export const InputFormik = ({ label, childrent, ...props }: any) => {
	const [field, meta] = useField(props)
	return (
		<div className="flex flex-col gap-3 mb-5">
			<label htmlFor={props.id} className="cursor-pointer">
				{label}
			</label>
			<input
				className="p-3  w-full transition-all bg-white border-2 border-gray-100 rounded-lg outline-none focus:border-[#ff90e8]"
				{...field}
				{...props}
			/>
			{meta.touched && meta.error && <p className="text-sm text-red-500">{meta.error}</p>}
		</div>
	)
}
