"use client";

import { InputFormik } from "@/Components/InputFormik";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/app/api/auth/auth.api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { LoginInput } from "../../../../types/auth.type";
import useCheckAuth from "@/components/hooks/useCheckAuth";
import { HEADER } from "@/utils/constants";

const initialValues: LoginInput = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: _authData, isLoading } = useCheckAuth();

  const meQuery = queryClient.setQueryDefaults(["loginUser"], {
    staleTime: 50 * 60,
  });

  const { mutate, error, data, reset, context } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: (body: LoginInput) => {
      return loginUser(body);
    },
  });

  const errorForm = useMemo(() => {
    if (isAxiosError(error)) {
      return error.response?.data.errors;
    }
  }, [error]);

  const onLoginSubmit = (
    values: LoginInput,
    { setSubmitting, resetForm }: FormikHelpers<LoginInput>
  ) => {
    mutate(values, {
      onSuccess: ({ data }) => {
        setSubmitting(true);
        resetForm();
        queryClient.setQueryData(["loginUser"], () => data.data.user);
        localStorage.setItem(HEADER.CLIENT_ID, data.data.user.id as string);
        localStorage.setItem(HEADER.AC_TOKEN, data.data.accessToken);
        toast.success("Login successfully", { autoClose: 2000 });
        router.push("/");
      },
      onError: () => {
        setSubmitting(true);
        resetForm({
          values: {
            ...values,
            password: "",
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
    <>
      {isLoading ? (
        <div className="">{/* <Spinner size="lg" /> */}</div>
      ) : (
        <div>
          <div className="mb-[40px]">
            <h1 className="text-4xl">Login</h1>
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
              password: yup
                .string()
                .min(
                  3,
                  "Your password must be at least 8 characters or greater"
                )
                // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
                // 	message:
                // 		'Your password must have at least 1 uppercase, 1 lowercase, 1 special character',
                // })
                .required("Please enter your password"),
            })}
            onSubmit={onLoginSubmit}
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
                    "Submit"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-[20px] flex justify-between">
            <div>
              <span>Do not have an account?</span>{" "}
              <Link
                className="text-[#ff90e8]"
                href="/auth/signup/vertify-email"
              >
                Sign up
              </Link>
            </div>
            <Link className="text-[#ff90e8]" href="/auth/forget-passowrd">
              Forgot password
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
