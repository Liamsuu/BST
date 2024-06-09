export default class Node {
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
