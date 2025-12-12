"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../(form)/Form";
import ButtonCustom from "@/components/button/ButtonCustom";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useRouter } from "next/navigation";

const page = () => {
  const { mutate, isMutating } = useMutationWithNotification();
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    console.log(data);
    const result = await mutate("umkm-product-photo", "POST", data);
    if (result) {
      console.log("UMKM Product Photo created successfully!");
      router.push("/program/pengabdian/foto-produk-umkm");
    } else {
      console.error("Failed to create UMKM Product Photo.");
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
