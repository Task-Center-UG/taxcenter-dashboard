"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../(form)/Form";
import ButtonCustom from "@/components/button/ButtonCustom";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../(form)/validation";

const page = () => {
  const { mutate, isMutating, error } = useMutationWithNotification();
  const router = useRouter();

  // USE FORM
  const methods = useForm({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  // HADLE SUBMIT
  const onSubmit = async (data: any) => {
    const result = await mutate("gallery", "POST", data);
    if (result) {
      console.log("Gallery created successfully!");
      router.push("/galeri/foto-kegiatan");
    } else {
      console.error("Failed to create gallery.");
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
