import "@testing-library/jest-dom/extend-expect";
import "jest-date-mock";

jest.mock("@reach/utils", () => ({
  ...jest.requireActual("@reach/utils"),
  checkStyles: jest.fn()
}));
