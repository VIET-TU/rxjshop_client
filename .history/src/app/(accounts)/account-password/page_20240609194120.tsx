"use client";

import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Label from "@/components/Label/Label";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/app/api/user/user.api";
import { toast } from "react-toastify";
import { UpdatePasswd } from "../../../../types/user.type";
import Input2 from "@/shared/Input/Input2";

const initialValues: UpdatePasswd = {
  currentPasswd: "",
  newPasswd: "",
  confirmPasswd: "",
};

const AccountPass = () => {
  const { mutate, error, isLoading, reset } = useMutation({
    mutationFn: (body: UpdatePasswd) => {
      return changePassword(body);
    },
  });

  const onUpdatePassword = (
    values: UpdatePasswd,
    { setSubmitting, resetForm, setErrors }: FormikHelpers<UpdatePasswd>
  ) => {
    if (values.newPasswd !== values.confirmPasswd) {
      setErrors({ confirmPasswd: "Confirm password not match" });
      setSubmitting(false);
      return;
    }

    mutate(values, {
      onSuccess: (data) => {
        setSubmitting(false);
        resetForm();
        toast.success("Change password successfully", { autoClose: 5000 });
      },
      onError: () => {
        setSubmitting(false);
        toast.error("Current password is incorrect", { autoClose: 5000 });
      },
    });
  };

  const handleChange = () => {};
  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl font-semibold sm:text-3xl">
        Update your password
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={onUpdatePassword}
        enableReinitialize
        validationSchema={yup.object({
          currentPasswd: yup
            .string()
            .min(5, "Your password must be at least 6 characters or greater")
            .required("Please enter your password"),
          newPasswd: yup
            .string()
            .min(5, "Your password must be at least 6 characters or greater")
            .required("Please enter your password"),
          confirmPasswd: yup
            .string()
            .min(5, "Your password must be at least 6 characters or greater")
            .required("Please enter your password"),
        })}
      >
        {(formik: any) => (
          <Form onChange={handleChange}>
            <div className="max-w-xl space-y-6 ">
              <div>
                <Label>Current password</Label>
                <Input2
                  type="password"
                  name="currentPasswd"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>New password</Label>
                <Input2 type="password" name="newPasswd" className="mt-1.5" />
              </div>
              <div>
                <Label>Confirm password</Label>
                <Input2
                  type="password"
                  name="confirmPasswd"
                  className="mt-1.5"
                />
              </div>
              <div className="pt-2">
                <ButtonPrimary type="submit" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? (
                    <div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  ) : (
                    "Update password"
                  )}
                </ButtonPrimary>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountPass;
