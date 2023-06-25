import renderWithProviders, { fireEvent } from "../../utils/test-utils";
import Paginator from "../../components/common/Paginator";

describe("Paginator component", () => {
  it("should render Paginator component correctly", () => {
    const { getByText } = renderWithProviders(<Paginator
      totalCount={100}
      setPage={() => null}
      setLimit={() => null}
    />);

    expect(getByText(/100/i)).toBeInTheDocument();
  });

  it("should move to next page on next button click", () => {
    let currentPage = 1;

    const { getByTestId } = renderWithProviders(<Paginator
      totalCount={100}
      limit={10}
      page={currentPage}
      setPage={() => { currentPage = currentPage + 1; }}
      setLimit={() => null}
    />);

    fireEvent.click(getByTestId("paginator-nextpage-btn"));

    expect(currentPage).toBe(2);
  });

  it("should move to prev page on prev button click", () => {
    let currentPage = 3;

    const { getByTestId } = renderWithProviders(<Paginator
      totalCount={100}
      limit={10}
      page={currentPage}
      setPage={() => { currentPage = currentPage + 1; }}
      setLimit={() => null}
    />);

    fireEvent.click(getByTestId("paginator-prevpage-btn"));

    expect(currentPage).toBe(4);
  });
});