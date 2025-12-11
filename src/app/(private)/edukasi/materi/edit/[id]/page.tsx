"use client";

import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../(form)/Form";
import ButtonCustom from "@/components/button/ButtonCustom";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { TaxMaterial } from "@/store/TaxMaterial";
import Loader from "@/components/loading/Loader";

const page = () => {
  const { id } = useParams();
  const { mutate, isMutating } = useMutationWithNotification();
  const router = useRouter();
  const { data: taxMaterial, isLoading } = useQuery<TaxMaterial>(
    `tax-material/${id}`
  );
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (taxMaterial) {
      reset({
        title: taxMaterial.title,
        description: taxMaterial.description,
        file_url: taxMaterial.file_url,
        image_url: taxMaterial.image_url,
      });
    }
  }, [taxMaterial, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);
    const result = await mutate(`tax-material/${id}`, "PUT", data);
    if (result) {
      console.log("Tax Material updated successfully!");
      router.push(`/edukasi/materi/${id}`);
    } else {
      console.error("Failed to update tax material.");
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
