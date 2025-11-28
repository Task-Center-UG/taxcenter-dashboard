"use client";

import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../(form)/Form";
import ButtonCustom from "@/components/button/ButtonCustom";
import { useMutation } from "@/hooks/useMutation";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { AfternoonTalk } from "@/store/AfternoonTalk";

const page = () => {
  const { id } = useParams();
  const { mutate, isMutating } = useMutation();
  const router = useRouter();
  const { data: podcast, isLoading } = useQuery<AfternoonTalk>(
    `afternoon-talk/${id}`
  );
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (podcast) {
      reset({
        title: podcast.title,
        description: podcast.description,
        video_url: podcast.video_url,
        spotify_url: podcast.spotify_url,
      });
    }
  }, [podcast, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);
    const result = await mutate(`afternoon-talk/${id}`, "PUT", data);
    if (result) {
      console.log("Podcast updated successfully!");
      router.push(`/edukasi/podcast/${id}`);
    } else {
      console.error("Failed to update podcast.");
    }
  };

  const onError = (errors: any) => {
    console.error("Form validation failed:", errors);
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
