"use client";
import { useMutation } from "@/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Schema, schema } from "../(form)/validation";
import ButtonCustom from "@/components/button/ButtonCustom";
import Form from "../(form)/Form";

const page = () => {
  const { mutate, isMutating, error } = useMutation();
  const router = useRouter();
  const { id } = useParams();

  // USE FORM
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  // HADLE SUBMIT
  const onSubmit = async (data: Schema) => {
    const payload = {
      ...data,
      division_id: id,
    };
    const result = await mutate("activity-divisions", "POST", payload);
    if (result) {
      console.log("Division created successfully!");
      router.push(`/tentang-kami/divisi/${id}`);
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
