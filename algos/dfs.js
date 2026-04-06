const tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: {
        value: 8,
        left: null,
        right: null
      },
      right: {
        value: 9,
        left: null,
        right: null
      }
    },
    right: {
      value: 5,
      left: null,
      right: {
        value: 10,
        left: null,
        right: null
      }
    }
  },
  right: {
    value: 3,
    left: {
      value: 6,
      left: null,
      right: null
    },
    right: {
      value: 7,
      left: {
        value: 11,
        left: null,
        right: null
      },
      right: null
    }
  }
};

// 8 9 4 10 5 2 6 11 7 3 1 

const list = [];

function DFSPostOrder (node, list) {
    if (!node) return list;

    if (node.left) {
        DFSPostOrder(node.left, list);
    }

    if (node.right) {
        DFSPostOrder(node.right, list);
    }

    list.push(node.value);

    return list;
}

console.log(DFSPostOrder(tree, list));