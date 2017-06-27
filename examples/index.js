import MockDate from 'mockdate';

// For git purposes.
// Prevent commiting PDF example everytime the script is excecuted.
MockDate.set(1434319925275);

try {
  require(`./${process.argv[2]}/index`);
} catch (e) {
  console.error(e);
}
