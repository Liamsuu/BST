import Tree from "./script.js";

// This function is just used for testing
function driver() {
  let dataValues = [];
  // will generate 30 random numbers from 0 to 100
  for (let x = 0; x < 31; x++) {
    dataValues.push(Math.floor(Math.random() * 101));
  }
  const bst = new Tree(dataValues);
  console.log(bst.isBalanced());
  console.log(bst.levelOrder());
  console.log(bst.preOrder());
  console.log(bst.postOrder());
  console.log(bst.inOrder());

  bst.insert(125);
  bst.insert(785);
  bst.insert(345);

  console.log(bst.isBalanced());
  bst.rebalance();
  console.log(bst.isBalanced());

  console.log(bst.levelOrder());
  console.log(bst.preOrder());
  console.log(bst.postOrder());
  console.log(bst.inOrder());
}

driver();
