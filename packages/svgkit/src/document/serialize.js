const serializeAttributes = (attributes) => {
  const res = Object.keys(attributes).map((key) => {
    return `${key}="${attributes[key]}"`;
  });

  return res.join(' ');
};

const serializeXML = (element) => {
  let res = '';

  if (typeof element === 'string') {
    res += element;
  } else {
    res += `<${element.type} ${serializeAttributes(element.attributes)}>`;

    element.children.forEach((child) => {
      res += serializeXML(child);
    });

    res += `</${element.type}>`;
  }

  return res;
};

export default serializeXML;
