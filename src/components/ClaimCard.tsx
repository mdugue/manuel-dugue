import { useEffect, useRef, useState } from "react";
import { animated } from "react-spring";
// @ts-expect-error
import Typewriter from "typewriter-effect";
import useMaterial from "../hooks/useMaterial";
import Headline from "./Headline";

const translate = (x: number, y: number, multiplier: number) =>
  `translate3d(${multiplier * x}vmin,${multiplier * y}vmin,0)`;

const trans1 = (x: number, y: number) =>
  `perspective(60vmin) rotateX(${3 * y}deg) rotateY(${-3 * x}deg) 
  ${translate(x, y, 0.5)}`;
const trans2 = (x: number, y: number) => translate(x, y, -1);
const trans3 = (x: number, y: number) => translate(x, y, -0.6);
const trans4 = (x: number, y: number) => translate(x, y, -0.4);

export const largeBreakpoint = "768px";

export default function ClaimCard() {
  const [isHovered, setIsHovered] = useState(false);
  const { props, onMouseMove, onMouseLeave } = useMaterial([-0.9, -0.9], {
    mass: 5,
    tension: 350,
    friction: 40,
  });
  const typewriterRef = useRef<{ pause: () => void; start: () => void }>();
  useEffect(() => {
    if (isHovered) {
      typewriterRef.current?.pause();
    } else {
      typewriterRef.current?.start();
    }
  }, [isHovered]);

  return (
    <animated.hgroup
      onMouseMove={onMouseMove}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave();
      }}
      style={{
        // @ts-expect-error
        transform: props.xy?.interpolate(trans1),
      }}
    >
      <div className="highlight-container">
        <animated.div
          className="highlight"
          style={{
            opacity: props.xy?.interpolate(
              // @ts-expect-error
              (x: number, y: number) => 0.1 + (Math.abs(x) + Math.abs(y)) / 4
            ),
            // @ts-expect-error
            left: props.xy?.interpolate((x) => (x + 1) * 50 + "%"),
            // @ts-expect-error
            top: props.xy?.interpolate((x, y) => (y + 1) * 50 + "%"),
          }}
        />
      </div>
      <animated.small
        style={{
          display: "block",
          // @ts-expect-error
          transform: props.xy?.interpolate(trans3),
        }}
      >
        – since 2008 –
      </animated.small>
      <Headline
        style={{
          // @ts-expect-error
          transform: props.xy?.interpolate(trans2),
        }}
      >
        handcrafting web experiences for everybody
      </Headline>
      <animated.h2
        className="tagline"
        style={{
          // @ts-expect-error
          transform: props.xy?.interpolate(trans3),
        }}
      >
        <Typewriter
          options={{
            loop: true,
          }}
          onInit={(typewriter) => {
            (typewriterRef.current = typewriter)
              .typeString("consumers, experts, bots, ...")
              .changeCursor(" ")
              .pauseFor(2500)
              .changeCursor("|")
              .deleteAll()
              .typeString("React, GraphQL, A11Y, ...")
              .changeCursor(" ")
              .pauseFor(2500)
              .changeCursor("|")
              .deleteAll()
              .typeString("teaching, analyzing, coding, ...")
              .changeCursor(" ")
              .pauseFor(2500)
              .changeCursor("|")
              .deleteAll()
              .typeString("arctic code vault contributer")
              .changeCursor(" ")
              .pauseFor(2500)
              .changeCursor("|")
              .deleteAll()
              .start();
          }}
        />
        <noscript>
          consumers, experts, bots <br />
          React, GraphQL, A11Y <br />
          teaching, analyzing, coding <br />
          arctic code vault contributer <br />
        </noscript>
      </animated.h2>
      {["BL", "BR", "TL", "TR"].map((dotLocation) => (
        <animated.div
          key={dotLocation}
          className={`dot dot${dotLocation}`}
          style={{
            willChange: "transform",
            // @ts-expect-error
            transform: props.xy?.interpolate(trans4),
          }}
        />
      ))}
    </animated.hgroup>
  );
}
