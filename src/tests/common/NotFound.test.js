import renderWithProviders from "../../utils/test-utils";
import NotFound from "../../components/common/NotFound";

describe("NotFound component", () => {
  it("should render Page Not Found component correctly", () => {
    const { getByText } = renderWithProviders(<NotFound />);

    expect(getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});