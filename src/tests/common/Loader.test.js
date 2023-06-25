import renderWithProviders from "../../utils/test-utils";
import Loader from "../../components/common/Loader";

describe("Table component", () => {
  it("should render Loader component correctly", () => {
    renderWithProviders(<Loader />);
  });
});