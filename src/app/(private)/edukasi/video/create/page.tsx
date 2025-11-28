"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../(form)/Form";
import ButtonCustom from "@/components/button/ButtonCustom";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/navigation";

const page = () => {
  const { mutate, isMutating } = useMutation();
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    console.log(data);
    const result = await mutate("tax-learning-video", "POST", data);
    if (result) {
      console.log("Tax Learning Video created successfully!");
      router.push("/edukasi/video");
    } else {
      console.error("Failed to create tax learning video.");
    }
  };

  const onError = (errors: any) => {
    console.error("Form validation failed:", errors);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <ButtonCustom
              onClick={() => window.history.back()}
              label="Back"
              color="default"
            />
          </div>
          <Form />
          <div className="flex justify-between">
            <ButtonCustom
              label="Cancel"
              color="default"
              onClick={() => window.history.back()}
            />
            <ButtonCustom
              label="Create"
              color="primary"
              type="submit"
              isLoading={isMutating}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default page;
