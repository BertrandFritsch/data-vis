
export function setInArray<T>(array: T[], predicate: (t: T) => boolean, newItem?: T | undefined | ((item: T | undefined) => T | undefined)): T[] {
  const itemIndex = array.findIndex(predicate);

  const lNewItem = typeof newItem === 'function' ? newItem(array[ itemIndex ]) : newItem;

  if (lNewItem) {
    return [
      ...array.slice(0, itemIndex > -1 ? itemIndex : array.length),
      lNewItem,
      ...array.slice((itemIndex > -1 ? itemIndex : array.length) + 1)
    ];
  }
  else {
    return [
      ...array.slice(0, itemIndex > -1 ? itemIndex : array.length),
      ...array.slice((itemIndex > -1 ? itemIndex : array.length) + 1)
    ];
  }
}
