"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../(form)/Form";
import ButtonCustom from "@/components/button/ButtonCustom";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "../(form)/validation";

const page = () => {
  const { mutate, isMutating, error } = useMutationWithNotification();
  const router = useRouter();

  // USE FORM
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      research_category_id: 0,
      cta_url: "",
    },
  });
  const { handleSubmit } = methods;

  // HANDLE SUBMIT
  const onSubmit = async (data: Schema) => {
    console.log(data);
    const result = await mutate("research", "POST", data);
    if (result) {
      console.log("Research created successfully!");
      router.push("/program/riset/kerja-sama");
    } else {
      console.error("Failed to create research.");
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
              isDisabled={isMutating}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default page;
