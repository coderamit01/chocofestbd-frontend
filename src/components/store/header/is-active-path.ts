export function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return href === "/";
  const path = href.split("?")[0];
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
}
