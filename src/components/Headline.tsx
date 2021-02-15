import { ComponentProps } from "react";
import { animated } from "react-spring";
export default function Headline(
  props: { children: string } & ComponentProps<typeof animated.h1>
) {
  const { children, style, ...rest } = props;
  return (
    <animated.h1
      {...rest}
      className="mb-8"
      style={{ fontSize: "max(3vw, 2rem)", ...style }}
    >
      <div className="absolute font-shade text-gradient bg-gradient-to-tr from-teal-600 to-teal-500">
        {children}
      </div>
      <div
        className="font-inline transform translate-x-1.5"
        style={{ letterSpacing: "0.1em" }}
      >
        {children}
      </div>
    </animated.h1>
  );
}
