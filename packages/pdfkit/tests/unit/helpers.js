function logData(doc) {
  const loggedData = [];
  const originalMethod = doc._write;
  doc._write = function(data) {
    loggedData.push(data);
    originalMethod.call(this, data);
  };
  return loggedData;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function joinTokens(...args) {
  let a = args.map(i => escapeRegExp(i));
  let r = new RegExp('^' + a.join('\\s*') + '$');
  return r;
}

export { logData, joinTokens }


