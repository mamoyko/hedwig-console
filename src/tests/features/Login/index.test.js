import { act } from "react-dom/test-utils";
import renderWithProviders, { fireEvent } from "../../../utils/test-utils";
import Login from "../../../components/features/Login";

const customConfig = {
  preloadedState: {
    auth: {
      error: { message: "login error" }
    }
  }
};

describe("Login component", () => {
  it("should render Login component correctly", () => {
    const { getByText } = renderWithProviders(<Login />);

    expect(getByText(/Maya Communications Console/i)).toBeInTheDocument();
  });

  it("should display error alert box", () => {
    const { getByText, getByTestId } = renderWithProviders(<Login />, customConfig);

    const alertBox = getByText(/Invalid log in. Please reach out to system administrator./i);
    expect(alertBox).toBeInTheDocument();

    fireEvent.click(getByTestId("error-alertbox-close-btn"));
    expect(alertBox).not.toBeInTheDocument();
  });

  it("should submit login form values", async () => {
    const { getByPlaceholderText, getByRole } = renderWithProviders(<Login />);

    await act(() => {
      const email = getByPlaceholderText("Email Address");
      const password = getByPlaceholderText("Password");

      fireEvent.input(email, { target: { value: "test@test.com" } });
      fireEvent.input(password, { target: { value: "password" } });

      fireEvent.click(getByRole("button"));
    });
  });

  it("should show password values on view icon click", async () => {
    const { getByPlaceholderText, getByTestId, getByDisplayValue } = renderWithProviders(<Login />);
    const password = getByPlaceholderText("Password");
    fireEvent.input(password, { target: { value: "password123" } });

    fireEvent.click(getByTestId("show-password-btn"));
    expect(getByDisplayValue("password123")).toBeInTheDocument();
  });
});