export type Item = {
  id: string
  title: string
  summary: string
  body: string
}

export const items: readonly Item[] = [
  {
    id: 'parallel-routes',
    title: 'Parallel Routes',
    summary: 'Render multiple pages in the same layout, navigated independently.',
    body: 'Parallel routes are defined with the @folder convention. They are passed to the parent layout as named props alongside children, enabling slot-based UI like dashboards, tab groups, and modal overlays.',
  },
  {
    id: 'intercepting-routes',
    title: 'Intercepting Routes',
    summary: 'Load a route from elsewhere in the app within the current layout.',
    body: 'The (.), (..), and (...) folder prefixes match segments at the same level, one above, and from the app root, respectively. Combined with parallel routes, they let you mask a real URL behind a modal during soft navigation while keeping the destination page available on hard navigation.',
  },
  {
    id: 'url-driven-modals',
    title: 'URL-driven Modals',
    summary: 'Shareable, refreshable, browser-back-aware overlays.',
    body: 'When modal state lives in the URL, deep links and refreshes work, the back button closes the overlay, and forward navigation reopens it — all without bespoke state management.',
  },
] as const

export function getItem(id: string): Item | undefined {
  return items.find((item) => item.id === id)
}
