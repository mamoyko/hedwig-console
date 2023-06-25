import renderWithProviders, { fireEvent } from "../../../../utils/test-utils";
import AuditTrail from "../../../../components/features/Activity/AuditTrail";

const customConfig = {
  preloadedState: {
    auditTrail: {
      auditTrailList: {
        list: [{
          blast_id: "test-1234",
          sender_mask_name: "Maya",
          blast_name: "blast name",
          firstname: "Juan",
          lastname: "Dela Cruz",
          status: "completed",
          createdAt: "2023-03-07T10:06:21.000Z"
        }],
        total_count: 1
      }
    }
  }
};

describe("AuditTrail component", () => {
  it("should render AuditTrail component correctly", () => {
    const { getAllByText } = renderWithProviders(<AuditTrail />);

    expect(getAllByText(/Audit Trail/i)[0]).toBeInTheDocument();
  });

  it("should render audit trail list table correctly", () => {
    const { getAllByText } = renderWithProviders(<AuditTrail />, customConfig);

    expect(getAllByText(/blast name/i)[0]).toBeInTheDocument();
    expect(getAllByText(/Juan Dela Cruz/i)[0]).toBeInTheDocument();
    expect(getAllByText(/Completed/i)[0]).toBeInTheDocument();
    expect(getAllByText(/SMS Blast/i)[0]).toBeInTheDocument();
  });

  it("should open activity details drawer", () => {
    const { getByText } = renderWithProviders(<AuditTrail />, customConfig);

    fireEvent.click(getByText("blast name"));
  });
});