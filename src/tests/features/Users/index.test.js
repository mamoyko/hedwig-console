import renderWithProviders from "../../../utils/test-utils";
import Users from "../../../components/features/Users";

describe("Users component", () => {
  it("should render Users component correctly", () => {
    const { getByText } = renderWithProviders(<Users />);

    expect(getByText(/Welcome to hedwig console Users/i)).toBeInTheDocument();
  });
});