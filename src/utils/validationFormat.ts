import { z } from "zod";

// --- STRING ---
// Handles undefined state and empty string state separately for better UX.
export const stringField = z
  .string({
    message: "Required",
  })
  .min(1, "Required");

export const stringNullable = z.string().nullable().optional();

// --- EMAIL ---
export const mailField = z
  .string({
    message: "Email is required",
  })
  .min(1, "Email cannot be empty")
  .email("You must enter a valid email");

// --- NUMBER ---
// Coercion is great for form inputs!
export const numberField = z.coerce.number().min(1, "Required");

export const numberNullable = z.coerce.number().nullable().optional();

// --- DATE ---
// Handles missing dates and invalid date formats.
export const dateField = z.date({
  message: "Please select a date",
});

export const dateNullable = z.date().nullable().optional();

// --- BOOLEAN ---
export const booleanNullable = z.boolean().nullable().optional();

// --- FILE IMAGE ---
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export const fileSchema = z
  .instanceof(File, { message: "Please upload a file." })
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

export const imageValueSchema = z.union([
  fileSchema,
  z.string().min(1, "Image URL cannot be empty."),
]);

export const documentFileSchema = z
  .instanceof(File, { message: "Please upload a document." })
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
  .refine(
    (file) => ACCEPTED_DOCUMENT_TYPES.includes(file.type),
    "Only .pdf, .doc, .docx, and .txt formats are supported."
  );

export const documentValueSchema = z.union([
  documentFileSchema,
  z.string().min(1, "File URL cannot be empty."),
]);
