import { stringField } from "@/utils/validationFormat";
import z from "zod";

export const schema = z.object({
  title: stringField,
  description: stringField,
  research_category_id: z.number().min(1, "Research category is required"),
  cta_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type Schema = z.infer<typeof schema>;
