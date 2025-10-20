"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../{form)/Form";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import {
  DivisionAssistant,
  DivisionAssistants,
} from "@/store/DivisionAssistant";
import { useMutation } from "@/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "../../{form)/validation";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: divisionAssistant,
    isLoading,
    error,
    refetch,
  } = useQuery<DivisionAssistant>(`division-assistants/${id}`);
  const { mutate, isMutating } = useMutation();

  // USE FORM
  const methods = useForm({
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (divisionAssistant) {
      const fullPictureUrl = divisionAssistant.picture_url
        ? `${process.env.NEXT_PUBLIC_BASIC_URL}/${divisionAssistant.picture_url}`
        : "";

      const formatData = {
        ...divisionAssistant,
        division_id: divisionAssistant?.Division?.id,
        major_id: divisionAssistant?.Major.id,
        picture_url: fullPictureUrl,
      };
      reset(formatData);
    }
  }, [divisionAssistant, reset]);

  // HADLE SUBMIT
  const onSubmit = async (data: Schema) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("division_id", String(data.division_id));
    formData.append("major_id", String(data.major_id));

    if (data.picture_url instanceof File) {
      formData.append("picture_url", data.picture_url);
    }

    const result = await mutate(
      `division-assistants/${id}`,
      "PATCH",
      Object.fromEntries(formData.entries())
    );

    if (result) {
      console.log("Division Assistant updated successfully!");
      router.push(`/tentang-kami/anggota/${id}`);
    } else {
      console.error("Failed to update division assistant.");
    }
  };
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
            <ButtonCustom label="Create" color="primary" type="submit" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default page;
