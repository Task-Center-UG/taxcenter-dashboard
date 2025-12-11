"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../(form)/Form";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { Research } from "@/store/Research";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "../../(form)/validation";
import Loader from "@/components/loading/Loader";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: research,
    isLoading,
    error,
    refetch,
  } = useQuery<Research>(`research/${id}`);
  const { mutate, isMutating } = useMutation();

  // USE FORM
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  // SET DEFAULT VALUES
  useEffect(() => {
    if (research) {
      reset({
        title: research.title,
        description: research.description,
        research_category_id: research.research_category_id,
        cta_url: research.cta_url || "",
      });
    }
  }, [research, reset]);

  // HANDLE SUBMIT
  const onSubmit = async (data: Schema) => {
    console.log(data);
    const result = await mutate(`research/${id}`, "PUT", data);
    if (result) {
      console.log("Research updated successfully!");
      router.push("/program/riset/kerja-sama");
    } else {
      console.error("Failed to update research.");
    }
  };

  const onError = (errors: any) => {
    console.error("Form validation failed:", errors);
  };

  if (isLoading) {
    return <Loader />;
  }

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
              label="Update"
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
