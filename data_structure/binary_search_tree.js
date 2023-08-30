class BSTNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  // in-order (왼쪽 -> 루트 -> 오른쪽)
  // BST = 왼쪽 자식 <= 부모 <= 왼쪽 자식
  // 오름차순으로 정렬된 결과 얻음
  // n개의 노드를 순회 = n 시간복잡도
  // 각 노드에 대해 왼쪽 자식, 오른쪽 자식 총 두번식 재귀적으로 호출됨
  inOrder = node => {
    if (node !== null) {
      this.inOrder(node.left);
      console.log(node.key);
      this.inOrder(node.right);
    }
  };

  // 루트에서 부터 한 층씩 내려가면서 탐색
  // h가 트리의 높이일 때 h 만큼의 시간복잡도
  // h = log n => 완전 이진트리가 아니면 보장이 되는 건 아님 => 이걸 보장해주기 위해 RBtree ...
  search = (entryNode, targetKey) => {
    while (entryNode !== null && targetKey !== entryNode.key) {
      if (targetKey < entryNode.key) {
        entryNode = entryNode.left;
      } else {
        entryNode = entryNode.right;
      }
    }

    return entryNode;
  };

  getMin = node => {
    while (node.left !== null) {
      node = node.left;
    }

    return node;
  };

  getMax = node => {
    while (node.right !== null) {
      node = node.right;
    }

    return node;
  };

  getSuccessor = node => {
    // Successor : 주어진 노드보다 큰 노드 중 가장 작은 노드
    // 는 주어진 노드의 오른쪽 서브트리에서 가장 작은 노드임
    // => 오른쪽 서브트리에 대해서 getMin() 호출
    if (node.right !== null) {
      return this.getMin(node.right);
    }

    // 오른쪽 서브트리가 없는 경우
    // 조상 노드들 중 처음으로 주어진 노드를 왼쪽 서브트리에 갖는 노드
    let ancestorNode = node.parent;
    while (ancestorNode !== null && node === ancestorNode.right) {
      // 조상 한 층 더 올라감
      node = ancestorNode;
      ancestorNode = ancestorNode.parent;
    }

    return ancestorNode;
  };

  getPredecessor = node => {
    // Predecessor : 주어진 노드보다 작은 노드 중에 가장 큰 노드
    // 왼쪽 서브트리에서 가장 큰 노드
    if (node.left !== null) {
      return this.getMax(node.left);
    }

    // 왼쪽 서브트리가 없는 경우
    // 주어진 노드를 오른쪽 서브트리에 갖는 첫 조상 노드
    let ancestorNode = node.parent;
    while (ancestorNode !== null && node == ancestorNode.left) {
      node = ancestorNode;
      ancestorNode = ancestorNode.parent;
    }

    return ancestorNode;
  };

  insert = data => {
    const newNode = new BSTNode(data);

    let parentNode = null;
    let nodeToTraverse = this.root;

    // 새로운 노드를 자식으로 갖게될 노드를 찾음
    while (nodeToTraverse !== null) {
      parentNode = nodeToTraverse;
      if (newNode.key < nodeToTraverse.key) {
        nodeToTraverse = nodeToTraverse.left;
      } else {
        nodeToTraverse = nodeToTraverse.right;
      }
    }

    newNode.parent = parentNode;
    if (parentNode === null) {
      this.root = newNode; // 전체 트리가 비어있는 경우
    } else if (newNode.key < parentNode.key) {
      parentNode.left = newNode;
    } else {
      parentNode.right = newNode;
    }
  };

  // newNode 가 oldNode 자리로 옮겨짐
  transplant = (oldNode, newNode) => {
    if (oldNode.parent === null) {
      this.root = newNode;
    }
    // find oldNode's parent, decide if oldNode is a left or right child
    // from oldNode's parent perspective to replace oldNode with newNode
    // oldNode is a left child of its parent
    else if (oldNode === oldNode.parent.left) {
      oldNode.parent.left = newNode;
    }
    // oldNode is a right child of its parent
    else {
      oldNode.parent.right = newNode;
    }

    // from newNode's perspective, to replace its parent with oldNode's parent
    if (newNode !== null) {
      newNode.parent = oldNode.parent;
    }
  };

  delete = data => {
    const nodeToDelete = this.search(this.root, data);

    // left child is null or both left and right are null
    if (nodeToDelete.left === null) {
      this.transplant(nodeToDelete, nodeToDelete.right);
    }
    // left child is not null, right child is null
    else if (nodeToDelete.right === null) {
      this.transplant(nodeToDelete, nodeToDelete.left);
    }
    // neither left child nor right child is null
    else {
      // find a node:
      // - in right sub-tree of nodeToDelete
      // - whose left child is null
      let replacementNode = this.getMin(nodeToDelete.right);
      if (replacementNode.parent !== nodeToDelete) {
        // replacementNode's right child takes the position of replacementNode
        this.transplant(replacementNode, replacementNode.right);

        // nodeToDelete's right child becomes replacementNode's right child
        replacementNode.right = nodeToDelete.right;

        // then nodeToDelete's right child, now replacementNode's child right needs
        // to update its parent from nodeToDelete to replacementNode
        replacementNode.right.parent = replacementNode;
      }

      this.transplant(nodeToDelete, replacementNode);
      replacementNode.left = nodeToDelete.left;
      replacementNode.left.parent = replacementNode;
    }
  };
}

const tree = new BST();
tree.insert(1);
tree.insert(3);
tree.insert(2);
tree.insert(22);
tree.insert(21);
tree.insert(18);

console.log('min', tree.getMin(tree.root).key);
console.log('max', tree.getMax(tree.root).key);

console.log('inorder');
tree.inOrder(tree.root);

console.log('delete 3');
tree.delete(3);
tree.inOrder(tree.root);

// 새로운 노드를 추가하는 경우 노드가 추가될 자리 찾기위해 트리의 높이 만큼 탐색 => log n
// 노드를 제거 => 제거된 노드자리에 올 successor를 탐색하기위해 높이 만큼 탐색 => log n
// 정렬 : in-order walk => 각 노드에대해 2번씩 재귀적으로 호출 => n
// 조회 : 트리 높이 만큼 탐색 => log n

// 단, 트리의 높이가 평균적으로 log n 이지만 최악의 경우 n 이 될 수도 있음
// 트리의 높이를 log n 으로 보장해주기 위해 balancing 하는 트리들이 등장
