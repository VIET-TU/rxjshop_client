import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-2xl",
      children,
      type = "text",
      ...args
    },
    ref
  ) => {
    const [field, meta] = useField(args as any);
    return (
      <>
        <input
          ref={ref}
          type={type}
          className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`}
          {...field}
          {...args}
        />
        {meta.touched && meta.error && (
          <p className="text-sm text-red-500">{meta.error}</p>
        )}
      </>
    );
  }
);

export default Input;
