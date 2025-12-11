"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../(form)/Form";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { Division } from "@/store/Division";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "../../(form)/validation";
import Loader from "@/components/loading/Loader";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { Module } from "@/store/ModuleRelawanPajak";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: module,
    isLoading,
    error,
    refetch,
  } = useQuery<Module>(`tax-module/${id}`);
  const { mutate, isMutating } = useMutationWithNotification();

  // USE FORM
  const methods = useForm({
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (module) {
      reset(module);
    }
  }, [module, reset]);

  // HADLE SUBMIT
  const onSubmit = async (data: Schema) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category || "");
    formData.append("description", data.description || "");

    if (data.file_url instanceof File) {
      formData.append("file_url", data.file_url);
    } else if (typeof data.file_url === "string" && data.file_url) {
    } else {
      formData.append("file_url", "");
    }

    const result = await mutate(
      `tax-module/${id}`,
      "PUT",
      Object.fromEntries(formData.entries())
    );
    if (result) {
      console.log("Divisions created successfully!");
      router.push(`/program/relawan-pajak/modul/${id}`);
    } else {
      console.error("Failed to create divisions.");
    }
  };
  const onError = () => {};

  if (!module) {
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
          <Form data={module} />
          <div className="flex justify-between">
            <ButtonCustom
              label="Cancel"
              color="default"
              onClick={() => window.history.back()}
            />
            <ButtonCustom
              label="Submit"
              color="primary"
              isLoading={isMutating}
              type="submit"
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default page;
