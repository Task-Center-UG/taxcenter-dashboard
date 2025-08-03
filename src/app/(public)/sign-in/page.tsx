"use client";

import * as React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import ButtonCustom from "@/components/button/ButtonCustom";

export default function SignInPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        // minWidth: "100vh",
        backgroundColor: "grey.200",
      }}
    >
      <Paper
        sx={{
          p: { xs: 2, sm: 4 }, // Padding responsive
          borderRadius: 2,
          maxWidth: "450px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* LOGO */}
        <Box sx={{ mb: 2 }}>
          <img
            src="https://assets-global.website-files.com/6597ccac92169b5965419146/659b8e28448e3a2998f80689_logo.svg"
            alt="Utherside Logo"
            width="120"
          />
        </Box>

        <Box>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Sign in
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{ alignSelf: "flex-start" }}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <ButtonCustom label="Sign In" fullWidth={true} />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Link href="#" variant="body2">
            Forgot your password?
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
