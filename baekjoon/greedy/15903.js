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
}

const solution = (m, cards) => {
  const pq = new PriorityQueue();

  cards.forEach((v, i) => {
    pq.enqueue(v, i);
  });

  for (let i = 0; i < m; i++) {
    const first = pq.dequeue();
    const second = pq.dequeue();

    const newState = first.key + second.key;

    pq.enqueue(newState, first.value);
    pq.enqueue(newState, second.value);
  }

  return pq.heap
    .slice(1)
    .reduce((acc, cur) => acc + BigInt(cur.key), 0n)
    .toString();
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/greedy/15903.txt').toString().trim().split('\n');

  const [n, m] = input[0].split(' ').map(Number);
  const cards = input[1].split(' ').map(Number);

  console.log(solution(m, cards));
}

if (require.main === module) {
  main();
}
