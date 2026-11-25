import type { Category } from "@/types/category";

export type CategoryRow = {
  category: Category;
  depth: number;
  siblings: Category[];
  index: number;
  childCount: number;
  totalProducts: number;
};

const bySortOrder = (a: Category, b: Category) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name);

export function categoryChildrenMap(categories: Category[]) {
  const ids = new Set(categories.map((category) => category.id));
  const map = new Map<string | null, Category[]>();

  categories.forEach((category) => {
    const parentId = category.parent && ids.has(category.parent.id) ? category.parent.id : null;
    map.set(parentId, [...(map.get(parentId) ?? []), category]);
  });
  map.forEach((list) => list.sort(bySortOrder));

  return map;
}

export function descendantIds(map: Map<string | null, Category[]>, id: string): string[] {
  return (map.get(id) ?? []).flatMap((child) => [child.id, ...descendantIds(map, child.id)]);
}

export function totalProducts(map: Map<string | null, Category[]>, category: Category): number {
  return category._count.products + (map.get(category.id) ?? []).reduce((sum, child) => sum + totalProducts(map, child), 0);
}

export function flattenCategories(
  map: Map<string | null, Category[]>,
  isOpen: (id: string) => boolean,
  matches: (category: Category) => boolean
): CategoryRow[] {
  const visible = (category: Category): boolean =>
    matches(category) || (map.get(category.id) ?? []).some(visible);

  const walk = (parentId: string | null, depth: number, parentMatched: boolean): CategoryRow[] => {
    const siblings = map.get(parentId) ?? [];
    return siblings.flatMap((category, index) => {
      if (!parentMatched && !visible(category)) return [];
      const children = map.get(category.id) ?? [];
      const row: CategoryRow = {
        category,
        depth,
        siblings,
        index,
        childCount: children.length,
        totalProducts: totalProducts(map, category),
      };
      const selfMatched = parentMatched || matches(category);
      return [row, ...(children.length && isOpen(category.id) ? walk(category.id, depth + 1, selfMatched) : [])];
    });
  };

  return walk(null, 0, false);
}

export function reorderSiblings(siblings: Category[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= siblings.length) return [];

  const order = [...siblings];
  [order[index], order[target]] = [order[target], order[index]];

  return order
    .map((category, position) => ({ id: category.id, sortOrder: position + 1, previous: category.sortOrder }))
    .filter((change) => change.sortOrder !== change.previous)
    .map(({ id, sortOrder }) => ({ id, sortOrder }));
}
