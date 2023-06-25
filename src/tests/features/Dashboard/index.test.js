import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import renderWithProviders, { fireEvent } from "../../../utils/test-utils";
import Dashboard from "../../../components/features/Dashboard";

const customConfig = {
  customRoutes: createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activity/my-activities" element={<div>Test Activity Page</div>} />
      </Route>
    )),
  preloadedState: {
    user: {
      details: { firstname: "Juan" }
    },
    blast: {
      activityList: {
        list: [{
          blast_id: "test-1234",
          sender_mask_name: "Maya",
          blast_name: "blast name",
          status: "completed",
          createdAt: "2023-03-07T10:06:21.000Z"
        }],
        total_count: 1
      }
    }
  }
};

describe("Dashboard component", () => {
  it("should render Dashboard component correctly", () => {
    const { getByText } = renderWithProviders(<Dashboard />, customConfig);

    expect(getByText(/Welcome back, Juan/i)).toBeInTheDocument();
    expect(getByText(/Latest Activity/i)).toBeInTheDocument();
    expect(getByText(/blast name/i)).toBeInTheDocument();
  });

  it("should navigate to Activity page on button click", () => {
    const { getByText, getByTestId } = renderWithProviders(<Dashboard />, customConfig);

    fireEvent.click(getByTestId("view-all-activities-btn"));

    expect(getByText(/Test Activity Page/i)).toBeInTheDocument();
  });
});