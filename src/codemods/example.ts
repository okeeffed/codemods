import prettier from "prettier";
import { Project, SyntaxKind } from "ts-morph";

export const example = async (filePath: string, project: Project) => {
  // Add the source file you want to transform
  const sourceFile = project.addSourceFileAtPath(filePath);

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
  const text = sourceFile.getText();

  const prettierConfig = prettier.resolveConfigFile();

  // Format the result using Prettier
  const formatted = prettier.format(text, {
    ...prettierConfig,
    parser: "typescript",
  });

  return formatted;
};
