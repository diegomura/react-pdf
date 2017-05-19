try {
  require(`./${process.argv[2]}/index`);
} catch (e) {
  if (process.argv.length < 3) {
    console.error(
      'You didn\'t specify an example. Run the command with option " -- <example_name>".',
    );
  } else {
    console.error(`Missing example ${process.argv[2]}`);
  }
}
