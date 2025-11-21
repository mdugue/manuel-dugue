import Link from "next/link";
import { i18n, type Locale } from "../app/i18n-config";

export default function LocaleSwitcher(props: {
	className?: string;
	currentLocale: Locale;
}) {
	const { currentLocale } = props;

	return (
		<div>
			<ul className={props.className}>
				{i18n.locales.map((locale) => (
					<li key={locale}>
						<Link
							className={`${
								currentLocale === locale
									? "text-teal-500"
									: "hover:text-gray-400"
							}`}
							href={`/${locale}`}
						>
							{locale}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
