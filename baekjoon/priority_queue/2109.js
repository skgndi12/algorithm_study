class maxHeap {
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
    this.maxHeapifyUp();
  };

  maxHeapifyUp() {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];

    while (index > 1) {
      const parentIndex = this.getParentIndex(index);

      if (this.heap[parentIndex].key < lastInsertedNode.key) {
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
      this.maxHeapifyDown();
    }

    return rootNode;
  };

  maxHeapifyDown = () => {
    let index = 1;
    const count = this.heap.length;
    const rootNode = this.heap[index];

    while (this.getLeftChildIndex(index) > count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      const smallerChildIndex =
        rightChildIndex < count && this.heap[rightChildIndex].key > this.heap[leftChildIndex].key
          ? rightChildIndex
          : leftChildIndex;

      if (this.heap[smallerChildIndex].key >= rootNode.key) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;
    }

    this.heap[index] = rootNode;
  };
}

class PriorityQueue extends maxHeap {
  constructor() {
    super();
  }

  enqueue = (priority, value) => this.heappush(priority, value);
  dequeue = () => this.heappop();
  isEmpty = () => this.heap.length <= 1;
  root = () => this.peek() && this.peek().value;
}

//  40 1

//  30 2
//  50 2

const solution = (n, queue) => {
  let date = 1;
};

function main() {
  const fs = require('fs');
  const [n, ...arr] = fs
    .readFileSync('./baekjoon/priority_queue/2109.txt')
    .toString()
    .trim()
    .split('\n')
    .map(v => v.split(' ').map(Number));

  const classeMap = new Map();

  for (classe of arr) {
    const [payment, deadLine] = classe;

    if (!classeMap.has(deadLine)) classeMap.set(deadLine, new PriorityQueue());
    classeMap.get(deadLine).enqueue(payment, payment);
  }

  const classeQueue = new PriorityQueue();
  for (const [deadline, classesPerDeadline] of classeMap) {
    classeQueue.enqueue(-deadline, classesPerDeadline);
  }

  console.log(solution(n[0], classeQueue));
}

if (require.main === module) {
  main();
}
