"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../(form)/Form";
import ButtonCustom from "@/components/button/ButtonCustom";
import { schema, Schema } from "../(form)/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/navigation";

const page = () => {
  const { mutate, isMutating, error } = useMutation();
  const router = useRouter();

  // USE FORM
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      division_id: 0,
      major_id: 0,
      picture_url: "",
    },
  });
  const { handleSubmit } = methods;

  // HADLE SUBMIT
  const onSubmit = async (data: Schema) => {
    console.log(data);
    const result = await mutate("division-assistants", "POST", data);
    if (result) {
      console.log("Division Assistant created successfully!");
      router.push("/tentang-kami/anggota");
    } else {
      console.error("Failed to create division assistant.");
    }
  };
  const onError = (err: any) => {
    console.error("Validation Failed", err);
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
