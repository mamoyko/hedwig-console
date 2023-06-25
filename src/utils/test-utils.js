import React from "react";
import { render } from "@testing-library/react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { store as setupStore } from "../slices/store";
import { theme } from "../styles/theme";

const renderWithProviders = (
  ui,
  {
    customRoutes,
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    const routes = createBrowserRouter(
      createRoutesFromElements(
        <Route>
          <Route path="/" element={children} />
        </Route>
      ));

    return (
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <RouterProvider router={customRoutes || routes} />
        </ChakraProvider>
      </Provider>
    );
  };
  
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export * from "@testing-library/react";
export default renderWithProviders;