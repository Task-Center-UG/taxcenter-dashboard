"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../(form)/Form";
import ButtonCustom from "@/components/button/ButtonCustom";
import { schema, Schema } from "../(form)/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const page = () => {
  const { mutate, isMutating, error } = useMutation();
  const router = useRouter();

  // USE FORM
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  // HADLE SUBMIT
  const onSubmit = async (data: Schema) => {
    const result = await mutate("tax-module", "POST", data);
    if (result) {
      console.log("Division created successfully!");
      router.push("/program/relawan-pajak/modul");
    } else {
      console.error("Failed to create division.");
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
