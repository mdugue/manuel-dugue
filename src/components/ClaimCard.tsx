import { useEffect, useRef, useState } from "react";
import { animated, interpolate } from "react-spring";
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

export default function ClaimCard() {
  const [isHovered, setIsHovered] = useState(false);
  const {
    props: { xy },
    onMouseMove,
    onMouseLeave,
  } = useMaterial([-0.9, -0.9], {
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
        transform: interpolate(xy, trans1),
      }}
      className="bg-gradient-to-tr from-teal-400 to-green-300 text-white px-24 py-12 rounded-3xl shadow-xl self-start mt-20 ml-20"
    >
      <div className="inset-0 absolute overflow-hidden">
        <animated.div
          className="bg-teal-100 opacity-75 absolute top-1/4 left-1/4 w-1/2 h-1/2"
          style={{
            zIndex: -1,
            filter: "blur(100px)",
            transform: interpolate(
              xy,
              (x, y) => `translate3d(${x * 75 + "%"}, ${y * 75 + "%"}, 0)`
            ),
          }}
        />
      </div>
      <animated.small
        className="font-display text-lg text-teal-400"
        style={{ transform: interpolate(xy, trans3) }}
      >
        – since 2008 –
      </animated.small>
      <Headline style={{ transform: interpolate(xy, trans2) }}>
        handcrafting <br />
        web experiences <br />
        for everybody
      </Headline>
      <animated.h2
        className="font-inline text-gradient text-lg bg-gradient-to-tr from-yellow-50 to-yellow-200"
        style={{
          transform: interpolate(xy, trans3),
        }}
      >
        <Typewriter
          options={{
            loop: true,
          }}
          onInit={(typewriter) => {
            (typewriterRef.current = typewriter)
              .typeString("consumers, experts, bots, ...")
              // @ts-expect-error ts definition does not seem complete yet
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
    </animated.hgroup>
  );
}
