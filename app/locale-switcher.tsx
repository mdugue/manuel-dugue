'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n, type Locale } from '../app/i18n-config';

export default function LocaleSwitcher(props: {
  className?: string;
  currentLocale: Locale;
}) {
  const { currentLocale } = props;
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) {
      return '/';
    }
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div>
      <ul className={props.className}>
        {i18n.locales.map((locale) => {
          return (
            <li key={locale}>
              <Link
                className={`${
                  currentLocale === locale
                    ? 'text-teal-500'
                    : 'hover:text-gray-400'
                }`}
                href={redirectedPathName(locale)}
              >
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
