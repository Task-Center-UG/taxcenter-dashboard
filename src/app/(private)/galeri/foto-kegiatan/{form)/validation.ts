import { imageValueSchema, stringField } from "@/utils/validationFormat";
import z from "zod";

export const schema = z.object({
  title: stringField,
  description: stringField,
  picture_url: imageValueSchema,
});

export type Schema = z.infer<typeof schema>;
