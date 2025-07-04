'use client';

import { animated, to } from '@react-spring/web';
import Link from 'next/link';
import type { Locale } from '../app/i18n-config';
import useMaterial from '../hooks/useMaterial';

const transFooter = (x: number, y: number) => {
  return `translateZ(20px) perspective(60vmin) rotateX(${
    4 * (y - 1)
  }deg) rotateY(${15 * (x - 1)}deg)`;
};

export default function DocumentsNavigation({ locale }: { locale: Locale }) {
  const { props, onMouseMove, onMouseLeave } = useMaterial([-0.9, -0.9], {
    mass: 1,
    tension: 450,
    friction: 60,
  });

  return (
    <animated.nav
      className="contact belowMd:transform-none! fixed right-6 bottom-4 z-50 flex transform-gpu flex-col self-end rounded-full bg-linear-to-tl from-amber-500 to-yellow-300 px-6 font-inline text-amber-50 text-xl shadow-lg hover:from-amber-400 hover:to-yellow-300 dark:from-amber-800 dark:to-yellow-500"
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{ transform: to(props.xy, transFooter) }}
    >
      <Link
        className="pt-7 hover:text-teal-500 dark:hover:text-amber-900"
        href={`/${locale}/cv`}
        prefetch={false}
      >
        CV
      </Link>
      <Link
        className="pb-7 hover:text-fuchsia-500 dark:hover:text-amber-900"
        href={`/${locale}/skill-profile`}
        prefetch={false}
      >
        skill
        <br />
        profile
      </Link>
    </animated.nav>
  );
}
