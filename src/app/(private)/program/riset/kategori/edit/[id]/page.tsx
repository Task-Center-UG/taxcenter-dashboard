"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../(form)/Form";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { ResearchCategory } from "@/store/ResearchCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "../../(form)/validation";
import Loader from "@/components/loading/Loader";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: researchCategory,
    isLoading,
    error,
    refetch,
  } = useQuery<ResearchCategory>(`research-category/${id}`);
  const { mutate, isMutating } = useMutationWithNotification();

  // USE FORM
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  // SET DEFAULT VALUES
  useEffect(() => {
    if (researchCategory) {
      reset({
        title: researchCategory.title,
      });
    }
  }, [researchCategory, reset]);

  // HANDLE SUBMIT
  const onSubmit = async (data: Schema) => {
    console.log(data);
    const result = await mutate(`research-category/${id}`, "PUT", data);
    if (result) {
      console.log("Research Category updated successfully!");
      router.push("/program/riset/kategori");
    } else {
      console.error("Failed to update research category.");
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
