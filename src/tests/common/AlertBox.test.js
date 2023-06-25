import renderWithProviders from "../../utils/test-utils";
import AlertBox from "../../components/common/AlertBox";

describe("AlertBox component", () => {
  it("should render AlertBox component correctly", () => {
    const { getByText } = renderWithProviders(<AlertBox title="AlertBox Title" type="warning" />);

    expect(getByText(/AlertBox Title/i)).toBeInTheDocument();
  });
});