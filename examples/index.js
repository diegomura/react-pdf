import fs from 'fs';
import path from 'path';
import MockDate from 'mockdate';
import chalk from 'chalk';

// For git purposes.
// Prevent commiting PDF example everytime the script is excecuted.
MockDate.set(1434319925275);

const getDirectories = (srcpath = __dirname) =>
  fs
    .readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
    .filter(folder => folder !== 'node_modules');

const fileExists = (file, srcpath = __dirname) =>
  fs.existsSync(path.join(__dirname, file));

const runExample = name => {
  try {
    require(`./${name}/index`);
  } catch (e) {
    console.error(e);
  }
};

const testName = process.argv[2];

if (testName === 'all') {
  console.log(chalk.green('Running all the examples suite'));
  getDirectories().forEach(dir => {
    if (fileExists(`${dir}/index.js`)) {
      runExample(dir);
    }
  });
} else {
  console.log(chalk.green(`Running the ${testName} example`));
  runExample(testName);
}
