import renderWithProviders from "../../../../../utils/test-utils";
import SendOutRate from "../../../../../components/features/Activity/MyActivities/ActivityDetails/SendOutRate";

describe("SendOutRate component", () => {
  it("should render SendOutRate component correctly", () => {
    const { getAllByText } = renderWithProviders(<SendOutRate />);

    expect(getAllByText(/Delivered/i)[0]).toBeInTheDocument();
    expect(getAllByText(/Undelivered/i)[0]).toBeInTheDocument();
  });
});