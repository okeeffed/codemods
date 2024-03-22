import { handler } from "./example";

describe("hello template file", () => {
  test("expect helloTemplate fn output to match snapshot", () => {
    const str = handler();

    expect(str).toMatchSnapshot();
  });
});
