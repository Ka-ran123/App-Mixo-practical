import chalk from "chalk";
// Success message
export const success = (message) => {
    console.log(chalk.green.bold(`✅ ${message}`));
};
// Error message
export const error = (message) => {
    console.log(chalk.red.bold(`❌ ${message}`));
};
export const errorLog = (message) => {
    console.log(chalk.red(`❌ ${message}`));
};
// Warning message
export const warning = (message) => {
    console.log(chalk.yellow.bold(`⚠️ ${message}`));
};
// Info message
export const info = (message) => {
    console.log(chalk.blue.bold(`ℹ️ ${message}`));
};
