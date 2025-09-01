"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "var(--color-primary)",
    },
    secondary: {
      main: "var(--color-secondary)",
    },
    accentColor: {
      main: "var(--accent-color)",
    },
    base: {
      main: "var(--color-base)",
    },
  },
  typography: {
    fontFamily: "var(--font-lexend)",
  },
  components: {
    MuiIcon: {
      defaultProps: {
        baseClassName: "material-symbols-outlined",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
      },
      styleOverrides: {
        root: ({}) => ({
          height: "42px",
        }),
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            borderRadius: 8,
          },
        },
      ],
    },
  },
  cssVariables: {
    nativeColor: true,
  },
});

export default theme;
