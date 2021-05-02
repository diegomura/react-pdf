// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

export function binarySearch(arr, cmp) {
  let min = 0;
  let max = arr.length - 1;
  while (min <= max) {
    const mid = (min + max) >> 1;
    const res = cmp(arr[mid]);

    if (res < 0) {
      max = mid - 1;
    } else if (res > 0) {
      min = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
}

export function range(index, end) {
  const result = [];
  while (index < end) {
    result.push(index++);
  }
  return result;
}
