import reportWebVitals from "../reportWebVitals.js";

describe("Application root", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("../index.js");
  });

  it("should pass reportWebVitals", () => {
    reportWebVitals(() => null);
  });
});