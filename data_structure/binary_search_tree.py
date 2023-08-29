class Node:
    def __init__(self, data: int):
        self.data = data
        self.parent = None
        self.left = None
        self.right = None


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def inorder_traverse(self, node: Node):
        if node != None:
            self.inorder_traverse(node.left)
            print(node.data)
            self.inorder_traverse(node.right)

    def search(self, data: int) -> Node:
        return self.search_node(self.root, data)

    def search_node(self, node: Node, data: int) -> int:
        if node == None or data == node.data:
            return node

        if data < node.data:
            return self.search_node(node.left, data)
        else:
            return self.search_node(node.right, data)

    def insert(self, data: int) -> Node:
        leaf = None
        to_traverse = self.root
        to_insert = Node(data)

        while to_traverse != None:
            leaf = to_traverse
            if to_insert.data < to_traverse.data:
                to_traverse = to_traverse.left
            else:
                to_traverse = to_traverse.right

        to_insert.parent = leaf

        if leaf == None:
            self.root = to_insert
        elif to_insert.data < leaf.data:
            leaf.left = to_insert
        else:
            leaf.right = to_insert

    def delete(self, data: int):
        self.delete_node(self.search_node(self.root, data))

    def delete_node(self, to_delete: Node):
        if to_delete.left == None:
            self.transplant(to_delete, to_delete.right)
        elif to_delete.right == None:
            self.transplant(to_delete, to_delete.left)
        else:
            to_success = self.tree_minimum(to_delete.right)
            if to_success.parent != to_delete:
                self.transplant(to_success, to_success.right)
                to_success.right = to_delete.right
                to_success.right.parent = to_success
            self.transplant(to_delete, to_success)
            to_success.left = to_delete.left
            to_success.left.parent = to_success

    def transplant(self, u: Node, v: Node):
        if u.parent == None:
            self.root = v
        elif u == u.parent.left:
            u.parent.left = v
        else:
            u.parent.right = v
        if v != None:
            v.parent = u.parent

    def tree_minimum(self, node: Node) -> Node:
        while node.left != None:
            node = node.left

        return node


# BST
# 1. search: 값을 텀색하는 과정. -> 1 (Best case) log n (Average case) n (Worst case) / h (높이: root 와  최종 탐색 대상의 높이 차)
# 2. tree 순회(in-order): 전체 tree 를 왼쪽 자식 -> 부모 -> 오른쪽 자식 순으로 순회하는 연산. -> n
# 3. insert: root 부터 순회하며 삽입할 위치를 탐색 후 값을 삽입하는 연산. -> 1 (Best case) log n (Average case) n (Worst case) / h (높이: root 와  삽입 위치까지  높이 차)
# 4. delete: root 부터 순회하며 삭제할 위치를 탐색 후 값을 삭제하고, 해당 노드의 자식을 끌어올려 대체하게 만드는 연산. -> 1 (Best case) log n (Average case) n (Worst case) / h (높이: root 와  삽입 위치까지  높이 차)

if __name__ == "__main__":
    bst = BinarySearchTree()

    data = [12, 5, 18, 2, 9, 15, 19, 13, 17]

    print("[Insert]")
    for i in data:
        bst.insert(i)
        bst.inorder_traverse(bst.root)

    print("[Delete]")
    for i in data:
        bst.delete(i)
        bst.inorder_traverse(bst.root)
