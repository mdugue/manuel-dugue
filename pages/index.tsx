import Head from "next/head";
import Link from "next/link";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { animated, SpringBaseProps, useSpring } from "react-spring";
import Typewriter from "typewriter-effect";

const translate = (x: number, y: number, multiplier: number) =>
  `translate3d(${multiplier * x}vmin,${multiplier * y}vmin,0)`;

const trans1 = (x: number, y: number) =>
  `perspective(60vmin) rotateX(${3 * y}deg) rotateY(${-3 * x}deg) 
  ${translate(x, y, 0.5)}`;
const trans2 = (x: number, y: number) => translate(x, y, -1);
const trans3 = (x: number, y: number) => translate(x, y, -0.6);
const trans4 = (x: number, y: number) => translate(x, y, -0.4);

const transFooter = (x: number, y: number) => {
  return `perspective(60vmin) rotateX(${4 * (y - 1)}deg) rotateY(${
    15 * (x - 1)
  }deg)`;
};

const transAside = (x: number, y: number) => {
  return `perspective(60vmin) rotateX(${10 * y}deg) rotateY(${-5 * x}deg) 
  ${translate(x, y, 0.25)}`;
};

function useMaterial(
  defaultPosition: [number, number],
  config: SpringBaseProps["config"]
) {
  const [props, set] = useSpring(() => ({
    xy: defaultPosition,
    config
  }));

  function onMouseMove(event: MouseEvent) {
    console.log(event.target, event.currentTarget, event);
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const relativeX = (2 * (event.clientX - rect.left)) / rect.width - 1;
    const relativeY = (2 * (event.clientY - rect.top)) / rect.height - 1;
    set({ xy: [relativeX, relativeY] });
  }

  const onMouseLeave = () => set({ xy: defaultPosition });
  return { props, onMouseMove, onMouseLeave };
}

function ClaimCard() {
  const [isHovered, setIsHovered] = useState(false);
  const { props, onMouseMove, onMouseLeave } = useMaterial([-0.9, -0.9], {
    mass: 5,
    tension: 350,
    friction: 40
  });
  const typewriterRef = useRef();
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
        transform: props.xy?.interpolate(trans1)
      }}
    >
      <div className="highlight-container">
        <animated.div
          className="highlight"
          style={{
            opacity: props.xy?.interpolate(
              (x, y) => 0.1 + (Math.abs(x) + Math.abs(y)) / 4
            ),
            left: props.xy?.interpolate(x => (x + 1) * 50 + "%"),
            top: props.xy?.interpolate((x, y) => (y + 1) * 50 + "%")
          }}
        />
      </div>
      <animated.small
        style={{
          display: "block",
          // @ts-expect-error
          transform: props.xy?.interpolate(trans3)
        }}
      >
        – since 2008 –
      </animated.small>
      <animated.h1
        style={{
          // @ts-expect-error
          transform: props.xy?.interpolate(trans2)
        }}
      >
        handcrafting web experiences for everybody
      </animated.h1>
      <animated.h2
        style={{
          // @ts-expect-error
          transform: props.xy?.interpolate(trans3)
        }}
      >
        <Typewriter
          options={{
            loop: true
          }}
          onInit={typewriter => {
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
      </animated.h2>
      {["BL", "BR", "TL", "TR"].map(dotLocation => (
        <animated.div
          key={dotLocation}
          className={`dot dot${dotLocation}`}
          style={{
            willChange: "transform",
            // @ts-expect-error
            transform: props.xy?.interpolate(trans4)
          }}
        />
      ))}
    </animated.hgroup>
  );
}

function Aside() {
  return (
    <aside>
      <div>Manuel Dugué</div>
      <a
        href="https://www.linkedin.com/in/manuel-dugue/"
        target="_blank"
        rel="noopener noreferer"
      >
        linkedin
      </a>
      <a
        href="https://twitter.com/mdugue"
        target="_blank"
        rel="noopener noreferer"
      >
        twitter
      </a>
      <a
        href="https://github.com/mdugue"
        target="_blank"
        rel="noopener noreferer"
      >
        github
      </a>
    </aside>
  );
}

function Footer() {
  const { props, onMouseMove, onMouseLeave } = useMaterial([-0.9, -0.9], {
    mass: 1,
    tension: 450,
    friction: 60
  });

  return (
    <animated.footer
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        // @ts-expect-error
        transform: props.xy?.interpolate(transFooter)
      }}
    >
      <Link href="/cv">
        <a>CV</a>
      </Link>
      <Link href="/skill-profile">
        <a>
          skill
          <br />
          profile
        </a>
      </Link>
    </animated.footer>
  );
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Manuel Dugué</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Hairline&family=Bungee+Inline&family=Bungee+Shade&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <ClaimCard />
      <Aside />
      <Footer />

      <style jsx global>{`
        :root {
          color-scheme: light dark;
          --colorBodyBackground: #f7f7f7;
          --colorBodyText: #fff;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --colorBodyBackground: #080808;
            --colorBodyText: #000;
          }
        }

        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        @media screen and (min-width: 768px) {
          .container {
            justify-content: space-between;
          }
        }

        hgroup {
          background: #cb6666;
          color: var(--colorBodyText);
          margin: 7vw 5vw;
          padding: 20vw 5vw;
          min-height: 55vh;
          will-change: transform;
        }

        @media screen and (min-width: 768px) {
          hgroup {
            margin: 10vh 0 0 10vw;
            min-height: initial;
            padding: 10vw;
            width: 66vw;
          }
        }

        small {
          font-size: max(1.5vmin, 1rem);
          font-family: "Bungee Hairline", cursive;
          font-weight: 700;
        }

        h1 {
          display: flex;
          flex-direction: column;
          font-family: "Bungee Inline", cursive;
          font-size: max(3vw, 2rem);
          font-weight: 400;
          margin: 0;
          padding-bottom: 2vmin;
        }

        h2 {
          font-family: "Bungee Inline", cursive;
          font-size: max(1.5vw, 1.25rem);
          font-weight: normal;
          margin-right: 2vw;
          margin-top: 2vw;
          will-change: transform;
        }

        @media screen and (min-width: 768px) {
          h1 {
            font-family: "Bungee Shade", cursive;
          }
        }

        @media screen and (min-width: 768px) {
          h2 {
            color: #f2de91;
            font-size: 1.5vw;
          }
        }

        .dot {
          background: var(--colorBodyBackground);
          border-radius: 100%;
          height: 4vmin;
          position: absolute;
          width: 4vmin;
        }
        .dotBR {
          bottom: -2vmin;
          right: -2vmin;
        }
        .dotBL {
          bottom: -2vmin;
          left: -2vmin;
        }
        .dotTR {
          right: -2vmin;
          top: -2vmin;
        }
        .dotTL {
          left: -2vmin;
          top: -2vmin;
        }

        aside {
          color: #e9c238;
          font-family: "Bungee Inline", cursive;
          font-size: 1.125rem;
          line-height: 1;
          padding: 2vh;
          text-align: center;
        }

        aside a {
          color: #206c5f;
          display: inline-block;
          font-family: "Bungee Hairline", cursive;
          font-weight: 700;
          padding: 1ch;
        }
        aside a:hover {
          font-family: "Bungee Inline", cursive;
          font-weight: normal;
        }

        footer {
          align-items: flex-end;
          background: #e9c238;
          border-radius: 100%;
          bottom: -10vmin;
          color: var(--colorBodyText);
          display: flex;
          flex-direction: column;
          font-family: "Bungee Inline", cursive;
          font-size: 2vmin;
          height: 23vmin;
          position: fixed;
          right: -5vmin;
          text-align: right;
          width: 23vmin;
          will-change: transform;
        }

        footer a {
          padding-right: 8vmin;
          width: 100%;
        }

        footer a:first-child {
          padding-top: 4vmin;
        }

        footer a:last-child {
          padding-bottom: 4vmin;
        }

        footer a:hover {
          color: #cb6666;
        }

        .highlight-container {
          bottom: 0;
          left: 0;
          overflow: hidden;
          position: absolute;
          right: 0;
          top: 0;
          zindex: -1;
        }

        .highlight {
          width: 30vmin;
          height: 30vmin;
          background: white;
          position: absolute;
          margin: -15vmin;
          filter: blur(40vmin);
          willchange: left, top;
          transform: translate3d(0, 0, 0);
        }

        html,
        body {
          background: var(--colorBodyBackground);
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          line-height: 1.25;
          overflow: hidden;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
