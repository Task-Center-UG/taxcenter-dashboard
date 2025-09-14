import { z } from "zod";

// --- STRING ---
// Handles undefined state and empty string state separately for better UX.
export const stringField = z
  .string({
    message: "This field is required",
  })
  .min(1, "This field cannot be empty");

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
export const numberField = z.coerce
  .number({
    message: "This field is required",
  })
  .min(1, "Value must be at least 1");

export const numberNullable = z.coerce.number().nullable().optional();

// --- DATE ---
// Handles missing dates and invalid date formats.
export const dateField = z.date({
  message: "Please select a date",
});

export const dateNullable = z.date().nullable().optional();

// --- BOOLEAN ---
export const booleanNullable = z.boolean().nullable().optional();
