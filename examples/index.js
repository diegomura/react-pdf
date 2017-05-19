try {
  require(`./${process.argv[2]}/index`);
} catch (e) {
  console.error(e);
}
