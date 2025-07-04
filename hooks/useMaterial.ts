import { type SpringProps, useSpring } from '@react-spring/web';
import { type MouseEvent, useCallback, useEffect } from 'react';
import { useMedia } from 'react-use';

import usePrefersReducedMotion from './usePrefersReducedMotion';

const slow = { mass: 10, tension: 200, friction: 50 };

export default function useMaterial(
  defaultPosition: [x: number, y: number],
  config: SpringProps['config']
) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [props, api] = useSpring<{ xy: [number, number] }>(
    () => ({
      xy: [0, 0] as [x: number, y: number],
      config,
    }),
    []
  );
  const isWide = useMedia('(min-width: 768px)', false);
  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    api.start({ xy: isWide ? defaultPosition : [0, 0], config: slow });
  }, [defaultPosition, isWide, prefersReducedMotion, api]);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (prefersReducedMotion) {
        return;
      }
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const relativeX = (2 * (event.clientX - rect.left)) / rect.width - 1;
      const relativeY = (2 * (event.clientY - rect.top)) / rect.height - 1;
      api.start({ xy: [relativeX, relativeY] });
    },
    [prefersReducedMotion, api]
  );

  const onMouseLeave = useCallback(() => {
    if (prefersReducedMotion) {
      return;
    }
    api.start({ xy: defaultPosition });
  }, [defaultPosition, prefersReducedMotion, api]);
  return { props, onMouseMove, onMouseLeave };
}
