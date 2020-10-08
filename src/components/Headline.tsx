import { CSSProperties } from "react";
import { animated } from "react-spring";
export default function Headline(props: {
  children: string;
  style?: CSSProperties;
}) {
  const { children, style } = props;
  return (
    <>
      <animated.h1 style={style} className="title">
        {children}
      </animated.h1>
      <style jsx global>{`
        .title {
          display: flex;
          flex-direction: column;
          font-family: "Bungee Inline", "SF Mono", "Ubuntu Mono", Consolas,
            Menlo, monospace, cursive;
          font-size: max(3vw, 2rem);
          font-weight: 400;
          margin: 0 0 2vh;
          letter-spacing: 0.1em;
        }

        .title::before {
          position: absolute;
          font-family: "Bungee Shade", "SF Mono", "Ubuntu Mono", Consolas, Menlo,
            monospace, cursive;
          content: "${children}";
          color: #d68585;
          z-index: -1;
          letter-spacing: 0em;
          transform: translateX(-0.12em);
        }
      `}</style>
    </>
  );
}
