/**
 * Added Layout component to wrap all pages. This seems to avoid re-rendering the page when
 * navigating between sub-pages, such as opening sheets
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
