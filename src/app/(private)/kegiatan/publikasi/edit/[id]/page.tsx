"use client";

import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../(form)/Form";
import ButtonCustom from "@/components/button/ButtonCustom";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { Publication } from "@/store/Publication";
import Loader from "@/components/loading/Loader";

const page = () => {
  const { id } = useParams();
  const { mutate, isMutating } = useMutationWithNotification();
  const router = useRouter();
  const { data: publication, isLoading } = useQuery<Publication>(
    `publication/${id}`
  );
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (publication) {
      reset({
        title: publication.title,
        description: publication.description,
        year: publication.year,
      });
    }
  }, [publication, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);
    const result = await mutate(`publication/${id}`, "PUT", data);
    if (result) {
      console.log("Publication updated successfully!");
      router.push(`/kegiatan/publikasi/${id}`);
    } else {
      console.error("Failed to update publication.");
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
