import { documentValueSchema, stringField } from "@/utils/validationFormat";
import z from "zod";

export const schema = z.object({
  title: stringField,
  category: stringField,
  description: stringField,
  file_url: documentValueSchema,
});

export type Schema = z.infer<typeof schema>;
