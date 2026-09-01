const WORKSPACE_PREFIXES = ['/dashboard', '/submit', '/members', '/admin'];

export function isWorkspaceRoute(pathname: string): boolean {
  return WORKSPACE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
