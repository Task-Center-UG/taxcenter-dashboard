"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../{form)/Form";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { Gallery } from "@/store/Gallery";
import Loader from "@/components/loading/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "../../{form)/validation";
import { useMutation } from "@/hooks/useMutation";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: gallery,
    isLoading,
    error,
    refetch,
  } = useQuery<Gallery>(`gallery/${id}`);
  const { mutate, isMutating } = useMutation();

  // USE FORM
  const methods = useForm({
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (gallery) {
      reset(gallery);
    }
  }, [gallery, reset]);

  // HADLE SUBMIT
  const onSubmit = async (data: Schema) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");

    if (data.picture_url instanceof File) {
      formData.append("picture_url", data.picture_url);
    } else if (typeof data.picture_url === "string" && data.picture_url) {
    } else {
      formData.append("picture_url", "");
    }
    const result = await mutate(
      `gallery/${id}`,
      "PUT",
      Object.fromEntries(formData.entries())
    );

    if (result) {
      console.log("Gallery created successfully!");
      router.push(`/galeri/foto-kegiatan/${id}`);
    } else {
      console.error("Failed to create gallery.");
    }
  };
  const onError = () => {};

  if (!gallery) {
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
          <Form data={gallery} />
          <div className="flex justify-between">
            <ButtonCustom
              label="Cancel"
              color="default"
              onClick={() => window.history.back()}
            />
            <ButtonCustom
              label="Edit"
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
