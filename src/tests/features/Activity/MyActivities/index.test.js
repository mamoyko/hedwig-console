import renderWithProviders, { fireEvent } from "../../../../utils/test-utils";
import MyActivities from "../../../../components/features/Activity/MyActivities";

const customConfig = {
  preloadedState: {
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

describe("MyActivities component", () => {
  it("should render MyActivities component correctly", () => {
    const { getAllByText } = renderWithProviders(<MyActivities />);

    expect(getAllByText(/My Activities/i)[0]).toBeInTheDocument();
  });

  it("should render activity list table correctly", () => {
    const { getAllByText } = renderWithProviders(<MyActivities />, customConfig);

    expect(getAllByText(/blast name/i)[0]).toBeInTheDocument();
    expect(getAllByText(/test-1234/i)[0]).toBeInTheDocument();
    expect(getAllByText(/Completed/i)[0]).toBeInTheDocument();
    expect(getAllByText(/Maya/i)[0]).toBeInTheDocument();
  });

  it("should open activity details drawer", () => {
    const { getByText } = renderWithProviders(<MyActivities />, customConfig);

    fireEvent.click(getByText("blast name"));
  });
});