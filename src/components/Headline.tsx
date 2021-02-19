import { ComponentProps } from "react";
import { animated } from "react-spring";
export default function Headline(props: ComponentProps<typeof animated.h1>) {
  const { children, style, ...rest } = props;
  return (
    <animated.h1
      {...rest}
      className="mb-8 text-3xl lg:text-5xl leading-tight lg:leading-tight"
      style={{ ...style }}
    >
      <div
        className="absolute font-shade text-gradient bg-gradient-to-tr from-teal-600 to-teal-500"
        style={{ transform: "translateX(-0.12em)" }}
      >
        {children}
      </div>
      <div className="font-inline transform" style={{ letterSpacing: "0.1em" }}>
        {children}
      </div>
    </animated.h1>
  );
}
