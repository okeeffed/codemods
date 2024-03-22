import { Project } from "ts-morph";
import { example } from "./example";

const EXAMPLE_TS = `function mockExample() {
	return {
			a: true,
	};
}`;

describe("example codemod", () => {
  test("expect snapshot to match", async () => {
    // Initialize a new Project
    const project = new Project({
      useInMemoryFileSystem: true,
    });

    // Add a file directly in the in-memory file system
    const filePath = "/mock/example.ts";

    project.createSourceFile(filePath, EXAMPLE_TS, { overwrite: true });
    const result = await example(filePath, project);

    expect(result).toMatchSnapshot();
  });
});
