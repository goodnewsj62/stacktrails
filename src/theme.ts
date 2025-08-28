"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  cssVariables: {
    nativeColor: true,
  },
});

export default theme;
