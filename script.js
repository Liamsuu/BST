class Tree {
  constructor(array) {
    this.root = this.buildTree(array); // maybe change this if its not correct
  }

  buildTree(array) {
    // array param e.g: [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
    // CONTINUE FROM HERE (STEP 3)

    let leftArr = [];
    let rightArr = [];
    const root = new Node(array[Math.floor(array.length / 2)]);

    if (array.length === 1) {
      return root;
    }
    // Grab initial left array
    for (let x = 0; x < array.indexOf(root.getValue()); x++) {
      leftArr.push(array[x]);
    }

    for (let x = array.indexOf(root.getValue()); x < array.length; x++) {
      rightArr.push(array[x]);
    }

    root.setLeft(this.buildTree(leftArr));
    root.setRight(this.buildTree(rightArr));

    return root;
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

const bst = new Tree([1, 2, 3, 4, 5]);

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
