"use client";

import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
} from "@mui/material";
import ButtonCustom from "@/components/button/ButtonCustom";
import theme from "@/style/theme";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReusableInput from "@/components/input/ReusableInput";

const UserSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type UserFormData = z.infer<typeof UserSchema>;

export default function SignInPage() {
  // USE FORM
  const methods = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  // HANDLE SUBMIT
  const onSubmit = async (data: UserFormData) => {
    console.log(data);
  };
  const onError = (errors: any) => {
    console.error("VALIDATION FAILED:", errors);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: theme.palette.action.hover,
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit, onError)}
            noValidate
          >
            <Box
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                minWidth: "480px",
                backgroundColor: "background.paper",
              }}
            >
              <img
                src="https://assets-global.website-files.com/6597ccac92169b5965419146/659b8e28448e3a2998f80689_logo.svg"
                alt="Utherside Logo"
                width="120"
              />

              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold", mt: 1, mb: 2 }}
              >
                Sign in
              </Typography>

              {/* NEW: A single container for all form fields with consistent spacing */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <ReusableInput
                  name="username"
                  label="Username / Email"
                  control={control}
                  errors={errors}
                />
                <ReusableInput
                  name="password"
                  label="Password"
                  control={control}
                  errors={errors}
                  type="password"
                />
                <ButtonCustom label="Sign In" fullWidth={true} type="submit" />
              </Box>

              <Link href="#" variant="body2">
                Forgot your password?
              </Link>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
