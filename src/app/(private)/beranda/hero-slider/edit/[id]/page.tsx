"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../(form)/Form";

const page = () => {
  // USE FORM
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  // HADLE SUBMIT
  const onSubmit = () => {};
  const onError = () => {};
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
            <ButtonCustom label="Create" color="primary" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default page;
