import HeaderTitle from "@/components/card/HeaderTitle";
import ReusableInput from "@/components/input/ReusableInput";
import ReusableSelect from "@/components/input/ReusableSelect";
import { useResearchCategories } from "@/hooks/useResearchCategories";
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

  // GET RESEARCH CATEGORIES
  const { researchCategoryOptions, isLoading } = useResearchCategories();

  return (
    <div>
      <Paper>
        <HeaderTitle>Research Program Form</HeaderTitle>
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
            name="research_category_id"
            label="Research Category"
            control={control}
            errors={errors}
            options={researchCategoryOptions ?? []}
            isRequired
            disabled={isLoading}
          />
          <ReusableInput
            name="cta_url"
            label="CTA URL"
            control={control}
            errors={errors}
            placeholder="https://example.com"
          />
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <ReusableInput
              name="description"
              label="Description"
              control={control}
              errors={errors}
              placeholder="Input description"
              isRequired
              multiline
              rows={4}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Form;
