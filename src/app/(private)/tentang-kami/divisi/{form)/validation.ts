import { stringField } from "@/utils/validationFormat";
import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const schema = z.object({
  name: stringField,
  description: stringField,
  picture_url: z
    .any()
    .refine(
      (value) => !value || value instanceof File || typeof value === "string",
      "Invalid input type"
    )
    .refine(
      (file) => !file || !(file instanceof File) || file.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (file) =>
        !file ||
        !(file instanceof File) ||
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .nullable(),
});

export type Schema = z.infer<typeof schema>;
