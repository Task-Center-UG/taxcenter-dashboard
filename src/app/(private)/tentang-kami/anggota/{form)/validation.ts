import { numberField, stringField } from "@/utils/validationFormat";
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
  division_id: z.number().min(1, "Required"),
  major_id: z.number().min(1, "Required"),
  picture_url: z.union(
    [
      z
        .instanceof(File)
        .refine((file) => file.size > 0, "File cannot be empty.")
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),

      z.string().min(1, "Required"),
    ],
    {
      message: "An image is required.",
    }
  ),
});

export type Schema = z.infer<typeof schema>;
