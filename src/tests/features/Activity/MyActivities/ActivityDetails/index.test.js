import renderWithProviders from "../../../../../utils/test-utils";
import ActivityDetails from "../../../../../components/features/Activity/MyActivities/ActivityDetails";

const customConfig = {
  preloadedState: {
    blast: {
      blastDetails: {
        blast: {
          message: "",
        }
      }
    }
  }
};

const customConfig1 = {
  preloadedState: {
    blast: {
      blastDetails: {
        blast: {
          message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lorem eros, placerat nec nisl dictum, cursus rutrum lorem. 😀😀😀",
          recipient_type: "single",
          phone_number: "63111111111"
        }
      }
    }
  }
};

const customConfig2 = {
  preloadedState: {
    blast: {
      blastDetails: {
        blast: {
          message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lorem eros, placerat nec nisl dictum, cursus rutrum lorem. Duis lorem eros, placerat nec nisl dictum, cursus rutrum lorem.",
          recipient_type: "multiple",
        },
        file: {
          master_file: "mobile_numbers.csv",
          invalid_mdns_file: "invalid_numbers.csv"
        }
      }
    }
  }
};

describe("ActivityDetails component", () => {
  it("should render ActivityDetails component correctly for single recipient", () => {
    const { getByText } = renderWithProviders(<ActivityDetails
      isOpen={true}
    />, customConfig);

    expect(getByText(/Activity Details/i)).toBeInTheDocument();
  });

  it("should render ActivityDetails component correctly for single recipient", () => {
    const { getByText } = renderWithProviders(<ActivityDetails
      isOpen={true}
    />, customConfig1);

    expect(getByText(/Activity Details/i)).toBeInTheDocument();
    expect(getByText(/Recipient/i)).toBeInTheDocument();
    expect(getByText(/63111111111/i)).toBeInTheDocument();
  });

  it("should render ActivityDetails component correctly for multiple recipients", () => {
    const { getByText } = renderWithProviders(<ActivityDetails
      isOpen={true}
    />, customConfig2);

    expect(getByText(/mobile_numbers.csv/i)).toBeInTheDocument();
    expect(getByText(/invalid_numbers.csv/i)).toBeInTheDocument();
  });
});