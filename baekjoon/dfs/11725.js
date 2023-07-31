class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.size += 1;
  }

  dequeue() {
    if (!this.head) {
      return false;
    }

    const data = this.head.data;

    this.head = this.head.next;
    this.size -= 1;

    return data;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const fs = require('fs');
const inputs = fs.readFileSync('./baekjoon/data_structure/11725.txt').toString().trim().split('\n');

const N = +inputs[0];
const tree = new Array(N + 1).fill([]);
for (let i = 1; i < N; i++) {
  const [v, u] = inputs[i].split(' ');

  tree[+v] = [...tree[+v], +u];
  tree[+u] = [...tree[+u], +v];
}

// const queue = new Queue();
// queue.enqueue(1);
const stack = [];
stack.push(1);

const ret = [];

// while (!queue.isEmpty()) {
while (stack.length > 0) {
  // const v = queue.dequeue();
  const v = stack.pop();

  tree[v].forEach(u => {
    if (!!ret[u]) return;

    ret[u] = v;
    stack.push(u);
    // queue.enqueue(u);
  });
}

for (let i = 2; i < ret.length; i++) console.log(ret[i]);

// let visited = Array.from(Array(N + 1).fill(0));
// let parent = Array.from(Array(N + 1).fill(0));

// let stack = [1];
// visited[1] = 1;

// while (stack.length > 0) {
//   let src = stack.pop();
//   for (let dest of tree[src]) {
//     if (visited[dest] === 0) {
//       parent[dest] = src;
//       stack.push(dest);
//       visited[dest] = 1;
//     }
//   }
// }

// console.log(parent.slice(2).join('\n'));

// TODO: 주석의 풀이와 시간복잡도 비교
