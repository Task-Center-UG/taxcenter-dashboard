import HeaderTitle from "@/components/card/HeaderTitle";
import ReusableInput from "@/components/input/ReusableInput";
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
        <HeaderTitle>Partner Form</HeaderTitle>
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <ReusableInput
            name="name"
            label="Name"
            control={control}
            errors={errors}
            placeholder="Input partner name"
            isRequired
          />
        </div>
      </Paper>
    </div>
  );
};

export default Form;
