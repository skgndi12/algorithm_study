function solution(clothes) {
  const closet = new Map();

  clothes.forEach(([_, type]) => {
    if (!closet.has(type)) closet.set(type, 0);

    closet.set(type, closet.get(type) + 1);
  });

  const ans = [...closet.values()].reduce((acc, cur) => acc * (cur + 1), 1) - 1;

  return ans;
}
