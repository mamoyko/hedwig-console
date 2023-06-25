import renderWithProviders from "../../utils/test-utils";
import Table from "../../components/common/Table";

describe("Table component", () => {
  it("should render Table component correctly", () => {
    const testHeaders = [{ key: "table-column", displayText: "Table Column" }];
    const testData = [{ "table-column": "sample data" }];

    const { getByText } = renderWithProviders(<Table headers={testHeaders} data={testData} />);

    expect(getByText(/Table Column/i)).toBeInTheDocument();
    expect(getByText(/sample data/i)).toBeInTheDocument();
  });

  it("should display no records found", () => {
    const testHeaders = [{ key: "table-column", displayText: "Table Column" }];

    const { getByText } = renderWithProviders(<Table headers={testHeaders} data={[]} />);

    expect(getByText(/No Records Found/i)).toBeInTheDocument();
  });
});