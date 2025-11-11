"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../(form)/Form";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { TaxClinic } from "@/store/TaxClinic";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "../../(form)/validation";
import Loader from "@/components/loading/Loader";
import { useMutation } from "@/hooks/useMutation";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: taxClinic,
    isLoading,
    error,
    refetch,
  } = useQuery<TaxClinic>(`tax-clinic-service/${id}`);
  const { mutate, isMutating } = useMutation();

  // USE FORM
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  // SET DEFAULT VALUES
  useEffect(() => {
    if (taxClinic) {
      reset({
        title: taxClinic.title,
        category: taxClinic.category,
        video_url: taxClinic.video_url || "",
      });
    }
  }, [taxClinic, reset]);

  // HANDLE SUBMIT
  const onSubmit = async (data: Schema) => {
    console.log(data);
    const result = await mutate(`tax-clinic-service/${id}`, "PUT", data);
    if (result) {
      console.log("Tax Clinic updated successfully!");
      router.push("/program/tax-clinic/info-edukasi");
    } else {
      console.error("Failed to update tax clinic.");
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
