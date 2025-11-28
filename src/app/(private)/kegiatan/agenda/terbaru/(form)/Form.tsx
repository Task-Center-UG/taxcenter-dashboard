import HeaderTitle from "@/components/card/HeaderTitle";
import ReusableInput from "@/components/input/ReusableInput";
import { ReusableUpload } from "@/components/input/ReusableUpload";
import { Paper } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

const Form = () => {
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <div>
      <Paper>
        <HeaderTitle>News Form</HeaderTitle>
        <div className="p-8 grid grid-cols-1 gap-8">
          <ReusableInput
            name="title"
            label="Title"
            control={control}
            errors={errors}
            placeholder="Input title"
            isRequired
          />
          <ReusableInput
            name="description"
            label="Description"
            control={control}
            errors={errors}
            placeholder="Input description"
            multiline
            rows={4}
            isRequired
          />
          <ReusableUpload name="picture" label="Picture" control={control} />
        </div>
      </Paper>
    </div>
  );
};

export default Form;
