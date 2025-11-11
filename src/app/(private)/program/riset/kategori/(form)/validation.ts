import { stringField } from "@/utils/validationFormat";
import z from "zod";

export const schema = z.object({
  title: stringField,
});

export type Schema = z.infer<typeof schema>;
