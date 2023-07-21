const fs = require('fs');
const input = fs.readFileSync('./baekjoon/data_structure/5547.txt').toString().trim().split('\n');

const [W, H] = input[0].split(' ').map(v => +v);
const graph = Array(H).fill([]);

for (let i = 0; i < graph.length; i++) graph[i] = new Array(W).fill(0);

input.splice(1).forEach((row, i) => row.split(' ').forEach((col, j) => (graph[+i][+j] = col)));

// TODO: 주어진 영억에서 padding 한줄 추가 후 bfs 수행
