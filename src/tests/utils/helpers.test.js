import { formatBytes, containsDoubleByte } from "../../utils/helpers";

describe("Helpers", () => {
  it("should format bytes size", () => {
    const formattedValue = formatBytes(1000);
    expect(formattedValue).toBe("1000 B");

    const zeroByte = formatBytes(0);
    expect(zeroByte).toBe("0 B");
  });

  it("should validate string with unicode", () => {
    const emptyString = containsDoubleByte("");
    expect(emptyString).toBe(false);

    const unicode = containsDoubleByte("😀");
    expect(unicode).toBe(true);
  });
});