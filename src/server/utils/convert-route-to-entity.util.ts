const mapping: Record<string, string> = {
  comments: 'comment',
  organizations: 'organization',
  snippets: 'snippet',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
