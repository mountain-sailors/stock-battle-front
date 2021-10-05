import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      primary: string,
      secondary: string,
      red: string,
      blue: string,
      black: string,
      white: string,
      gray: {
        100: string,
        200: string,
        300: string,
        400: string,
        500: string,
        600: string,
        700: string,
      }
    },
    fontSize: {
      xxl: string,
      xl: string,
      lg: string,
      md: string,
      sm: string,
      xs: string,
    },
  }
}
