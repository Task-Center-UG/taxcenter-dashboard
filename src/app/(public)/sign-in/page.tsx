"use client";

import * as React from "react";
import { Box, Typography, Link } from "@mui/material";
import ButtonCustom from "@/components/button/ButtonCustom";
import theme from "@/style/theme";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReusableInput from "@/components/input/ReusableInput";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UserSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type UserFormData = z.infer<typeof UserSchema>;

export default function SignInPage() {
  const router = useRouter();

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
    console.log("Form Data:", data);
    const fakeJwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    Cookies.set("jwt_access_token", fakeJwtToken, {
      expires: 1,
      path: "/",
    });
    router.push("/dashboard");
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
          <Box>
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
              {/* <img
                src="https://assets-global.website-files.com/6597ccac92169b5965419146/659b8e28448e3a2998f80689_logo.svg"
                alt="Utherside Logo"
                width="120"
              /> */}

              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold", mt: 1, mb: 2 }}
              >
                Sign in
              </Typography>
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
