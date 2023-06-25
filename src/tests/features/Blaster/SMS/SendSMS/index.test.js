import { act } from "react-dom/test-utils";
import renderWithProviders, { fireEvent, waitFor } from "../../../../../utils/test-utils";
import SendSMS from "../../../../../components/features/Blaster/SMS/SendSMS";

const customConfig = {
  preloadedState: {
    blast: {
      senderMasks: [
        { id: 1, name: "MayaTest" }
      ]
    }
  }
};

describe("SendSMS component", () => {
  it("should render Send SMS step 1 component correctly", () => {
    const { getByText } = renderWithProviders(<SendSMS />);

    expect(getByText(/Send an SMS Blast/i)).toBeInTheDocument();
  });

  it("should cancel send sms blast on cancel button click", () => {
    const { getByText, getByTestId } = renderWithProviders(<SendSMS />);

    fireEvent.click(getByTestId("sendSMS-cancel-btn"));

    expect(getByText(/Send an SMS Blast/i)).toBeInTheDocument();
  });

  it("should display file upload component for multiple recipients", async () => {
    const { getAllByRole, getByText } = renderWithProviders(<SendSMS />, customConfig);

    await act(() => {
      const recipientType = getAllByRole("radio")[1];
      fireEvent.click(recipientType);
    });

    await waitFor(() => expect(getByText(/No File Selected/i)).toBeInTheDocument());
  });

  it("should validatate send sms form values", async () => {
    const { getByTestId, getByPlaceholderText, getAllByRole, getByText } = renderWithProviders(<SendSMS />, customConfig);

    await act(() => {
      const recipientType = getAllByRole("radio")[0];
      fireEvent.click(recipientType);

      const blastName = getByPlaceholderText("What’s the name of the SMS Blast?");
      const blastMessage = getByPlaceholderText("Message");
      const phoneNumber = getByPlaceholderText("Mobile Number");

      fireEvent.input(blastName, { target: { value: "blast name" } });
      fireEvent.input(blastMessage, { target: { value: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a😀" } });
      fireEvent.input(phoneNumber, { target: { value: "6391" } });

      fireEvent.click(getByTestId("sendSMS-next-btn"));
    });
    
    await waitFor(() => expect(getByText("Invalid phone number format (ex. 639XXXXXXXXX)")).toBeInTheDocument());
    await waitFor(() => expect(getByText(/Max character count exceeded/i)).toBeInTheDocument());
  });

  it("should proceed to step 2 review sms blast", async () => {
    const { getByTestId, getByPlaceholderText, getAllByRole, getByText } = renderWithProviders(<SendSMS />, customConfig);

    await act(() => {
      const recipientType = getAllByRole("radio")[0];
      fireEvent.click(recipientType);

      const blastName = getByPlaceholderText("What’s the name of the SMS Blast?");
      const blastMessage = getByPlaceholderText("Message");
      const phoneNumber = getByPlaceholderText("Mobile Number");

      fireEvent.input(blastName, { target: { value: "blast name" } });
      fireEvent.input(blastMessage, { target: { value: "blast message 😀" } });
      fireEvent.input(phoneNumber, { target: { value: "639123456789" } });

      fireEvent.click(getByTestId("sendSMS-next-btn"));
    });

    await waitFor(() => expect(getByText(/Review SMS Blast/i)).toBeInTheDocument());

    await act(() => {
      fireEvent.click(getByTestId("sendSMS-previous-btn"));
    });

    await waitFor(() => expect(getByText(/Send an SMS Blast/i)).toBeInTheDocument());
  });
});