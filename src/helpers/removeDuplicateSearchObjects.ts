import { isNull } from 'util';

export default function removeDuplicates(originalArray: [], prop: string) {
  var newArray = [];
  var lookupObject: any = {};

  for (let i = 0, length = originalArray.length; i < length; i++) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (let i in lookupObject) {
    if (isNull(lookupObject[i][prop])) {
      continue;
    }
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
