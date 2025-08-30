import HeaderTitle from "@/components/card/HeaderTitle";
import ReusableInput from "@/components/input/ReusableInput";
import ReusableSelect from "@/components/input/ReusableSelect";
import ReusableUploadZone from "@/components/input/ReusableUploadZone";
import { dummyOption } from "@/store/DummyData";
import { Paper } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

const Form = () => {
  // USE FORM
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <div>
      <Paper>
        <HeaderTitle>Create Form</HeaderTitle>
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <ReusableInput
            name=""
            label="Name"
            control={control}
            errors={errors}
            placeholder="Input"
            isRequired
          />
          <ReusableInput
            name=""
            label="Contact Number"
            control={control}
            errors={errors}
            placeholder="Input"
            isRequired
          />
          <ReusableInput
            name=""
            label="Email"
            control={control}
            errors={errors}
            placeholder="Input"
            isRequired
          />
          <ReusableSelect
            name=""
            label="Division"
            control={control}
            errors={errors}
            options={dummyOption}
            placeholder="Select Division"
            isRequired
          />
        </div>
      </Paper>
    </div>
  );
};

export default Form;
