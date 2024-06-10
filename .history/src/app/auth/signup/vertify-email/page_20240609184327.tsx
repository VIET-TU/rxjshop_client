"use client";

import { InputFormik } from "@/Components/InputFormik";
import { vertifyEmail } from "@/app/api/auth/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import * as yup from "yup";
import { VertifyEmailInput } from "../../../../../types/auth.type";

const initialValues: VertifyEmailInput = {
  email: "",
};

const VertiyfyEmail = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, error, data, reset, context } = useMutation({
    mutationKey: ["vertifyEmail"],
    mutationFn: (body: VertifyEmailInput) => {
      return vertifyEmail(body);
    },
  });

  const errorForm = useMemo(() => {
    if (isAxiosError(error)) {
      return error.response?.data.errors;
    }
  }, [error]);

  const onSubmit_ = async (
    values: VertifyEmailInput,
    { setSubmitting, resetForm, setErrors }: FormikHelpers<VertifyEmailInput>
  ) => {
    //
    mutate(values, {
      onSuccess: ({ data }) => {
        setSubmitting(true);
        resetForm();
        queryClient.setQueryData(["vertifyEmail"], () => data.data.email);
        console.log("data", data);
        localStorage.setItem("email-register", data.data.email);
        if (data.data.otp === 1 || data.success)
          router.push("/auth/signup/vertify-otp");
      },
      onError: (error: any) => {
        setErrors(error.response.data.errors);
        setSubmitting(true);
        resetForm({
          values: {
            ...values,
          },
        });
      },
    });
  };

  const handleChange = () => {
    if (data || error) {
      reset();
    }
  };

  return (
    <div>
      <div className="mb-[50px]">
        <h1 className="text-4xl">Vertity email</h1>
      </div>

      <div className="mb-[20px]">
        {errorForm && (
          <p className="text-sm font-bold text-red-600 dark:text-red-500">
            <span className="">Oops!</span> {errorForm}
          </p>
        )}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          email: yup
            .string()
            .email("Please enter valid email address")
            .required("Please enter your email address"),
        })}
        onSubmit={onSubmit_}
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
                "Send otp"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VertiyfyEmail;
