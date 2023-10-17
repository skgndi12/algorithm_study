class TreeNode:
    def __init__(self, key: int):
        self.key = key
        self.parent = None
        self.left = None
        self.right = None
        self.color = 1  # 1은 레드, 0은 블랙

# Red-Black Tree 5가지 속성
# 1. 모든 노드는 레드이거나 블랙이다.
# 2. 루트 노드는 블랙이다.
# 3. 모든 리프(NIL)는 블랙이다.
# 4. 노드가 레드라면, 두 자식들은 모두 블랙이다.
# 5. 루트 노드에서 모든 리프 노드까지의 경로는 모두 같은 수의 블랙 노드를 가지고 있다.
class RedBlackTree:
    def __init__(self):
        self.nil = TreeNode(0)
        self.nil.color = 0
        self.nil.left = None
        self.nil.right = None
        self.root = self.nil

    def inorder_traverse(self, cur_node: TreeNode):
        if cur_node != self.nil:
            self.inorder_traverse(cur_node.left)
            print(cur_node.key)
            self.inorder_traverse(cur_node.right)

    def insert(self, key: int):
        new_node = TreeNode(key)
        # 삽입할 노드의 색깔을 레드로 설정. 블랙으로 설정할 시, 5번 속성을 위반하게 되고 더 복잡한 연산을 수행해야 합니다.
        new_node.color = 1
        new_node.left = self.nil
        new_node.right = self.nil

        parent_node = None
        cur_node = self.root

        # 삽입 위치를 찾습니다.
        while cur_node != self.nil:
            parent_node = cur_node
            if new_node.key < cur_node.key:
                cur_node = cur_node.left
            else:
                cur_node = cur_node.right

        new_node.parent = parent_node

        # 부모 노드와 연결합니다.
        if parent_node is None:
            self.root = new_node
        elif new_node.key < parent_node.key:
            parent_node.left = new_node
        else:
            parent_node.right = new_node

        # 루트 노드는 블랙이어야 합니다. (2번 속성)
        if new_node.parent is None:
            new_node.color = 0
            return

        # 부모 노드가 루트 노드일 경우
        if new_node.parent.parent is None:
            return

        # 삽입 후에 규칙을 복구합니다.
        self.insert_fixup(new_node)

    def insert_fixup(self, node: TreeNode):
        # 부모 노드가 레드일 경우 반복합니다.
        while node.parent.color == 1:
            # 부모 노드가 왼쪽 자식인 경우
            if node.parent == node.parent.parent.left:
                uncle_node = node.parent.parent.right
                # Case 1: 삼촌 노드가 레드일 경우
                if uncle_node.color == 1:
                    node.parent.color = 0
                    uncle_node.color = 0
                    node.parent.parent.color = 1
                    node = node.parent.parent
                # Case 2: 삼촌 노드가 블랙이고, 내가 오른쪽 자식일 경우
                else:
                    if node == node.parent.right:
                        node = node.parent
                        self.left_rotate(node)
                # Case 3: 삼촌 노드가 블랙이고, 내가 왼쪽 자식일 경우
                    node.parent.color = 0
                    node.parent.parent.color = 1
                    self.right_rotate(node.parent.parent)
            # 부모 노드가 오른쪽 자식인 경우
            else:
                uncle_node = node.parent.parent.left
                # Case 1: 삼촌 노드가 레드일 경우
                if uncle_node.color == 1:
                    node.parent.color = 0
                    uncle_node.color = 0
                    node.parent.parent.color = 1
                    node = node.parent.parent
                # Case 2: 삼촌 노드가 블랙이고, 내가 오른쪽 자식일 경우
                else:
                    if node == node.parent.left:
                        node = node.parent
                        self.right_rotate(node)
                # Case 3: 삼촌 노드가 블랙이고, 내가 왼쪽 자식일 경우
                    node.parent.color = 0
                    node.parent.parent.color = 1
                    self.left_rotate(node.parent.parent)

            # 루트 노드에 도달하면 종료합니다.
            if node == self.root:
                break

        # 루트 노드의 색깔은 블랙이어야 합니다. (2번 속성)
        self.root.color = 0

    def left_rotate(self, rotating_node: TreeNode):
        rotated_node = rotating_node.right
        rotating_node.right = rotated_node.left

        if rotated_node.left != self.nil:
            rotated_node.left.parent = rotating_node

        rotated_node.parent = rotating_node.parent
        if rotating_node.parent is None:
            self.root = rotated_node
        elif rotating_node == rotating_node.parent.left:
            rotating_node.parent.left = rotated_node
        else:
            rotating_node.parent.right = rotated_node

        rotated_node.left = rotating_node
        rotating_node.parent = rotated_node

    def right_rotate(self, rotating_node: TreeNode):
        rotated_node = rotating_node.left
        rotating_node.left = rotated_node.right

        if rotated_node.right != self.nil:
            rotated_node.right.parent = rotating_node

        rotated_node.parent = rotating_node.parent
        if rotating_node.parent is None:
            self.root = rotated_node
        elif rotating_node == rotating_node.parent.right:
            rotating_node.parent.right = rotated_node
        else:
            rotating_node.parent.left = rotated_node

        rotated_node.right = rotating_node
        rotating_node.parent = rotated_node

    def delete(self, key: int):
        self.delete_helper(self.root, key)

    def delete_helper(self, node: TreeNode, key: int):
        # 삭제할 노드의 위치를 키 값으로 탐색합니다.
        target_node = self.nil
        while node != self.nil:
            if node.key == key:
                target_node = node
            if node.key <= key:
                node = node.right
            else:
                node = node.left

        # 삭제할 노드의 키 값이 존재하지 않는 경우
        if target_node == self.nil:
            print("키 값이 트리에 없습니다.")
            return

        successor_node = target_node
        # 후계자 노드의 색을 저장합니다.
        successor_node_original_color = successor_node.color
        # 삭제할 노드의 왼쪽 자식 노드가 없을 경우
        if target_node.left == self.nil:
            replacement_node = target_node.right
            self.transplant(target_node, target_node.right)
        # 삭제할 노드의 오른쪽 자식 노드가 없을 경우
        elif target_node.right == self.nil:
            replacement_node = target_node.left
            self.transplant(target_node, target_node.left)
        # 삭제할 노드의 오른쪽, 왼쪽 자식 모두 존재할 경우
        else:
            # 후계자 노드를 탐색 (오른쪽 서브 트리 중 가장 작은 것을 반환)
            successor_node = self.get_minimum_node(target_node.right)
            successor_node_original_color = successor_node.color
            replacement_node = successor_node.right
            # 후계자 노드가 삭제할 노드의 자식일 경우
            if successor_node.parent == target_node:
                replacement_node.parent = successor_node
            # 후계자 노드가 삭제할 노드의 자식이 아닐 경우
            else:
                self.transplant(successor_node, successor_node.right)
                successor_node.right = target_node.right
                successor_node.right.parent = successor_node
            self.transplant(target_node, successor_node)
            successor_node.left = target_node.left
            successor_node.left.parent = successor_node
            successor_node.color = target_node.color

        # 후계자 노드의 원래 색이 블랙일 경우 5번 속성을 위반하여 규칙을 복구합니다.
        if successor_node_original_color == 0:
            self.delete_fixup(replacement_node)

    def get_minimum_node(self, node: TreeNode) -> TreeNode:
        while node.left != self.nil:
            node = node.left
        return node

    def delete_fixup(self, node: TreeNode):
        # 현재 노드가 루트 노드가 아니고 블랙일 경우 반복합니다.
        while node != self.root and node.color == 0:
            # 현재 노드가 부모 노드의 왼쪽 자식인 경우
            if node == node.parent.left:
                sibling_node = node.parent.right
                # Case 1: 형제 노드의 색이 레드일 경우
                if sibling_node.color == 1:
                    sibling_node.color = 0
                    node.parent.color = 1
                    self.left_rotate(node.parent)
                    sibling_node = node.parent.right
                # Case 2: 형제 노드의 색이 블랙이고, 형제 노드의 두 자식 노드의 색이 모두 블랙일 경우
                if sibling_node.left.color == 0 and sibling_node.right.color == 0:
                    sibling_node.color = 1
                    node = node.parent
                else:
                    # Case 3: 형제 노드의 색이 블랙이고, 형제 노드의 왼쪽 자식은 레드이고, 오른쪽 자식은 블랙일 경우
                    if sibling_node.right.color == 0:
                        sibling_node.left.color = 0
                        sibling_node.color = 1
                        self.right_rotate(sibling_node)
                        sibling_node = node.parent.right
                    # Case 4: 형제 노드의 색이 블랙이고, 형제 노드의 오른쪽 자식이 레드일 경우
                    sibling_node.color = node.parent.color
                    node.parent.color = 0
                    sibling_node.right.color = 0
                    self.left_rotate(node.parent)
                    node = self.root
            # 현재 노드가 부모 노드의 오른쪽 자식인 경우
            else:
                sibling_node = node.parent.left
                # Case 1: 형제 노드의 색이 레드일 경우
                if sibling_node.color == 1:
                    sibling_node.color = 0
                    node.parent.color = 1
                    self.right_rotate(node.parent)
                    sibling_node = node.parent.left
                # Case 2: 형제 노드의 색이 블랙이고, 형제 노드의 두 자식 노드의 색이 모두 블랙일 경우
                if sibling_node.right.color == 0 and sibling_node.left.color == 0:
                    sibling_node.color = 1
                    node = node.parent
                else:
                    # Case 3: 형제 노드의 색이 블랙이고, 형제 노드의 왼쪽 자식은 레드이고, 오른쪽 자식은 블랙일 경우
                    if sibling_node.left.color == 0:
                        sibling_node.right.color = 0
                        sibling_node.color = 1
                        self.left_rotate(sibling_node)
                        sibling_node = node.parent.left
                    # Case 4: 형제 노드의 색이 블랙이고, 형제 노드의 오른쪽 자식이 레드일 경우
                    sibling_node.color = node.parent.color
                    node.parent.color = 0
                    sibling_node.left.color = 0
                    self.right_rotate(node.parent)
                    node = self.root

        # 트루트 노드의 색깔은 블랙이어야 합니다. (2번 속성)
        node.color = 0

    def transplant(self, old_node: TreeNode, new_node: TreeNode):
        if old_node.parent is None:
            self.root = new_node
        elif old_node == old_node.parent.left:
            old_node.parent.left = new_node
        else:
            old_node.parent.right = new_node
        new_node.parent = old_node.parent

    def __print_tree_helper(self, node, indent,

 is_last):
        if node != self.nil:
            print(indent, end=" ")
            if is_last:
                print("R----", end=" ")
                indent += "     "
            else:
                print("L----", end=" ")
                indent += "|    "

            node_color = "RED" if node.color == 1 else "BLACK"
            parent_key = node.parent.key if node.parent else "None"
            print(f"{node.key} ({node_color}) Parent: {parent_key}")
            self.__print_tree_helper(node.left, indent, False)
            self.__print_tree_helper(node.right, indent, True)

    def print_tree(self):
        self.__print_tree_helper(self.root, "", True)


if __name__ == "__main__":
    rb_tree = RedBlackTree()

    data = [12, 5, 18, 2, 9, 15, 19, 13, 17]

    for value in data:
        rb_tree.insert(value)

    print("Red-Black Tree:")
    rb_tree.print_tree()
    print("Inorder Traversal:")
    rb_tree.inorder_traverse(rb_tree.root)

    print("\n요소 삭제 후")

    for value in data:
        rb_tree.delete(value)
        print("Red-Black Tree:")
        rb_tree.print_tree()
        print("Inorder Traversal:")
        rb_tree.inorder_traverse(rb_tree.root)