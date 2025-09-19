"use client";

import * as React from "react";
import { Box, Typography, Link } from "@mui/material";
import ButtonCustom from "@/components/button/ButtonCustom";
import theme from "@/style/theme";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReusableInput from "@/components/input/ReusableInput";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const UserSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type UserFormData = z.infer<typeof UserSchema>;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const proxyUrl = "/api";

function SignInPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

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
    setApiError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${proxyUrl}/v1/auth/login`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data.status === "OK" && response.status === 200) {
        console.log("Login successful:", response.data);
        const nextUrl = searchParams.get("next");
        router.replace(nextUrl || "/dashboard");
        router.refresh();
      } else {
        setApiError(response.data.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Login API failed:", error);
      if (axios.isAxiosError(error) && error.response) {
        setApiError(
          error.response.data.message || "Invalid username or password."
        );
      } else {
        setApiError("A network error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
                {apiError && (
                  <Typography color="error" variant="body2" textAlign="center">
                    {apiError}
                  </Typography>
                )}
                <ButtonCustom
                  label="Sign In"
                  isLoading={loading}
                  fullWidth={true}
                  type="submit"
                />
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

export default function SignInPage() {
  return (
    <React.Suspense fallback={null}>
      <SignInPageContent />
    </React.Suspense>
  );
}
