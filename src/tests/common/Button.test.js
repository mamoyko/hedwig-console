import renderWithProviders from "../../utils/test-utils";
import Button from "../../components/common/Button";

describe("Button component", () => {
  it("should render Button component correctly", () => {
    const { getByText } = renderWithProviders(<Button>Submit</Button>);

    expect(getByText(/Submit/i)).toBeInTheDocument();
  });
});