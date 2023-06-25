import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import renderWithProviders, { fireEvent } from "../../../../utils/test-utils";
import SMS from "../../../../components/features/Blaster/SMS";

const customRoutes = {
  customRoutes: createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<SMS />} />
        <Route path="/send" element={<div>Send sms blast page</div>} />
      </Route>
    ))
};

describe("SMS component", () => {
  it("should render SMS component correctly", () => {
    const { getAllByText } = renderWithProviders(<SMS />);

    expect(getAllByText(/SMS/i)[0]).toBeInTheDocument();
  });

  it("should display success prompt", () => {
    const { getByText } = renderWithProviders(<SMS />, {
      preloadedState: {
        blast: {
          blastPromptType: "success"
        }
      }
    });

    expect(getByText(/SMS Sent! Please monitor the status to check if the SMS Blast has completed./i)).toBeInTheDocument();
  });

  it("should display error prompt", () => {
    const { getByText } = renderWithProviders(<SMS />, {
      preloadedState: {
        blast: {
          blastPromptType: "error"
        }
      }
    });

    expect(getByText(/SMS blast not sent. Try sending a blast again./i)).toBeInTheDocument();
  });

  it("should close error/success prompt", () => {
    const { getByText, getByTestId } = renderWithProviders(<SMS />, {
      preloadedState: {
        blast: {
          blastPromptType: "error"
        }
      }
    });

    const alertBox = getByText(/SMS blast not sent. Try sending a blast again./i);

    fireEvent.click(getByTestId("alertbox-close-button"));

    expect(alertBox).not.toBeInTheDocument();
  });

  it("should redirect to send sms blast page", () => {
    const { getByText } = renderWithProviders(<SMS />, customRoutes);

    fireEvent.click(getByText("Send an SMS Blast"));

    expect(getByText(/Send sms blast page/i)).toBeInTheDocument();
  });
});