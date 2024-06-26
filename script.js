import mergeSort from "./mergesort.js";
import prettyPrint from "./prettyPrinter.js";
import Node from "./node.js";
export default class Tree {
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

  preOrder(callback = false, root = this.root, traversedValues = []) {
    if (root === null) {
      return;
    }
    if (callback !== false) {
      callback(root);
      this.preOrder(callback, root.left);
      this.preOrder(callback, root.right);
    } else {
      traversedValues.push(root.value);
      this.preOrder(callback, root.left, traversedValues);
      this.preOrder(callback, root.right, traversedValues);
      return traversedValues;
    }
  }

  inOrder(callback = false, root = this.root, traversedValues = []) {
    if (root === null) {
      return;
    }
    if (callback !== false) {
      this.inOrder(callback, root.left);
      callback(root);
      this.inOrder(callback, root.right);
    } else {
      this.inOrder(callback, root.left, traversedValues);
      traversedValues.push(root.value);
      this.inOrder(callback, root.right, traversedValues);
      return traversedValues;
    }
  }

  postOrder(callback = false, root = this.root, traversedValues = []) {
    if (root === null) {
      return;
    }
    if (callback !== false) {
      this.postOrder(callback, root.left);
      this.postOrder(callback, root.right);
      callback(root);
    } else {
      this.postOrder(callback, root.left, traversedValues);
      this.postOrder(callback, root.right, traversedValues);
      traversedValues.push(root.value);
      return traversedValues;
    }
  }

  height(node) {
    if (node === null) {
      return -1;
    } else {
      // recursively go left and right until reaching null, then store them results, return whatever ones higher of the two of them + 1
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  depth(node, currentNode = this.root) {
    // Starts are root and goes down each path, it will only return a number if its found, otherwise returns null.
    if (node === null) {
      return null;
    }
    if (currentNode === null) {
      return null;
    }
    if (currentNode === node) {
      return 0;
    } else {
      const leftDepth = this.depth(node, currentNode.left);
      const rightDepth = this.depth(node, currentNode.right);
      // checks if it was found in tree, if found left or right would have returned a number instead of null, just add one to that number to get depth of node in tree
      if (leftDepth === null && rightDepth === null) {
        return null;
      } else {
        if (leftDepth !== null) {
          return leftDepth + 1;
        } else {
          return rightDepth + 1;
        }
      }
    }
  }

  isBalanced() {
    const leftHeight = this.height(this.root.left);
    const rightHeight = this.height(this.root.right);
    if (leftHeight > rightHeight) {
      if (leftHeight - rightHeight <= 1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (rightHeight - leftHeight <= 1) {
        return true;
      } else {
        return false;
      }
    }
  }

  rebalance() {
    const newTreeArr = this.inOrder();
    this.root = this.buildTree(newTreeArr);
  }
}
