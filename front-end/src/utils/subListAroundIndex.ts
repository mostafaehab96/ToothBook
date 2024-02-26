function createSublistAroundIndex(list: number[], num: number): number[] {
  const sublistEnd =
    num === 1
      ? Math.min(list.length - 1, num + 2)
      : Math.min(list.length - 1, num + 1);
  const sublistStart =
    sublistEnd >= list.length - 2
      ? Math.max(0, sublistEnd - 3)
      : Math.max(0, num - 2);

  return list.slice(sublistStart, sublistEnd + 1);
}

export default createSublistAroundIndex;
