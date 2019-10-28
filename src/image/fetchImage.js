import resolveImage from './resolveImage';
import getSource from './getSource';
import warning from '../utils/warning';

const resolveSrc = async src =>
  typeof src === 'function' ? { uri: await src() } : src;

const fetchImage = async node => {
  const src = getSource(node);
  const { cache } = node.props;

  if (!src) {
    warning(false, 'Image should receive either a "src" or "source" prop');
    return;
  }

  try {
    const source = await resolveSrc(src);
    node.image = await resolveImage(source, { cache });
  } catch (e) {
    node.image = { width: 0, height: 0 };
    console.warn(e.message);
  }
};

export default fetchImage;
