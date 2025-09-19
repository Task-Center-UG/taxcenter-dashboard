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
