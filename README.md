# BST

Binary Search Tree Algorithm. Created by Liamsuu.

# How to use

Import the module:

```javascript
import Tree from easy-bst;

// Create the tree
const bst = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
```

Add value to tree:

```javascript
bst.insert(99); // Node with the value 99 is added to tree
```

Remove value from tree:

```javascript
bst.deleteItem(5);
```

Find the node with a value:

```javascript
bst.find(2); // Returns the node with the value 2 if found, otherwise null
```

\*Perform Level-Order-Traversal:

```javascript
// returns array of values in traversed order
bst.levelOrder();
```

\*Perform Pre-Order Traversal:

```javascript
// returns array of values in traversed order
bst.preOrder();
```

\*Perform In-Order Traversal:

```javascript
// returns array of values in traversed order
bst.inOrder();
```

\*Perform Post-Order Traversal:

```javascript
// returns array of values in traversed order
bst.postOrder();
```

Get height of tree from given node:

```javascript
// Can start from any node in the tree. E.g: bst.root.left.right
bst.height(bst.root);
```

Get depth of node in tree(edges away from root):

```javascript
bst.depth(bst.left.left.right.left.right);
```

Check if tree is height balanced(true or false):

```javascript
bst.isBalanced();
```

Rebalance Tree:

```javascript
bst.rebalance();
```

\*Note: A callback can be provided in the parameter of each traversal method, and will be performed on each node. If no callback, array of values is returned in order they were traversed.
