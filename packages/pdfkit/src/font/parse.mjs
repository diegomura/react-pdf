// this file executed in node

export default function parse(contents) {
  const obj = {
    attributes: {},
    glyphWidths: {},
    kernPairs: {}
  };

  let section = '';
  for (let line of contents.split('\n')) {
    var match;
    var a;
    if ((match = line.match(/^Start(\w+)/))) {
      section = match[1];
      continue;
    } else if ((match = line.match(/^End(\w+)/))) {
      section = '';
      continue;
    }

    switch (section) {
      case 'FontMetrics':
        match = line.match(/(^\w+)\s+(.*)/);
        var key = match[1];
        var value = match[2];

        if ((a = obj.attributes[key])) {
          if (!Array.isArray(a)) {
            a = obj.attributes[key] = [a];
          }
          a.push(value);
        } else {
          obj.attributes[key] = value;
        }
        break;

      case 'CharMetrics':
        if (!/^CH?\s/.test(line)) {
          continue;
        }
        var name = line.match(/\bN\s+(\.?\w+)\s*;/)[1];
        obj.glyphWidths[name] = +line.match(/\bWX\s+(\d+)\s*;/)[1];
        break;

      case 'KernPairs':
        match = line.match(/^KPX\s+(\.?\w+)\s+(\.?\w+)\s+(-?\d+)/);
        if (match) {
          obj.kernPairs[match[1] + '\0' + match[2]] = parseInt(match[3]);
        }
        break;
    }
  }

  return obj;
}
