import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function AuthPage({ register = false }) {
  const { user, login, register: signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  if (user)
    return (
      <Navigate
        to={user.role === "employer" ? "/employer" : "/employee"}
        replace
      />
    );
  const change = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    setError("");
    if (!form.email || !form.password || (register && !form.name)) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      const signedInUser = register
        ? signUp(form.name, form.email, form.role)
        : login(form.email, form.role);
      navigate(
        signedInUser.role === "employer" ? "/employer" : "/employee",
        { replace: true },
      );
    } catch (submissionError) {
      setError(submissionError.message);
    }
  };
  return (
    <Container maxWidth="sm" className="auth-page">
      <Paper className="auth-card" elevation={0}>
        <div className="auth-mark">t</div>
        <Typography className="eyebrow" align="center">
          {register ? "WELCOME TO TEAMHUB" : "WELCOME BACK"}
        </Typography>
        <Typography variant="h3" align="center">
          {register ? "Make space for good work." : "Good to see you again."}
        </Typography>
        <Typography align="center" color="text.secondary" sx={{ mb: 3 }}>
          {register
            ? "Create an account to bring your team together."
            : "Sign in to pick up where your team left off."}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={submit}>
          <Stack spacing={2}>
            {register && (
              <TextField
                label="Your name"
                value={form.name}
                onChange={change("name")}
                required
                fullWidth
              />
            )}
            <TextField
              label="Email address"
              type="email"
              value={form.email}
              onChange={change("email")}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={form.password}
              onChange={change("password")}
              required
              fullWidth
            />
            <TextField
              select
              label={register ? "I’m joining as a" : "Choose a demo role"}
              value={form.role}
              onChange={change("role")}
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="employer">Employer</MenuItem>
            </TextField>
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              {register ? "Create account" : "Sign in"}
            </Button>
          </Stack>
        </Box>
        {!register && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 2, textAlign: "center" }}
          >
            For this demo, enter any email and password. Choose a role to
            preview its dashboard.
          </Typography>
        )}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          {register ? "Already have an account? " : "New to TeamHub? "}
          <Link to={register ? "/login" : "/register"} className="text-link">
            {register ? "Log in" : "Create an account"}
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
