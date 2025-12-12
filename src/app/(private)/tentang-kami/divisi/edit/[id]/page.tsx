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

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: division,
    isLoading,
    error,
    refetch,
  } = useQuery<Division>(`divisions/${id}`);
  const { mutate, isMutating } = useMutationWithNotification();

  // USE FORM
  const methods = useForm({
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (division) {
      reset(division);
    }
  }, [division, reset]);

  // HADLE SUBMIT
  const onSubmit = async (data: Schema) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");

    if (data.picture_url instanceof File) {
      formData.append("picture_url", data.picture_url);
    } else if (typeof data.picture_url === "string" && data.picture_url) {
    } else {
      formData.append("picture_url", "");
    }

    const result = await mutate(
      `divisions/${id}`,
      "PATCH",
      Object.fromEntries(formData.entries())
    );
    if (result) {
      console.log("Divisions created successfully!");
      router.push(`/tentang-kami/divisi/${id}`);
    } else {
      console.error("Failed to create divisions.");
    }
  };
  const onError = () => {};

  if (!division) {
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
          <Form data={division} />
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
