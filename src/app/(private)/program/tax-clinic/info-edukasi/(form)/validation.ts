import { stringField } from "@/utils/validationFormat";
import z from "zod";

export const schema = z.object({
  title: stringField,
  category: z.enum([
    "CORETAX",
    "NPWP_CREATION",
    "SPT_FILLING",
    "E_BILLING_CREATION",
  ]),
  video_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type Schema = z.infer<typeof schema>;
