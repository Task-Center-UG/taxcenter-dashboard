import HeaderTitle from "@/components/card/HeaderTitle";
import ReusableInput from "@/components/input/ReusableInput";
import ReusableSelect from "@/components/input/ReusableSelect";
import { Paper } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

const categoryOptions = [
  { value: "CORETAX", label: "Coretax" },
  { value: "NPWP_CREATION", label: "NPWP Creation" },
  { value: "SPT_FILLING", label: "SPT Filling" },
  { value: "E_BILLING_CREATION", label: "E-Billing Creation" },
];

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
        <HeaderTitle>Tax Clinic Form</HeaderTitle>
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <ReusableInput
            name="title"
            label="Title"
            control={control}
            errors={errors}
            placeholder="Input title"
            isRequired
          />
          <ReusableSelect
            name="category"
            label="Category"
            control={control}
            errors={errors}
            options={categoryOptions}
            isRequired
          />
          <ReusableInput
            name="video_url"
            label="Video URL"
            control={control}
            errors={errors}
            placeholder="https://youtube.com/..."
          />
        </div>
      </Paper>
    </div>
  );
};

export default Form;
