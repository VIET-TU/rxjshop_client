"use client";
import Label from "@/components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import { avatarImgs } from "@/contains/fakeData";
import Image from "next/image";
import { User } from "../../../../types/user.type";
import useCheckAuth from "@/components/hooks/useCheckAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/app/api/user/user.api";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import Input2 from "@/shared/Input/Input2";

const AccountPage = () => {
  const initialValues: User = {
    email: "",
    fullName: "",
    phone: "",
    address: "",
    avatar: "",
  };

  const [userData, setUserData] = useState(initialValues);
  const [image, setImage] = useState<string>("");
  const { data, refetch } = useCheckAuth();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (data) {
      const { email, fullName, phone, address, avatar } = data.data
        .data as unknown as User;
      setImage(avatar as string);
      setUserData({
        email,
        fullName,
        phone,
        address,
        avatar: "",
      });
    }
  }, [data]);

  const { mutate, error, isLoading, reset } = useMutation({
    mutationFn: (body: FormData) => {
      return updateUser(body);
    },
  });

  const onUpdateUser = (
    values: User,
    { setSubmitting, resetForm }: FormikHelpers<User>
  ) => {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("avatar", values.avatar);
    mutate(formData, {
      onSuccess: (data) => {
        setSubmitting(false);
        console.log("data", data.data);
        queryClient.setQueryData(["me"], data);
        toast.success("Update User successfully", { autoClose: 5000 });
      },
      onError: () => {
        setSubmitting(false);
        toast.error("Update User false", { autoClose: 5000 });
      },
    });
  };

  const handleChange = () => {
    if (data || error) {
      reset();
    }
  };

  const fileInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      setFieldValue("avatar", file);
    }
  };

  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-10 sm:space-y-12">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Account infomation
        </h2>
        <Formik
          initialValues={userData}
          onSubmit={onUpdateUser}
          enableReinitialize
        >
          {(formik: any) => (
            <Form onChange={handleChange}>
              <div className="flex flex-col md:flex-row">
                <div className="flex items-start flex-shrink-0">
                  {/* AVATAR */}
                  <div className="relative flex overflow-hidden rounded-full">
                    <Image
                      src={image ? image : avatarImgs[2]}
                      alt="avatar"
                      width={128}
                      height={128}
                      className="z-0 object-cover w-32 h-32 rounded-full"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black cursor-pointer bg-opacity-60 text-neutral-50">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className="mt-1 text-xs">Change Image</span>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      name="avatar"
                      id="avatar"
                      onChange={(event) =>
                        fileInputHandler(event, formik.setFieldValue)
                      }
                    />
                  </div>
                </div>
                <div className="flex-grow max-w-3xl mt-10 space-y-6 md:mt-0 md:pl-16">
                  {/* EMAIL */}
                  <div>
                    <Label>Email</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl las la-envelope"></i>
                      </span>
                      <Input2
                        className="!rounded-l-none"
                        placeholder=""
                        name="email"
                        id="email"
                        type="email"
                        readOnly
                      />
                    </div>
                  </div>
                  {/* END EMAIL */}
                  {/* ---- */}

                  {/* ---- FULLNAME */}
                  <div>
                    <Label>Email</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl las la-signature "></i>
                      </span>
                      <Input2
                        className="!rounded-l-none"
                        placeholder="Full name"
                        name="fullName"
                        id="fullname"
                        type="text"
                      />
                    </div>
                  </div>

                  {/* ---- END FULLNAME */}
                  {/* PHONE NUMBER */}
                  <div className="max-w-lg">
                    <Label>Phone number</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl las la-calendar"></i>
                      </span>
                      <Input2
                        className="!rounded-l-none"
                        placeholder=""
                        id="phone"
                        name="phone"
                        type="text"
                      />
                    </div>
                  </div>
                  {/* END PHONE NUMBER */}
                  {/* ---- ADDRESS */}
                  <div>
                    <Label>Addess</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl las la-map-signs"></i>
                      </span>
                      <Input
                        className="!rounded-l-none"
                        defaultValue="New york, USA"
                      />
                    </div>
                  </div>

                  {/* ---- END ADDRESS */}
                  <div>
										<Label>Addess</Label>
										<div className="mt-1.5 flex">
											<span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
												<i className="text-2xl las la-map-signs"></i>
											</span>
											<Input
												className="!rounded-l-none"
												placeholder=""
												id="address"
												name="address"
											/>
										</div>

                  {/* ---- */}
                  <div>
                    <Label>Phone number</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl las la-phone-volume"></i>
                      </span>
                      <Input
                        className="!rounded-l-none"
                        defaultValue="003 888 232"
                      />
                    </div>
                  </div>
                  {/* ---- */}
                  <div>
                    <Label>About you</Label>
                    <Textarea className="mt-1.5" defaultValue="..." />
                  </div>
                  <div className="pt-2">
                    <ButtonPrimary>Update account</ButtonPrimary>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AccountPage;
