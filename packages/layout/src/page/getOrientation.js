const VALID_ORIENTATIONS = ['portrait', 'landscape'];

/**
 * Get page orientation. Defaults to portrait
 *
 * @param { Object } page object
 * @returns { String } page orientation
 */
const getOrientation = page => {
  const value = page.props?.orientation || 'portrait';
  return VALID_ORIENTATIONS.includes(value) ? value : 'portrait';
};

export default getOrientation;
