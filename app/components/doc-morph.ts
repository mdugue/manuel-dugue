/** View-transition names shared by a document card on the home page and the
 *  sheet it opens into. Only one side may carry a name at a time, so the card
 *  drops its names while its document is open (see `DocCard`). */
export const docSheetName = (slug: string) => `doc-sheet-${slug}`;
export const docTitleName = (slug: string) => `doc-title-${slug}`;
