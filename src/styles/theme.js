import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    bg: {
      primary: "#1F155F",
      secondary: "#4829AA",
      gray: {
        100: "#F7F7F7",
        200: "#F2F4F6"
      },
      warning: "#FEF6F6",
      alert: "#F04747"
    },
    text: {
      black: "#000000",
      link: "#4829AA",
      gray: "#A8ADB0",
      lightgray: "#737576",
      darkgray: "#737A7D"
    },
    button: {
      primary: "#4829AA"
    },
    alert: {
      success: "#F6FEF6",
      error: "#FEF6F6",
      warning: "#FEF3DD"
    }
  },
});