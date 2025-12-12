"use client";

import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../(form)/Form";
import ButtonCustom from "@/components/button/ButtonCustom";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { Training } from "@/store/Training";
import Loader from "@/components/loading/Loader";

const page = () => {
  const { id } = useParams();
  const { mutate, isMutating } = useMutationWithNotification();
  const router = useRouter();
  const { data: training, isLoading } = useQuery<Training>(`training/${id}`);
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (training) {
      reset({
        title: training.title,
        description: training.description,
        image_url: training.image_url,
      });
    }
  }, [training, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);
    const result = await mutate(`training/${id}`, "PUT", data);
    if (result) {
      console.log("Training updated successfully!");
      router.push(`/program/pengabdian/pelatihan-umkm/${id}`);
    } else {
      console.error("Failed to update training.");
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
              isLoading={isMutating}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default page;
