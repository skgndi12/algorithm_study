class minHeap {
  constructor() {
    this.heap = [null]; // 부모, 자식간의 인덱스 계산을 직관적으로 하기위해 첫번째 사용 X
  }

  getLeftChildIndex = parentIndex => parentIndex * 2;
  getRightChildIndex = parentIndex => parentIndex * 2 + 1;
  getParentIndex = childIndex => Math.floor(childIndex / 2);

  peek = () => this.heap && this.heap[1];

  heappush = (key, value) => {
    const node = { key, value };
    this.heap.push(node);
    this.minHeapifyUp();
  };

  minHeapifyUp() {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];

    while (index > 1) {
      const parentIndex = this.getParentIndex(index);

      if (this.heap[parentIndex].key > lastInsertedNode.key) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }

    this.heap[index] = lastInsertedNode;
  }

  heappop = () => {
    const count = this.heap.length;
    const rootNode = this.heap[1];

    if (count <= 2) this.heap = [null];
    else {
      this.heap[1] = this.heap.pop();
      this.minHeapifyDown();
    }

    return rootNode;
  };

  minHeapifyDown = () => {
    let index = 1;
    const count = this.heap.length;
    const rootNode = this.heap[index];

    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      const smallerChildIndex =
        rightChildIndex < count && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
          ? rightChildIndex
          : leftChildIndex;

      if (this.heap[smallerChildIndex].key <= rootNode.key) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;
    }

    this.heap[index] = rootNode;
  };
}

class PriorityQueue extends minHeap {
  constructor() {
    super();
  }

  enqueue = (priority, value) => this.heappush(priority, value);
  dequeue = () => this.heappop();
  isEmpty = () => this.heap.length <= 1;
  root = () => this.peek() && this.peek().value;
}

const solution = (length, graph) => {
  let ans;
  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];

  const visited = Array(length)
    .fill(null)
    .map(() => Array(length).fill(false));

  const pq = new PriorityQueue();
  pq.enqueue(0, [0, 0]);
  visited[0][0] = true;

  while (!pq.isEmpty()) {
    const {
      key: curCount,
      value: [curX, curY],
    } = pq.dequeue();

    if (curX === length - 1 && curY === length - 1) {
      ans = curCount;
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nextX = curX + dx[i];
      const nextY = curY + dy[i];

      if (nextX < 0 || nextX > length - 1 || nextY < 0 || nextY > length - 1) {
        continue;
      }

      if (visited[nextX][nextY]) {
        continue;
      }

      visited[nextX][nextY] = true;

      if (graph[nextX][nextY]) {
        pq.enqueue(curCount, [nextX, nextY]);
      } else {
        pq.enqueue(curCount + 1, [nextX, nextY]);
      }
    }
  }

  return ans;
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/bfs/2665.txt').toString().trim().split('\n');

  const length = +input.shift();
  const graph = input.map(v => v.split('').map(Number));

  console.log(solution(length, graph));
}

if (require.main === module) {
  main();
}
