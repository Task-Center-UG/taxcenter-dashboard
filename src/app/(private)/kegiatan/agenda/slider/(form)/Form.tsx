import HeaderTitle from "@/components/card/HeaderTitle";
import ReusableUploadZone from "@/components/input/ReusableUploadZone";
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
        <HeaderTitle>Agenda Slider Form</HeaderTitle>
        <div className="p-8 grid grid-cols-1 gap-8">
          <ReusableUploadZone name="image_url" control={control} />
        </div>
      </Paper>
    </div>
  );
};

export default Form;
