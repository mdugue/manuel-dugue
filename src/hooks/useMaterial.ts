import { MouseEvent, useEffect } from "react";
import { SpringBaseProps, useSpring } from "react-spring";
import { useMedia } from "react-use";

const slow = { mass: 10, tension: 200, friction: 50 };

export default function useMaterial(
  defaultPosition: [x: number, y: number],
  config: SpringBaseProps["config"]
) {
  const [props, set] = useSpring<{ xy: [number, number] }>(() => ({
    xy: [0, 0] as [x: number, y: number],
    config,
  }));
  const isWide = useMedia(`(min-width: 768px)`);
  useEffect(() => {
    set({ xy: isWide ? defaultPosition : [0, 0], config: slow });
  }, [defaultPosition, isWide, set]);

  function onMouseMove(event: MouseEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const relativeX = (2 * (event.clientX - rect.left)) / rect.width - 1;
    const relativeY = (2 * (event.clientY - rect.top)) / rect.height - 1;
    set({ xy: [relativeX, relativeY], config });
  }

  const onMouseLeave = () => set({ xy: defaultPosition });
  return { props, onMouseMove, onMouseLeave };
}
