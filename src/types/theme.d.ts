import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accentColor: Palette["primary"];
    base: Palette["primary"];
  }

  interface PaletteOptions {
    accentColor?: PaletteOptions["primary"];
    base?: PaletteOptions["primary"];
  }
}
