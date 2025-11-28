import HeaderTitle from "@/components/card/HeaderTitle";
import ImagePreview from "@/components/image/ImagePreview";
import ReusableInput from "@/components/input/ReusableInput";
import ReusableUploadZone from "@/components/input/ReusableUploadZone";
import { Gallery } from "@/store/Gallery";
import { Paper } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  data?: Gallery;
}

const Form = (props: Props) => {
  const { data } = props;

  // USE FORM
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <div>
      <Paper>
        <HeaderTitle>{data ? "Edit Form" : "Create Form"}</HeaderTitle>
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <ReusableInput
            name="title"
            label="Title"
            control={control}
            errors={errors}
            placeholder="Input"
            isRequired
          />
          <ReusableInput
            name="description"
            label="Description"
            control={control}
            errors={errors}
            placeholder="Input"
            isRequired
          />
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col gap-4">
            <ReusableUploadZone name="picture_url" control={control} />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Form;
