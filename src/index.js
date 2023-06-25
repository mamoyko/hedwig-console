import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Chart, ArcElement } from "chart.js";

import reportWebVitals from "./reportWebVitals";
import { store } from "./slices/store";
import { theme } from "./styles/theme";
import { axiosInterceptor } from "./axios";
import routes from "./components/routes";

import "../src/styles/index.css";
import "../src/styles/CustomForms.css";

const container = document.getElementById("root");
const root = createRoot(container);

axiosInterceptor();

Chart.register(ArcElement);

root.render(
  <React.Fragment>
    <Provider store={store()}>
      <ChakraProvider theme={theme}>
        <Container h="100vh" maxWidth="100%" p="0">
          <RouterProvider router={routes} />
        </Container>
      </ChakraProvider>
    </Provider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
