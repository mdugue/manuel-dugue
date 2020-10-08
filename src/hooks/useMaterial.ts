import { MouseEvent, useEffect } from "react";
import { SpringBaseProps, useSpring } from "react-spring";
import { useMedia } from "react-use";

export const largeBreakpoint = "768px";

const translate = (x: number, y: number, multiplier: number) =>
  `translate3d(${multiplier * x}vmin,${multiplier * y}vmin,0)`;

const trans1 = (x: number, y: number) =>
  `perspective(60vmin) rotateX(${3 * y}deg) rotateY(${-3 * x}deg) 
  ${translate(x, y, 0.5)}`;
const trans2 = (x: number, y: number) => translate(x, y, -1);
const trans3 = (x: number, y: number) => translate(x, y, -0.6);
const trans4 = (x: number, y: number) => translate(x, y, -0.4);

const slow = { mass: 10, tension: 200, friction: 50 };

export default function useMaterial(
    defaultPosition: [number, number],
    config: SpringBaseProps["config"]
  ) {
    const [props, set] = useSpring(() => ({
      xy: [0, 0],
      config,
    }));
    const isWide = useMedia(`(min-width: ${largeBreakpoint})`);
    useEffect(() => {
      set({ xy: isWide ? defaultPosition : [0, 0], config: slow });
    }, [isWide, set]);
  
    function onMouseMove(event: MouseEvent) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const relativeX = (2 * (event.clientX - rect.left)) / rect.width - 1;
      const relativeY = (2 * (event.clientY - rect.top)) / rect.height - 1;
      set({ xy: [relativeX, relativeY], config });
    }
  
    const onMouseLeave = () => set({ xy: defaultPosition });
    return { props, onMouseMove, onMouseLeave };
  }