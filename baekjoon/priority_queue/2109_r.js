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

const solution = (n, classes, lastDate) => {
  if (!n) return 0;
  const pq = new PriorityQueue();

  let sum = 0;
  for (let date = lastDate; date > 0; date--) {
    if (classes.has(date)) classes.get(date).forEach(p => pq.enqueue(-p, p));
    if (!pq.isEmpty()) sum += pq.dequeue().value;
  }

  return sum;
};

function main() {
  const fs = require('fs');
  const [n, ...arr] = fs.readFileSync('./baekjoon/priority_queue/2109.txt').toString().trim().split('\n');

  const map = new Map();
  let lastDate = 0;
  for (const row of arr) {
    const [p, d] = row.split(' ').map(Number);

    lastDate = Math.max(lastDate, d);
    if (!map.has(d)) map.set(d, []);
    map.get(d).push(p);
  }
  console.log(solution(+n, map, lastDate));
}

if (require.main === module) {
  main();
}
