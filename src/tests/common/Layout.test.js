import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import renderWithProviders from "../../utils/test-utils";
import Layout from "../../components/common/Layout";

const customConfig = {
  customRoutes: createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<div>Test Login Page</div>} />
        <Route path="/dashboard" element={<div>Test Dashboard Page</div>} />
      </Route>
    )),
  preloadedState: {
    user: {
      details: {
        role: 1
      }
    },
    config: {
      HEDWIG_TOKEN: "HEDWIG_CONSOLE_TOKEN"
    }
  }
};

describe("Layout component", () => {
  it("should redirect to Login page if session is empty", () => {
    const { getByText } = renderWithProviders(<Layout />, customConfig);

    expect(getByText(/Test Login Page/i)).toBeInTheDocument();
  });
});