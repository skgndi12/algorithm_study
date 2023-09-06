const findMin = (keymap, target) => {
  const validKeymap = new Map();

  let acc = 0;
  for (const cur of target) {
    if (!validKeymap.has(cur)) {
      const indexes = keymap.map(key => key.indexOf(cur)).filter(x => x !== -1);

      if (indexes.length) validKeymap.set(cur, Math.min(...indexes) + 1);
      else return -1;
    }

    acc += validKeymap.get(cur);
  }

  return acc;
};

function solution(keymap, targets) {
  const keymapArr = keymap.map(v => v.split(''));

  return targets.map(target => findMin(keymapArr, target.split('')));
}
