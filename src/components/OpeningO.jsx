// PinnedWordRevealPage.jsx
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PinnedWordRevealPage() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);

  // Your sentence (edit freely)
  const sentence =
    "The foundation of AI automation—transforming unstructured documents into machine-actionable data across your enterprise.";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // collect word nodes
      const words = wordsRef.current.filter(Boolean);
      if (!words.length) return;

      // ensure starting state (no movement, only opacity)
      gsap.set(words, { opacity: 0.1 });

      // timeline that fades words in with stagger (no y/scale/rotation)
      const tl = gsap.timeline().to(words, {
        opacity: 1,
        stagger: 0.22,           // reveal gap between words
        duration: 0.4,           // fade duration per word
        ease: "power1.out",
      });

      // pin the section for the whole animation,
      // and scrub so opacity follows scroll
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        animation: tl,
        start: "top top",
        end: "+=" + words.length * 50, // pin length based on word count
        pin: true,          // lock the screen to this section
        scrub: true,        // tie progress to scroll for smoothness
        markers: false,
        anticipatePin: 1,
      });

      return () => {
        st.kill();
        tl.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="page">
      <style>{`
        /* Page base */
        .page {
          min-height: 100vh;
          background: #ffffff;            /* white bg (prevents "black screen") */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6vh 5vw;
          box-sizing: border-box;
        }

        /* Text box */
        .hero-wrap {
          max-width: 1100px;
          width: 100%;
        }

        .headline {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
            Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji",
            "Segoe UI Emoji";
          font-size: 44px;
    line-height: 1.3;
    color: #333333;
    font-weight: 400;
          text-align: center;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Keep words inline but targetable */
        .headline .word {
          display: inline-block;  /* required for GSAP to target each word cleanly */
          opacity: 0;             /* initial state (also set via gsap.set for safety) */
          will-change: opacity;   /* hint for smoother fade */
          margin-right: 10px;
        }

        /* Optional subtle color accents */
        .muted { color:rgba(75, 85, 99, 0.61); }
        .highlight { color: #4169e1; }
      `}</style>

      <div className="hero-wrap">
        <h1 className="headline" aria-label={sentence}>
          {sentence.split(" ").map((w, i) => (
            <span
              key={i}
              className={`word${
                // simple example: tint a few words if you like (optional)
                [" foundation ", "automation—", "unstructured", "documents", "machine-actionable", "data"].includes(
                  w.replace(/[^\w-—]/g, "")
                )
                  ? " highlight"
                  : ""
                }`}
              ref={(el) => (wordsRef.current[i] = el)}
            >
              {w}
              {i < sentence.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
