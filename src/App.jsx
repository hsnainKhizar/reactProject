import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const HER_NAME = "Mubeen";
const YES_IMAGE = "/mubeen-valentine.jpg"; // put this in /public

const NO_TEXTS = [
  "No",
  "Are you sure? 😳",
  "Think again… 💭",
  "Wait wait 😭",
  "Don’t break my heart 💔",
  "Pretty please? 🥺",
  "I’ll buy you snacks 🍫",
  "Last chance 😅",
  "Okay but… why? 😶",
  "You’re too cute to say no 😍",
];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Heart({ x, delay }) {
  const size = randomBetween(10, 22);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x, scale: 0.8 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [-20, -260],
        scale: [0.8, 1, 1.1, 1],
      }}
      transition={{ duration: 3.6, delay, ease: "easeOut" }}
      style={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: size,
        pointerEvents: "none",
        filter: "drop-shadow(0 10px 18px rgba(0,0,0,.15))",
      }}
    >
      💗
    </motion.div>
  );
}

function fireConfetti() {
  // A couple of bursts look nicer than one big one
  confetti({
    particleCount: 160,
    spread: 85,
    origin: { y: 0.68 },
  });
  confetti({
    particleCount: 120,
    spread: 120,
    origin: { y: 0.68 },
  });
}

export default function App() {
  const [accepted, setAccepted] = useState(false);

  // Start with "No" and a stable position.
  const [noPos, setNoPos] = useState({ x: 120, y: 10 });
  const [noIndex, setNoIndex] = useState(0);

  // Hearts
  const hearts = useMemo(() => Array.from({ length: 14 }, (_, i) => i), []);

  useEffect(() => {
    // IMPORTANT: do NOT call dodgeNo() here
    // We want initial text to be exactly "No".
    setNoPos({ x: 120, y: 10 });
  }, []);

  const dodgeNo = () => {
    const x = randomBetween(-130, 130);
    const y = randomBetween(-60, 80);
    setNoPos({ x, y });

    // Change the label only AFTER interaction
    setNoIndex((prev) => (prev + 1) % NO_TEXTS.length);
  };

  const handleYes = () => {
    setAccepted(true);
    fireConfetti();
  };

  return (
    <div style={styles.page}>
      <div style={styles.glowA} />
      <div style={styles.glowB} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={styles.card}
      >
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              style={{ width: "100%" }}
            >
              <motion.h1
                initial={{ scale: 0.98 }}
                animate={{ scale: [0.98, 1.02, 1] }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={styles.title}
              >
                {HER_NAME}, will you be my Valentine? 💘
              </motion.h1>

              <p style={styles.subtitle}>
                I made this little page just for you, <b>{HER_NAME}</b>.
                <br />
                (Pick wisely 😄)
              </p>

              <div style={styles.buttonsWrap}>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  style={styles.yesBtn}
                  onClick={handleYes}
                >
                  Yes 💖
                </motion.button>

                <motion.button
                  style={{ ...styles.noBtn }}
                  animate={{
                    x: noPos.x,
                    y: noPos.y,
                    rotate: randomBetween(-3, 3),
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 18 }}
                  onMouseEnter={dodgeNo}
                  onTouchStart={dodgeNo}
                  onClick={dodgeNo}
                  whileTap={{ scale: 0.98 }}
                >
                  {NO_TEXTS[noIndex]}
                </motion.button>
              </div>

              <div style={styles.footer}>
                <span style={{ opacity: 0.8 }}>Made with 💗 for {HER_NAME}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ width: "100%", textAlign: "center" }}
            >
              <motion.div
                animate={{ rotate: [0, -2, 2, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ fontSize: 52, marginBottom: 10 }}
              >
                🎉💞🎉
              </motion.div>

              <h1 style={styles.title}>YAYYYYY, {HER_NAME}! 💘</h1>
              <p style={styles.subtitle}>
                You just made me the happiest person 😌
                <br />
                {/* Now come here 👉👈 */}
              </p>

              {/* Beautiful image reveal */}
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={styles.imageCard}
              >
                <motion.img
                  src={YES_IMAGE}
                  alt="Valentine"
                  onError={(e) => {
                    console.log("Image failed to load:", YES_IMAGE);
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80";
                  }}
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  style={styles.image}
                />
                <div style={styles.imageCaption}>
                  <span>For {HER_NAME} 💗</span>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                style={{ ...styles.yesBtn, marginTop: 16 }}
                onClick={() => setAccepted(false)}
              >
                Replay 🔁
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* floating hearts */}
        <div style={styles.heartsLayer}>
          {hearts.map((i) => (
            <Heart key={i} x={randomBetween(-160, 160)} delay={i * 0.18} />
          ))}
        </div>
      </motion.div>

      <p style={styles.smallNote}>Tip: open on phone for maximum cute effect ✨</p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 20,
    background:
      "radial-gradient(1200px 800px at 10% 20%, rgba(255, 105, 180, 0.30), transparent 60%)," +
      "radial-gradient(900px 700px at 90% 30%, rgba(255, 0, 128, 0.25), transparent 55%)," +
      "linear-gradient(135deg, #0b1020, #120b1a)",
    color: "white",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    position: "relative",
    overflow: "hidden",
  },
  glowA: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: "50%",
    background: "rgba(255, 105, 180, 0.22)",
    filter: "blur(80px)",
    top: -120,
    left: -140,
  },
  glowB: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: "50%",
    background: "rgba(255, 0, 128, 0.18)",
    filter: "blur(90px)",
    bottom: -150,
    right: -150,
  },
  card: {
    width: "min(560px, 92vw)",
    padding: "26px 24px",
    borderRadius: 22,
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 20px 70px rgba(0,0,0,0.45)",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",
  },
  title: {
    fontSize: 34,
    lineHeight: 1.1,
    margin: 0,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 18,
    opacity: 0.9,
    lineHeight: 1.5,
  },
  buttonsWrap: {
    position: "relative",
    height: 160,
    borderRadius: 18,
    border: "1px dashed rgba(255,255,255,0.18)",
    background: "rgba(0,0,0,0.12)",
    overflow: "hidden",
    display: "grid",
    placeItems: "center",
  },
  yesBtn: {
    padding: "12px 18px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    color: "#1b0b14",
    background: "linear-gradient(90deg, #ff7ac8, #ffd1ea)",
    boxShadow: "0 14px 40px rgba(255, 122, 200, 0.25)",
  },
  noBtn: {
    position: "absolute",
    padding: "10px 14px",
    borderRadius: 999,
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.28)",
    background: "rgba(255,255,255,0.10)",
    color: "white",
    fontWeight: 600,
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "manipulation",
  },
  footer: {
    marginTop: 14,
    fontSize: 13,
    opacity: 0.85,
  },
  heartsLayer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  smallNote: {
    marginTop: 16,
    fontSize: 12,
    opacity: 0.75,
  },

  // Image styles
  imageCard: {
    marginTop: 14,
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(0,0,0,0.18)",
    boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  imageCaption: {
    padding: "10px 12px",
    fontSize: 13,
    opacity: 0.9,
    borderTop: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
  },
};
