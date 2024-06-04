// Uses merge sort algorithm to sort array of numbers in order.

function mergeSort(array, leftArr = [], rightArr = []) {
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

class Tree {
  constructor(array) {
    this.root = this.buildTree(array); // maybe change this if its not correct
  }

  buildTree(array) {
    array = mergeSort(array); // uses my mergesort algorithm to put values in order
    this.removeDuplicates(array);
    console.log(array);

    // array param e.g: [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
    // CONTINUE FROM HERE (STEP 3)

    let leftArr = [];
    let rightArr = [];

    const root = new Node(array[Math.floor(array.length / 2)]);

    if (array.length === 2) {
      // only setting left side as the right node would be the root node in this case
      root.setLeft(new Node(array[0]));
      return root;
    }
    if (array.length === 1) {
      return root;
    }

    // Grab initial left array
    for (let x = 0; x < array.indexOf(root.getValue()); x++) {
      leftArr.push(array[x]);
    }

    for (let x = array.indexOf(root.getValue()) + 1; x < array.length; x++) {
      rightArr.push(array[x]);
    }

    // this will recursively run as long as the array is not 2.
    root.setLeft(this.buildTree(leftArr));
    root.setRight(this.buildTree(rightArr));

    return root;
  }

  removeDuplicates(array) {
    // this will remove duplicates only if the array is already sorted
    for (let x = 0; x < array.length; x++) {
      if (array[x] === array[x + 1]) {
        array.splice(x, 1);
        x = x - 1; // to reset loop from that point to check if there's even more duplicate values
      }
    }
    return array;
  }
}

class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  setLeft(nodeVal) {
    this.left = nodeVal;
  }

  setRight(nodeVal) {
    this.right = nodeVal;
  }

  getValue() {
    return this.value;
  }
}

const bst = new Tree([1, 7, 8, 7, 3, 5, 1, 2]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(bst.root);
// console.log(bst.root.left);
