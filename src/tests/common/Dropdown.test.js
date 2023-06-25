import renderWithProviders, { fireEvent } from "../../utils/test-utils";
import Dropdown from "../../components/common/Dropdown";

const DropdownComponent = () => (
  <Dropdown
    defaultValue={1}
    options={[
      { text: "Item 1", value: 1 },
      { text: "Item 2", value: 2 }
    ]}
    setValue={() => null}
  />
);

describe("Dropdown component", () => {
  it("should render Dropdown component correctly", () => {
    const { getByText } = renderWithProviders(<DropdownComponent />);

    expect(getByText(/Item 1/i)).toBeInTheDocument();
  });

  it("should expand items in dropwdown", () => {
    const { getByText } = renderWithProviders(<DropdownComponent />);

    fireEvent.click(getByText("Item 1"));

    expect(getByText(/Item 2/i)).toBeInTheDocument();
  });

  it("should change value on item click", () => {
    const { getByText } = renderWithProviders(<DropdownComponent />);

    fireEvent.click(getByText("Item 1"));
    fireEvent.click(getByText("Item 2"));

    expect(getByText("Item 2")).toBeInTheDocument();
  });
});