import Link from "next/link";
import { animated } from "react-spring";

import useMaterial from "../hooks/useMaterial";

const largeBreakpoint = "768px"; // TODO

const transFooter = (x: number, y: number) => {
  return `perspective(60vmin) rotateX(${4 * (y - 1)}deg) rotateY(${
    15 * (x - 1)
  }deg)`;
};
export default function ContactFooter() {
  const { props, onMouseMove, onMouseLeave } = useMaterial([-0.9, -0.9], {
    mass: 1,
    tension: 450,
    friction: 60,
  });

  return (
    <>
      <animated.footer
        className="bg-gradient-to-tr from-yellow-500 to-yellow-300 contact shadow-lg rounded-full text-yellow-50"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          // @ts-expect-error looks like I do not fully understands react-spring typings 🤔
          transform: props.xy?.interpolate(transFooter),
        }}
      >
        <Link href="/cv">
          <a className="hover:text-yellow-700">CV</a>
        </Link>
        <Link href="/skill-profile">
          <a className="hover:text-yellow-700">
            skill
            <br />
            profile
          </a>
        </Link>
      </animated.footer>
      <style jsx global>
        {`
          .contact {
            align-items: flex-end;
            bottom: -10vmax;
            display: flex;
            flex-direction: column;
            font-family: "Bungee Inline", "SF Mono", "Ubuntu Mono", Consolas,
              Menlo, monospace, "SF Mono", "Ubuntu Mono", Consolas, Menlo,
              monospace, cursive;
            font-size: 2vmax;
            height: 23vmax;
            position: fixed;
            right: -5vmax;
            text-align: right;
            width: 23vmax;
            will-change: transform;
          }

          .contact a {
            padding-right: 8vmax;
            width: 100%;
          }

          .contact a:first-child {
            padding-top: 4vmax;
          }

          .contact a:last-child {
            padding-bottom: 4vmax;
          }

          @media screen and (min-width: ${largeBreakpoint}) {
            .contact {
              bottom: -10vmin;
              font-size: 2vmin;
              height: 23vmin;
              right: -5vmin;
              width: 23vmin;
            }

            .contact a {
              padding-right: 8vmin;
            }

            .contact a:first-child {
              padding-top: 4vmin;
            }

            .contact a:last-child {
              padding-bottom: 4vmin;
            }
          }
        `}
      </style>
    </>
  );
}
