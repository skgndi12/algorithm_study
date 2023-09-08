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
  getLength = () => this.heap.length - 1;
  isEmpty = () => this.getLength() <= 0;
  root = () => this.peek() && this.peek().value;
}

const timeResolutionToMin = HHMM => {
  const [hour, min] = HHMM.split(':').map(Number);

  return hour * 60 + min;
};

const addCleaningTime = transformedTime => transformedTime + 10;

function solution(HHMMs) {
  const bookTimes = HHMMs.map(HHMM => HHMM.map(timeResolutionToMin));
  for (const bookTime of bookTimes) {
    bookTime[1] += 10;
  }

  bookTimes.sort((a, b) => a[0] - b[0]);

  const occupied = new PriorityQueue();

  let maxCount = 0;

  for (const bookTime of bookTimes) {
    if (occupied.root() && occupied.root() <= bookTime[0]) occupied.dequeue();

    occupied.enqueue(bookTime[1], bookTime[1]);
    maxCount = Math.max(occupied.getLength(), maxCount);
  }

  return maxCount;
}

const TC = [
  [
    ['15:00', '17:00'],
    ['16:40', '18:20'],
    ['14:20', '15:20'],
    ['14:10', '19:20'],
    ['18:20', '21:20'],
  ],
  [
    ['09:10', '10:10'],
    ['10:20', '12:20'],
  ],
  [
    ['10:20', '12:30'],
    ['10:20', '12:30'],
    ['10:20', '12:30'],
  ],
];

TC.forEach(tc => console.log(solution(tc)));
// console.log(solution(TC[0]));
