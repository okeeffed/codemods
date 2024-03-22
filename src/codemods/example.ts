import { Project, SyntaxKind } from "ts-morph";

export const handler = () => {
  // Initialize a new Project
  const project = new Project();

  // Add the source file you want to transform
  const sourceFile = project.createSourceFile(
    "example.js",
    `
function mockExample() {
  return {
     a: true
  }
}
`
  );

  // Find all function declarations in the file
  sourceFile.getFunctions().forEach((func) => {
    // Get the name of the function
    const functionName = func.getName();

    if (!functionName) return;

    // We need to extract the return statement's content
    // Assuming the function body is simple and contains a single return statement
    const returnStatement = func
      .getBody()
      // @ts-ignore
      ?.getStatements()
      .find((s: any) => s.getKind() === SyntaxKind.ReturnStatement);

    // Extracting the text to return directly
    let returnText = returnStatement?.getChildAtIndex(1)?.getText() || "{}"; // Default to '{}' in case of no return

    // Create the new arrow function expression
    const arrowFunction = `const ${functionName} = () => (${returnText});`;

    // Replace the old function declaration with the new arrow function
    func.replaceWithText(arrowFunction);
  });

  // Save the changes to the file
  return sourceFile.getText();
};
