export default function(object) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      object[key.charAt(0).toUpperCase() + key.substring(1)] = object[key];
      delete object[key];
    }
  }
  return object;
}
