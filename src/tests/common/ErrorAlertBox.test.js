import renderWithProviders from "../../utils/test-utils";
import ErrorAlertBox from "../../components/common/ErrorAlertBox";

describe("ErrorAlertBox component", () => {
  it("should render ErrorAlertBox component correctly", () => {
    const { getByText } = renderWithProviders(<ErrorAlertBox title="ErrorAlertBox title"/>);

    expect(getByText(/ErrorAlertBox title/i)).toBeInTheDocument();
  });
});