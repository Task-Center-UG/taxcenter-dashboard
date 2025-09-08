"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../{form)/Form";
import ButtonCustom from "@/components/button/ButtonCustom";
import { useMutation } from "@/hooks/useMutation";

const page = () => {
  const { mutate, isMutating, error } = useMutation();

  // USE FORM
  const methods = useForm();
  const { handleSubmit } = methods;

  // HADLE SUBMIT
  const onSubmit = async (data: any) => {
    console.log(data);
    const result = await mutate("sliders", "POST", data);
    if (result) {
      console.log("Slider created successfully!");
    } else {
      console.error("Failed to create slider.");
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
            <ButtonCustom label="Create" color="primary" type="submit" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default page;
