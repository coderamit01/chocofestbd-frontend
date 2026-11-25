export type SortOrderChange = { id: string; sortOrder: number };

export function moveInSortOrder<T extends { id: string; sortOrder: number }>(items: T[], index: number, direction: -1 | 1): SortOrderChange[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return [];

  const order = [...items];
  [order[index], order[target]] = [order[target], order[index]];

  return order
    .map((item, position) => ({ id: item.id, sortOrder: position + 1, previous: item.sortOrder }))
    .filter((change) => change.sortOrder !== change.previous)
    .map(({ id, sortOrder }) => ({ id, sortOrder }));
}

export const nextSortOrder = (items: { sortOrder: number }[]) => items.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1;
