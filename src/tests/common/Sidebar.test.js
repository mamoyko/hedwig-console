import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import renderWithProviders, { fireEvent } from "../../utils/test-utils";

import Sidebar from "../../components/common/Sidebar";

const customRoutes = {
  customRoutes: createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Sidebar />} />
        <Route path="/dashboard" element={<Sidebar isToggle={true} />} />
      </Route>
    ))
};

describe("Sidebar component", () => {
  it("should render Sidebar component correctly", () => {
    const { getByText } = renderWithProviders(<Sidebar />, customRoutes);

    expect(getByText(/HEDWIG/i)).toBeInTheDocument();
    expect(getByText(/Dashboard/i)).toBeInTheDocument();
    expect(getByText(/Blaster/i)).toBeInTheDocument();
  });

  it("should expand item with submenu items", () => {
    const { getByText } = renderWithProviders(<Sidebar />, customRoutes);

    fireEvent.click(getByText("Blaster"));

    expect(getByText(/SMS/i)).toBeInTheDocument();
  });

  it("should toggle Sidebar component on toggle button click and render item with popover", () => {
    const { getByText } = renderWithProviders(<Sidebar />, customRoutes);

    const dashboardLink = getByText(/Dashboard/i);
    const blasterLink = getByText(/Blaster/i);

    fireEvent.click(getByText("Dashboard"));

    expect(dashboardLink).not.toBeInTheDocument();
    expect(blasterLink).not.toBeInTheDocument();
  });
});