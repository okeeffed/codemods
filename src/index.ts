#!/usr/bin/env node

import { execSync } from "node:child_process";
import open from "open";
import ora from "ora";
import prompts, { Choice } from "prompts";
import chalk from "chalk";
import { readFile } from "node:fs/promises";
import Fuse from "fuse.js";

const onCancel = () => {
  console.log("Operation canceled.");
  process.exit(0);
};

const suggest = async (input: string, choices: Choice[]) => {
  const data = choices.map((choice) => choice.title);

  // Initialize Fuse.js with data and fuzzy matching options
  const fuse = new Fuse(data, {
    includeScore: true,
    threshold: 0.5, // Adjust the fuzzy matching threshold as needed
  });

  if (!input) {
    return choices;
  }

  const results = fuse.search(input);
  return results.map((result) => choices[result.refIndex]);
};

async function main() {
  try {
    const response = await prompts(
      {
        type: "autocomplete",
        name: "profile",
        message: "Enter the AWS profile name",
        suggest,
        choices: getProfileFromConfigFileResponse.profileNames.map((name) => ({
          title: name,
          value: name,
        })),
      },
      {
        onCancel,
      }
    );
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

main();
