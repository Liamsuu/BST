// Uses merge sort algorithm to sort array of numbers in order.

export default function mergeSort(array, leftArr = [], rightArr = []) {
  if (array.length <= 1) {
    return array;
  }

  if (array.length > 1) {
    const middlePoint = Math.round(array.length / 2);
    if (array.length === 2) {
      leftArr.push(array[0]);
      rightArr.push(array[1]);
      return merge(mergeSort(leftArr), mergeSort(rightArr)); // this returns single elements then to combine into an array with 2 items that are ordered to the merge below.
    } else {
      for (let loops = 0; loops < middlePoint; loops++) {
        leftArr.push(array[loops]);
      }
      for (let loops = middlePoint; loops < array.length; loops++) {
        rightArr.push(array[loops]);
      }
      return merge(mergeSort(leftArr), mergeSort(rightArr));
    }
  }
}

function merge(leftArr, rightArr) {
  let sortedList = [];

  while (true) {
    if (leftArr[0] === rightArr[0]) {
      sortedList.push(leftArr[0], rightArr[0]);
      leftArr.splice(0, 1);
      rightArr.splice(0, 1);
    }
    if (leftArr.length === 0) {
      rightArr.forEach((element) => {
        sortedList.push(element);
      });
      break;
    } else if (rightArr.length === 0) {
      leftArr.forEach((element) => {
        sortedList.push(element);
      });
      break;
    }

    if (leftArr[0] > rightArr[0]) {
      sortedList.push(rightArr[0]);
      rightArr.splice(0, 1);
    } else if (rightArr[0] > leftArr[0]) {
      sortedList.push(leftArr[0]);
      leftArr.splice(0, 1);
    }
  }

  return sortedList;
}
