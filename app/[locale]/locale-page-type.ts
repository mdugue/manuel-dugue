export type LocalePageType<Params extends object = object> = {
        params: Promise<{ locale: string } & Params>;
};
