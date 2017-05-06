import traverseTree from './traverser';
import convert from './convert';

function createObject(node) {
  const renderedElement = convert(node.render());

  return `${node.id} 0 obj\n${renderedElement}\nendobj`;
}

const transformTree = input => {
  let objectId = 1;
  const objects = [];

  // First, we assign a unique id to each node
  traverseTree(input, node => {
    node.id = objectId++;
  });

  // Renders the node to it's PDF representation
  // and save it with it's id and type
  traverseTree(input, node =>
    objects.push({
      id: node.id,
      type: node.constructor.name,
      value: createObject(node),
    }));

  return objects;
};

export default transformTree;
