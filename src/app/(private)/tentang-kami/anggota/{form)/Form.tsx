import HeaderTitle from "@/components/card/HeaderTitle";
import ReusableInput from "@/components/input/ReusableInput";
import ReusableSelect from "@/components/input/ReusableSelect";
import { ReusableUpload } from "@/components/input/ReusableUpload";
import Loader from "@/components/loading/Loader";
import { useDivisions } from "@/hooks/useDivisions";
import { useMajors } from "@/hooks/useMajors";
import { dummyOption } from "@/store/DummyData";
import { Paper } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

const Form = () => {
  const { divisions, paging, isLoading: loadingDivisions } = useDivisions();
  const { majorOptions, isLoading: loadingMajors } = useMajors();
  const isLoading = loadingDivisions || loadingMajors;

  // USE FORM
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
  } = methods;

  const divisionOptions = React.useMemo(() => {
    return (
      divisions?.map((division) => ({
        value: division.id,
        label: division.name,
      })) || []
    );
  }, [divisions]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Paper>
        <HeaderTitle>Create Form</HeaderTitle>
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <ReusableInput
            name="name"
            label="Name"
            control={control}
            errors={errors}
            placeholder="Input"
            isRequired
          />
          <ReusableSelect
            name="major_id"
            label="Jurusan"
            control={control}
            errors={errors}
            options={majorOptions ?? []}
            placeholder="Select Division"
            isRequired
          />
          <ReusableSelect
            name="division_id"
            label="Divisi"
            control={control}
            errors={errors}
            options={divisionOptions}
            placeholder="Select Division"
            isRequired
          />
          <ReusableUpload name="picture_url" control={control} />
        </div>
      </Paper>
    </div>
  );
};

export default Form;
