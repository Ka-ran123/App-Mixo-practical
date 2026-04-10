import chalk from "chalk";

// Success message
export const success = (message: string) => {
  console.log(chalk.green.bold(`✅ ${message}`));
};

// Error message
export const error = (message: string) => {
  console.log(chalk.red.bold(`❌ ${message}`));
};

export const errorLog = (message: string) => {
  console.log(chalk.red(`❌ ${message}`));
};

// Warning message
export const warning = (message: string) => {
  console.log(chalk.yellow.bold(`⚠️ ${message}`));
};

// Info message
export const info = (message: string) => {
  console.log(chalk.blue.bold(`ℹ️ ${message}`));
};
