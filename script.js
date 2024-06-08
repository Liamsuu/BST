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
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    array = mergeSort(array); // uses my mergesort algorithm to put values in order
    this.removeDuplicates(array);

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

  insert(value) {
    let currentNode = this.root;
    // Will navigate left(less than) and right(greater than) through nodes based on greater or less than comparison, after comparison it will either move to the next node or insert a new node
    while (true) {
      if (value === currentNode.value) {
        break;
      }
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.setLeft(new Node(value));
          break;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.setRight(new Node(value));
          break;
        }
        currentNode = currentNode.right;
      }
    }
  }

  deleteItem(value, currentNode = this.root, previousNode = null) {
    if (currentNode === null) {
      return null; // same as just returning nothing
    }

    if (currentNode.getValue() === value) {
      // REMOVE LEAF NODES(nodes at the end with no children):
      if (currentNode.left === null && currentNode.right === null) {
        // will check if the current node is the previous nodes left or right child, and assigns null whatever child of it is the currentnode
        if (currentNode === previousNode.right) {
          previousNode.setRight(null);
        } else {
          previousNode.setLeft(null);
        }
        return null;
      }
      // REMOVE NODES WITH ONLY ONE CHILD:

      // The node before the current(the one to be removed) basically jumps over the current node
      // and connects up to the currents child instead, replacing any of the current nodes connections - both to the current, and the node from the current
      else if (currentNode.left === null && currentNode.right !== null) {
        if (previousNode.right === currentNode) {
          previousNode.setRight(currentNode.right);
        } else {
          previousNode.setLeft(currentNode.right);
        }
      } else if (currentNode.left !== null && currentNode.right === null) {
        if (previousNode.right === currentNode) {
          previousNode.setRight(currentNode.left);
        } else {
          previousNode.setLeft(currentNode.left);
        }
      }

      // REMOVE NODES WITH BOTH LEFT AND RIGHT CHILDREN:
      else if (currentNode.left !== null && currentNode.right !== null) {
        const removedNode = currentNode; // 8
        previousNode = currentNode; // 8
        currentNode = currentNode.right; // 15
        if (currentNode.left === null) {
          // initial check
          removedNode.value = currentNode.getValue(); // 8 to 15

          if (currentNode.right !== null) {
            removedNode.setRight(currentNode.right);
          } else {
            removedNode.setRight(null);
          }
        } else {
          // set them into position to continuously go left.
          currentNode = currentNode.left;
          previousNode = removedNode.right;
        }
        if (previousNode !== removedNode) {
          while (true) {
            // remember current node is always one ahead of previous since i set the position above
            if (currentNode.left === null) {
              removedNode.value = currentNode.getValue();
              if (currentNode.right !== null) {
                previousNode.setLeft(currentNode.right);
                break;
              } else {
                previousNode.setLeft(null);
                break;
              }
            } else {
              currentNode = currentNode.left;
              previousNode = previousNode.left;
            }
          }
        }
      }
    } else {
      // this gets run everytime the current node does not contain the value, eventually leading to null if it wasnt down that branch, thus eventually matching the very first condition above
      this.deleteItem(value, currentNode.left, currentNode); // rerun with whatever node is on the left
      this.deleteItem(value, currentNode.right, currentNode); // rerun with whatever node is on the right
    }
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

  find(value, currentNode = this.root) {
    if (currentNode !== null) {
      if (value === currentNode.getValue()) {
        return currentNode;
      }
    } else {
      return null;
    }
    const leftRecursion = this.find(value, currentNode.left);
    const rightRecursion = this.find(value, currentNode.right);
    if (leftRecursion !== null || rightRecursion !== null) {
      if (leftRecursion !== null) {
        return leftRecursion;
      } else {
        return rightRecursion;
      }
    } else {
      return null; // when the value is not found
    }
  }

  levelOrder(callback = false) {
    const root = this.root;
    if (root === null || root === undefined) {
      return;
    }
    let queue = [];
    queue.push(root);
    if (callback !== false) {
      while (queue.length !== 0) {
        let currentNode = queue[0]; // node at the front of the queue
        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
        callback(currentNode);
        queue.shift(); // removes element at the front of the queue
      }
    } else {
      let traversedValues = [];
      while (queue.length !== 0) {
        let currentNode = queue[0]; // node at the front of the queue
        traversedValues.push(currentNode.getValue());
        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }

        queue.shift(); // removes element at the front of the queue
      }
      return traversedValues;
    }
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

bst.insert(15);
bst.insert(27);
bst.insert(16);

prettyPrint(bst.root);
// console.log("---------------------------------------------");
// prettyPrint(bst.root);

console.log(bst.levelOrder());
