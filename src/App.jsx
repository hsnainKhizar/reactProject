import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";

const HER_NAME = "Mubeen";
const YOUR_NAME = "Hussnain";

// ============================================================
// NEW YORK TIMEZONE COUNTDOWN 🗽
// ============================================================
function getNYTime() {
  return new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
}

function getNYDate() {
  return new Date(getNYTime());
}

function getCountdownTarget() {
  return new Date("2026-06-26T00:00:00-04:00");
}

function formatCountdown(ms) {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isReady: true };
  
  const total = ms;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, isReady: false };
}

// ============================================================
// 26 REASONS I LOVE YOU 💗
// ============================================================
const REASONS_26 = [
  { emoji: "✨", text: "You shine brighter than any star in the night sky." },
  { emoji: "🌸", text: "Your presence is like a spring breeze — soft and full of life." },
  { emoji: "💫", text: "You're the main character of my favorite story." },
  { emoji: "🌙", text: "Even the moon is jealous of your glow." },
  { emoji: "🎀", text: "You're the cutest person I've ever known — inside and out." },
  { emoji: "💗", text: "Your heart is pure gold. You care so deeply." },
  { emoji: "🌟", text: "You're destined for amazing things — I just know it." },
  { emoji: "🌺", text: "Your beauty is breathtaking — like a flower in full bloom." },
  { emoji: "🦋", text: "You're constantly growing and becoming even more beautiful." },
  { emoji: "💎", text: "You're rare, precious, and absolutely irreplaceable." },
  { emoji: "🌈", text: "You bring color to my world — even from far away." },
  { emoji: "🎵", text: "Your voice is my favorite melody." },
  { emoji: "📖", text: "Your story is inspiring — and I'm honored to be part of it." },
  { emoji: "🌅", text: "You make every day worth waking up for." },
  { emoji: "💭", text: "I dream about you more than you'll ever know." },
  { emoji: "🌊", text: "Your strength is like the ocean — deep and powerful." },
  { emoji: "🔥", text: "You have a fire in you that can move mountains." },
  { emoji: "🕊️", text: "You bring peace to everyone around you." },
  { emoji: "💖", text: "You love with your whole heart — and I feel so lucky." },
  { emoji: "🎨", text: "You make the world more beautiful just by being in it." },
  { emoji: "🌻", text: "You spread happiness wherever you go." },
  { emoji: "⭐", text: "You're a star — bright, unique, and unforgettable." },
  { emoji: "💕", text: "You're everything I ever wished for and more." },
  { emoji: "🌸", text: "You're perfectly, wonderfully, beautifully you." },
  { emoji: "✨", text: "You deserve the entire universe — today and always." },
  { emoji: "♾️", text: "My love for you crosses any distance — always and forever." },
];

// ============================================================
// 26 MOMENTS I WISH WE COULD SHARE 💫
// ============================================================
const MOMENTS_26 = [
  { emoji: "🌅", text: "Watch the sunrise together, wrapped in a blanket." },
  { emoji: "☕", text: "Have lazy Sunday mornings with coffee and conversation." },
  { emoji: "🌸", text: "Walk through a park full of cherry blossoms." },
  { emoji: "🌊", text: "Sit on the beach and listen to the waves." },
  { emoji: "🎵", text: "Dance in the kitchen while cooking dinner." },
  { emoji: "🌙", text: "Stargaze and make wishes on shooting stars." },
  { emoji: "📚", text: "Read books together in comfortable silence." },
  { emoji: "🍜", text: "Share a bowl of ramen on a rainy day." },
  { emoji: "🎨", text: "Paint or draw together — even if we're terrible at it." },
  { emoji: "🎬", text: "Watch movies and fall asleep on the couch." },
  { emoji: "🌧️", text: "Walk in the rain without an umbrella." },
  { emoji: "🎂", text: "Bake something sweet and make a mess in the kitchen." },
  { emoji: "🌻", text: "Visit a sunflower field and take a thousand photos." },
  { emoji: "🎮", text: "Play video games and laugh at each other." },
  { emoji: "📸", text: "Take polaroid pictures everywhere we go." },
  { emoji: "🎄", text: "Decorate for Christmas with hot chocolate." },
  { emoji: "🌺", text: "Explore a new city with no plans, just us." },
  { emoji: "🎭", text: "Go to a theater and watch a play." },
  { emoji: "🍕", text: "Order pizza and eat it in bed." },
  { emoji: "🎡", text: "Ride a Ferris wheel at sunset." },
  { emoji: "🌸", text: "Have a picnic in a meadow full of flowers." },
  { emoji: "🎵", text: "Go to a concert and sing along badly." },
  { emoji: "🌊", text: "Watch the sunset over the ocean." },
  { emoji: "💫", text: "Make a wish together on a shooting star." },
  { emoji: "🏠", text: "Build a home filled with love and laughter." },
  { emoji: "♾️", text: "Grow old together — still holding hands." },
];

// ============================================================
// DISTANCE MESSAGES
// ============================================================
const DISTANCE_MESSAGES = [
  "Distance means nothing when someone means everything. 💫",
  "We're miles apart, but our hearts beat in perfect sync. 💗",
  "Every day apart is one day closer to being together again. 🌅",
  "You're always with me — in every thought, every dream. ✨",
  "The universe brought us together — distance is just a test. 🌌",
  "I feel you with me, even when we're far apart. 🌙",
  "Our love is stronger than any distance. Always. 💪💖",
  "Counting the days until I can hold you again. 🤗",
  "You're my home — no matter how many miles away. 🏡",
  "Distance makes the heart grow fonder — and mine is SO fond of you. 💕",
];

// ============================================================
// COMPONENTS
// ============================================================

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fireConfettiSoft() {
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
  confetti({ particleCount: 70, spread: 100, origin: { y: 0.7 } });
}

function fireConfettiBig() {
  confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
  setTimeout(() => confetti({ particleCount: 120, spread: 120, origin: { y: 0.6 } }), 200);
  setTimeout(() => confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } }), 400);
}

// 🌟 Shooting Star
function ShootingStar() {
  return (
    <motion.div
      initial={{ x: -100, y: -100, opacity: 0 }}
      animate={{
        x: ["-100px", "calc(100vw + 100px)"],
        y: ["-100px", "calc(100vh + 100px)"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: randomBetween(6, 12),
        delay: randomBetween(0, 8),
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        position: "fixed",
        zIndex: 0,
        pointerEvents: "none",
        fontSize: 20,
      }}
    >
      ✨
    </motion.div>
  );
}

// 🎋 Floating Lantern
function FloatingLantern({ delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: "100vh", x: randomBetween(-200, 200) }}
      animate={{
        opacity: [0, 1, 0.8, 1, 0],
        y: ["100vh", "-20vh"],
        x: [randomBetween(-200, 200), randomBetween(-300, 300)],
      }}
      transition={{
        duration: randomBetween(15, 25),
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        position: "fixed",
        zIndex: 0,
        pointerEvents: "none",
        fontSize: 28,
        left: "50%",
        filter: "drop-shadow(0 0 20px rgba(255, 200, 100, 0.3))",
      }}
    >
      🏮
    </motion.div>
  );
}

// ✨ Sparkle
function Sparkle({ delay, x, y }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0.5, 0],
        opacity: [0, 1, 0.5, 0],
      }}
      transition={{
        duration: randomBetween(2, 4),
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "fixed",
        zIndex: 0,
        pointerEvents: "none",
        fontSize: randomBetween(8, 14),
        left: x,
        top: y,
        filter: "blur(0.5px)",
      }}
    >
      ✦
    </motion.div>
  );
}

// 💕 Floating Heart
function FloatingHeart({ delay, x }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x, scale: 0.8 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [30, -280],
        scale: [0.8, 1, 1.1, 1],
        x: [x, x + randomBetween(-30, 30)],
      }}
      transition={{ duration: 4.5, delay, repeat: Infinity, ease: "easeOut" }}
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: randomBetween(16, 28),
        pointerEvents: "none",
        zIndex: 1,
        filter: "drop-shadow(0 0 20px rgba(255, 105, 180, 0.2))",
      }}
    >
      💕
    </motion.div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [scene, setScene] = useState(0);
  const [visibleReasons, setVisibleReasons] = useState(6);
  const [visibleMoments, setVisibleMoments] = useState(6);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isReady: false });
  const [nyTime, setNyTime] = useState("");
  const [ukTime, setUkTime] = useState("");
  const [isBirthdayReady, setIsBirthdayReady] = useState(false);
  const [birthdayBurstDone, setBirthdayBurstDone] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState(null);

  // Update countdown and times every second
  useEffect(() => {
    const updateTimer = () => {
      const target = getCountdownTarget();
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      
      const countdownData = formatCountdown(diff);
      setCountdown(countdownData);
      
      if (diff <= 0 && !isBirthdayReady) {
        setIsBirthdayReady(true);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isReady: true });
        fireConfettiBig();
        setTimeout(() => fireConfettiBig(), 500);
      }
      
      const nyNow = new Date(getNYTime());
      setNyTime(nyNow.toLocaleTimeString("en-US", { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      }));
      
      const ukNow = new Date();
      setUkTime(ukNow.toLocaleTimeString("en-GB", { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isBirthdayReady]);

  useEffect(() => {
    if (isBirthdayReady && !birthdayBurstDone) {
      setBirthdayBurstDone(true);
      setTimeout(() => fireConfettiBig(), 300);
      setTimeout(() => fireConfettiBig(), 800);
      setTimeout(() => fireConfettiBig(), 1300);
    }
  }, [isBirthdayReady, birthdayBurstDone]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMsgIndex((prev) => (prev + 1) % DISTANCE_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goNext = () => setScene((s) => Math.min(5, s + 1));
  const goBack = () => setScene((s) => Math.max(0, s - 1));

  const loadMoreReasons = () => {
    setVisibleReasons((prev) => Math.min(prev + 6, REASONS_26.length));
    fireConfettiSoft();
  };

  const loadMoreMoments = () => {
    setVisibleMoments((prev) => Math.min(prev + 6, MOMENTS_26.length));
    fireConfettiSoft();
  };

  return (
    <div style={styles.page}>
      {/* Background elements */}
      <ShootingStar />
      <ShootingStar />
      <ShootingStar />
      {Array.from({ length: 4 }).map((_, i) => (
        <FloatingLantern key={`lantern-${i}`} delay={i * 4} />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <Sparkle
          key={`sparkle-${i}`}
          delay={i * 0.3}
          x={randomBetween(0, window.innerWidth)}
          y={randomBetween(0, window.innerHeight)}
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <FloatingHeart key={`heart-${i}`} delay={i * 0.5} x={randomBetween(-200, 200)} />
      ))}

      <div style={styles.glowA} />
      <div style={styles.glowB} />
      <div style={styles.glowC} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={styles.card}
      >
        <div style={styles.header}>
          {!isBirthdayReady ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={styles.countdownContainer}
            >
              <div style={styles.countdownHeader}>
                🗽 New York is waiting for {HER_NAME}'s birthday! 🌸
              </div>
              
              <div style={styles.countdownGrid}>
                <CountBox label="Days" value={countdown.days} />
                <CountBox label="Hours" value={countdown.hours} />
                <CountBox label="Minutes" value={countdown.minutes} />
                <CountBox label="Seconds" value={countdown.seconds} />
              </div>

              <div style={styles.timeDisplay}>
                <div style={styles.timeItem}>
                  <span style={styles.timeLabel}>🗽 NY Time</span>
                  <span style={styles.timeValue}>{nyTime}</span>
                </div>
                <div style={styles.timeDivider}>|</div>
                <div style={styles.timeItem}>
                  <span style={styles.timeLabel}>🇬🇧 UK Time</span>
                  <span style={styles.timeValue}>{ukTime}</span>
                </div>
              </div>

              <div style={styles.countdownMessage}>
                ⏰ {HER_NAME}'s birthday will unlock at <strong>12:00 AM NY time</strong>
                <br />
                <span style={styles.smallText}>(That's 5:00 AM in the UK — I'll be awake for you!) 💕</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              style={styles.birthdayUnlocked}
            >
              <div style={styles.unlockedEmoji}>🎉💖🎉</div>
              <div style={styles.unlockedText}>IT'S {HER_NAME}'S BIRTHDAY! 🎂</div>
              <div style={styles.unlockedSubtext}>The wait is over! Let's celebrate! ✨</div>
            </motion.div>
          )}
        </div>

        {isBirthdayReady && (
          <>
            <div style={styles.stepper}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <StepDot key={i} active={scene === i} onClick={() => setScene(i)} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`scene-${scene}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {scene === 0 && (
                  <div style={styles.scene}>
                    <motion.div
                      animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={styles.bigEmoji}
                    >
                      🌸🎀🌸
                    </motion.div>

                    <p style={styles.sceneText}>
                      <strong>{HER_NAME}</strong>, today the world is celebrating
                      <br />
                      the most incredible person I know — <strong>YOU</strong>.
                    </p>

                    <p style={styles.sceneTextSmall}>
                      Even though we're apart, my heart is right there with you.
                      <br />
                      This page is my little gift — a piece of my heart, anime-style. 💫
                    </p>

                    <div style={styles.quoteBox}>
                      <span style={styles.quoteIcon}>“</span>
                      <span style={styles.quoteText}>
                        You're not just my girlfriend — you're my inspiration,
                        my dream, and the reason I believe in love.
                      </span>
                      <span style={styles.quoteIcon}>”</span>
                    </div>

                    <div style={styles.btnRowCenter}>
                      <motion.button
                        whileHover={{ scale: 1.06, boxShadow: "0 10px 40px rgba(255, 122, 200, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        style={styles.primaryBtn}
                        onClick={() => {
                          fireConfettiSoft();
                          goNext();
                        }}
                      >
                        🌟 Celebrate Her
                      </motion.button>
                    </div>
                  </div>
                )}

                {scene === 1 && (
                  <div style={styles.scene}>
                    <h2 style={styles.h2}>
                      🌸 Why You're So Amazing, {HER_NAME} 🌸
                    </h2>
                    <p style={styles.sceneTextSmall}>
                      A few of the many reasons you're absolutely incredible...
                    </p>

                    <div style={styles.giftCardsGrid}>
                      <GiftCard emoji="💫" title="You're Radiant" text="Your energy lights up my world, even from miles away." />
                      <GiftCard emoji="🌸" title="You're Strong" text="You face challenges with grace and courage." />
                      <GiftCard emoji="🎀" title="You're Unique" text="There's no one else like you — and that's beautiful." />
                      <GiftCard emoji="💗" title="You're Pure" text="Your heart is full of kindness and love." />
                    </div>

                    <div style={styles.btnRow}>
                      <ButtonGhost onClick={goBack} label="Back" />
                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        style={styles.primaryBtn}
                        onClick={goNext}
                      >
                        ✨ 26 Reasons ✨
                      </motion.button>
                    </div>
                  </div>
                )}

                {scene === 2 && (
                  <div style={styles.scene}>
                    <h2 style={styles.h2}>
                      ✨ 26 Reasons You're Perfect, {HER_NAME} ✨
                    </h2>
                    <p style={styles.sceneTextSmall}>
                      One for every beautiful year of your life. 🌸
                    </p>

                    <div style={styles.reasonsContainer}>
                      {REASONS_26.slice(0, visibleReasons).map((reason, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          style={styles.reasonItem}
                        >
                          <span style={styles.reasonEmoji}>{reason.emoji}</span>
                          <span style={styles.reasonText}>{reason.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    {visibleReasons < REASONS_26.length && (
                      <div style={styles.btnRowCenter}>
                        <motion.button
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                          style={styles.secondaryBtn}
                          onClick={loadMoreReasons}
                        >
                          Show more ✨ ({visibleReasons}/{REASONS_26.length})
                        </motion.button>
                      </div>
                    )}

                    {visibleReasons >= REASONS_26.length && (
                      <div style={styles.btnRow}>
                        <ButtonGhost onClick={goBack} label="Back" />
                        <motion.button
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                          style={styles.primaryBtn}
                          onClick={() => {
                            fireConfettiSoft();
                            goNext();
                          }}
                        >
                          💌 A Letter for You
                        </motion.button>
                      </div>
                    )}
                  </div>
                )}

                {scene === 3 && (
                  <div style={styles.scene}>
                    <h2 style={styles.h2}>💌 A Love Letter to You, {HER_NAME} 💌</h2>

                    <div style={styles.letterCard}>
                      <div style={styles.letterHeader}>💗 My Dearest {HER_NAME} 💗</div>
                      <p style={styles.letterText}>
                        Happy Birthday, my love! 🎂
                        <br /><br />
                        Today is all about YOU — the most beautiful, talented, and
                        incredible person I've ever had the privilege of loving.
                        <br /><br />
                        Even though distance keeps us apart right now, please know that
                        my heart beats only for you. You're not just in my thoughts —
                        you're in my soul. Everything I do, every dream I have,
                        somehow leads back to you.
                        <br /><br />
                        I admire your strength, your courage, and your beautiful heart.
                        You face life with such grace, and you inspire me every single day.
                        <br /><br />
                        I want you to know that you are <strong>enough</strong> —
                        more than enough. You are worthy of all the love, happiness,
                        and success in the world.
                        <br /><br />
                        One day, this distance will just be a memory — a chapter in
                        our love story. Until then, know that I'm here, I'm yours,
                        and I'm counting the moments until I can hold you.
                        <br /><br />
                        You are my sunshine, my moon, and all the stars in between.
                        <br /><br />
                        With all my love, across every mile,<br />
                        <strong style={styles.signature}>{YOUR_NAME} 💖</strong>
                        <br /><br />
                        <span style={styles.ps}>
                          P.S. — No matter how far, my heart will always find you. 🌙
                        </span>
                      </p>
                    </div>

                    <div style={styles.btnRow}>
                      <ButtonGhost onClick={goBack} label="Back" />
                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        style={styles.primaryBtn}
                        onClick={() => {
                          fireConfettiSoft();
                          goNext();
                        }}
                      >
                        🌟 Make a Wish
                      </motion.button>
                    </div>
                  </div>
                )}

                {scene === 4 && (
                  <div style={styles.scene}>
                    <h2 style={styles.h2}>🌟 Make a Wish, {HER_NAME} 🌟</h2>
                    <p style={styles.sceneTextSmall}>
                      Tap the stars — each one holds a wish for your beautiful future. ✨
                    </p>

                    <div style={styles.starContainer}>
                      {[
                        "Happiness always 💫",
                        "Love that never fades 💗",
                        "Courage to dream big 🦋",
                        "Peace in your heart 🌸",
                        "Laughter every day 😄",
                        "Strength when you need it 💪",
                        "Magic in the ordinary ✨",
                        "Friends who cherish you 🤗",
                        "Success in everything 🌟",
                        "A love that's forever ♾️",
                        "Your brightest future 🌅",
                        "All your dreams come true 💖",
                      ].map((wish, i) => (
                        <WishStar key={i} wish={wish} />
                      ))}
                    </div>

                    <div style={styles.btnRow}>
                      <ButtonGhost onClick={goBack} label="Back" />
                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        style={styles.primaryBtn}
                        onClick={() => {
                          fireConfettiBig();
                          goNext();
                        }}
                      >
                        💫 Moments We'll Share
                      </motion.button>
                    </div>
                  </div>
                )}

                {scene === 5 && (
                  <div style={styles.scene}>
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={styles.bigEmoji}
                    >
                      🌸✨💫
                    </motion.div>

                    <h2 style={styles.h2}>
                      💫 26 Moments We'll Share, {HER_NAME} 💫
                    </h2>
                    <p style={styles.sceneTextSmall}>
                      One day, we'll do all of these together. Until then,
                      <br />
                      <span style={{ opacity: 0.6 }}>I dream of you in every moment. 🌙</span>
                    </p>

                    <div style={styles.momentsContainer}>
                      {MOMENTS_26.slice(0, visibleMoments).map((moment, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.04 }}
                          whileHover={{ scale: 1.02, background: "rgba(255,255,255,0.08)" }}
                          style={styles.momentItem}
                          onClick={() => setSelectedMoment(idx)}
                        >
                          <span style={styles.momentEmoji}>{moment.emoji}</span>
                          <span style={styles.momentText}>{moment.text}</span>
                          <span style={styles.momentHeart}>💕</span>
                        </motion.div>
                      ))}
                    </div>

                    {visibleMoments < MOMENTS_26.length && (
                      <div style={styles.btnRowCenter}>
                        <motion.button
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                          style={styles.secondaryBtn}
                          onClick={loadMoreMoments}
                        >
                          Show more moments ✨ ({visibleMoments}/{MOMENTS_26.length})
                        </motion.button>
                      </div>
                    )}

                    {visibleMoments >= MOMENTS_26.length && (
                      <div style={styles.btnRow}>
                        <ButtonGhost onClick={goBack} label="Back" />
                        <motion.button
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                          style={styles.primaryBtn}
                          onClick={() => {
                            fireConfettiBig();
                            setTimeout(() => setScene(0), 1200);
                          }}
                        >
                          🎉 Start Over!
                        </motion.button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        <div style={styles.footer}>
          <span>
            {isBirthdayReady 
              ? `🎂 Happy Birthday ${HER_NAME}! Made with 💗 across the miles ✨`
              : `⏰ Counting down to ${HER_NAME}'s birthday in New York 🗽✨`
            }
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function CountBox({ label, value }) {
  return (
    <div style={styles.countBox}>
      <div style={styles.countValue}>{String(value).padStart(2, '0')}</div>
      <div style={styles.countLabel}>{label}</div>
    </div>
  );
}

function StepDot({ active, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.3 }}
      onClick={onClick}
      style={{
        width: active ? 22 : 10,
        height: 10,
        borderRadius: 999,
        background: active
          ? "linear-gradient(90deg, #ff7ac8, #ffd1ea)"
          : "rgba(255,255,255,0.15)",
        cursor: "pointer",
        transition: "all 300ms ease",
        boxShadow: active ? "0 0 30px rgba(255, 122, 200, 0.25)" : "none",
      }}
    />
  );
}

function GiftCard({ emoji, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      style={styles.giftCard}
    >
      <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</div>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: "#ffd1ea" }}>
        {title}
      </div>
      <div style={{ opacity: 0.85, fontSize: 13, lineHeight: 1.4 }}>{text}</div>
    </motion.div>
  );
}

function WishStar({ wish }) {
  const [clicked, setClicked] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      setShowWish(true);
      fireConfettiSoft();
      setTimeout(() => {
        setShowWish(false);
        setClicked(false);
      }, 3000);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <motion.div
        whileHover={{ scale: 1.3, rotate: 20 }}
        whileTap={{ scale: 0.7 }}
        animate={clicked ? { scale: [1, 1.8, 0], opacity: [1, 1, 0] } : {}}
        onClick={handleClick}
        style={{
          cursor: "pointer",
          fontSize: 30,
          transition: "all 0.3s",
          opacity: clicked ? 0 : 1,
          filter: "drop-shadow(0 0 20px rgba(255, 200, 100, 0.2))",
        }}
      >
        ⭐
      </motion.div>
      {showWish && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            fontSize: 10,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "4px 8px",
            marginTop: 4,
            maxWidth: 100,
            textAlign: "center",
          }}
        >
          {wish}
        </motion.div>
      )}
    </div>
  );
}

function ButtonGhost({ onClick, label }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.12)" }}
      whileTap={{ scale: 0.95 }}
      style={styles.ghostBtn}
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 20,
    background:
      "radial-gradient(1400px 900px at 30% 20%, rgba(255, 105, 180, 0.15), transparent 50%)," +
      "radial-gradient(1000px 800px at 70% 80%, rgba(180, 100, 255, 0.12), transparent 50%)," +
      "linear-gradient(135deg, #0a0615, #150b20, #0a0615)",
    color: "white",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    position: "relative",
    overflow: "hidden",
  },
  glowA: {
    position: "fixed",
    width: 700,
    height: 700,
    borderRadius: "50%",
    background: "rgba(255, 105, 180, 0.08)",
    filter: "blur(120px)",
    top: -300,
    left: -300,
    zIndex: 0,
  },
  glowB: {
    position: "fixed",
    width: 700,
    height: 700,
    borderRadius: "50%",
    background: "rgba(180, 100, 255, 0.06)",
    filter: "blur(120px)",
    bottom: -300,
    right: -300,
    zIndex: 0,
  },
  glowC: {
    position: "fixed",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "rgba(255, 200, 200, 0.04)",
    filter: "blur(100px)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 0,
  },
  card: {
    width: "min(660px, 94vw)",
    padding: "24px 24px 18px",
    borderRadius: 28,
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
    backdropFilter: "blur(16px)",
    position: "relative",
    zIndex: 1,
    maxHeight: "95vh",
    overflowY: "auto",
  },
  header: {
    position: "relative",
    zIndex: 1,
    marginBottom: 12,
  },
  
  // Countdown Styles
  countdownContainer: {
    textAlign: "center",
    padding: "16px 12px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.06)",
  },
  countdownHeader: {
    fontSize: 16,
    fontWeight: 600,
    color: "#ffd1ea",
    marginBottom: 12,
  },
  countdownGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
    marginBottom: 12,
  },
  countBox: {
    padding: "10px 8px",
    borderRadius: 14,
    background: "rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.06)",
    textAlign: "center",
  },
  countValue: {
    fontSize: 28,
    fontWeight: 800,
    background: "linear-gradient(135deg, #ff7ac8, #ffd1ea)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  countLabel: {
    fontSize: 10,
    opacity: 0.6,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  timeDisplay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: "8px 12px",
    borderRadius: 12,
    background: "rgba(0,0,0,0.15)",
    marginBottom: 10,
  },
  timeItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  timeLabel: {
    fontSize: 9,
    opacity: 0.5,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: 700,
    color: "#ffd1ea",
  },
  timeDivider: {
    opacity: 0.2,
  },
  countdownMessage: {
    fontSize: 12,
    opacity: 0.7,
    lineHeight: 1.6,
  },
  smallText: {
    fontSize: 11,
    opacity: 0.5,
  },
  
  // Birthday Unlocked
  birthdayUnlocked: {
    textAlign: "center",
    padding: "20px 12px",
    background: "rgba(255, 105, 180, 0.08)",
    borderRadius: 20,
    border: "2px solid rgba(255, 105, 180, 0.15)",
  },
  unlockedEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  unlockedText: {
    fontSize: 24,
    fontWeight: 800,
    background: "linear-gradient(135deg, #ff7ac8, #ffd1ea)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  unlockedSubtext: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  
  stepper: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  scene: {
    position: "relative",
    zIndex: 1,
  },
  bigEmoji: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 6,
  },
  h2: {
    margin: "0 0 6px 0",
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: -0.2,
    color: "#ffd1ea",
    textAlign: "center",
  },
  sceneText: {
    opacity: 0.92,
    lineHeight: 1.8,
    fontSize: 15,
    textAlign: "center",
  },
  sceneTextSmall: {
    opacity: 0.75,
    lineHeight: 1.6,
    fontSize: 13,
    marginTop: 2,
    textAlign: "center",
  },

  quoteBox: {
    margin: "16px 0",
    padding: "16px 20px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    textAlign: "center",
  },
  quoteIcon: {
    fontSize: 24,
    opacity: 0.3,
    display: "block",
  },
  quoteText: {
    fontSize: 14,
    fontStyle: "italic",
    lineHeight: 1.6,
    opacity: 0.9,
  },

  giftCardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 8,
    marginTop: 10,
  },
  giftCard: {
    padding: 14,
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    textAlign: "center",
    transition: "all 0.3s ease",
  },

  reasonsContainer: {
    maxHeight: 330,
    overflowY: "auto",
    marginTop: 10,
    paddingRight: 6,
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255,255,255,0.1) transparent",
  },
  reasonItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "8px 12px",
    borderRadius: 12,
    background: "rgba(0,0,0,0.15)",
    border: "1px solid rgba(255,255,255,0.04)",
    marginBottom: 6,
  },
  reasonEmoji: { fontSize: 18, flexShrink: 0 },
  reasonText: { fontSize: 14, opacity: 0.92, lineHeight: 1.4 },

  // Moments Styles
  momentsContainer: {
    maxHeight: 330,
    overflowY: "auto",
    marginTop: 10,
    paddingRight: 6,
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255,255,255,0.1) transparent",
  },
  momentItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    borderRadius: 12,
    background: "rgba(0,0,0,0.15)",
    border: "1px solid rgba(255,255,255,0.04)",
    marginBottom: 6,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  momentEmoji: { fontSize: 20, flexShrink: 0 },
  momentText: { fontSize: 14, opacity: 0.92, lineHeight: 1.4, flex: 1 },
  momentHeart: { fontSize: 14, opacity: 0.3 },

  letterCard: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(0,0,0,0.15)",
    padding: 16,
    marginTop: 8,
    maxHeight: 340,
    overflowY: "auto",
  },
  letterHeader: {
    fontSize: 16,
    fontWeight: 700,
    color: "#ffd1ea",
    textAlign: "center",
    marginBottom: 10,
  },
  letterText: {
    margin: 0,
    opacity: 0.92,
    lineHeight: 1.8,
    fontSize: 14,
  },
  signature: {
    fontSize: 16,
    color: "#ffd1ea",
  },
  ps: {
    fontSize: 12,
    opacity: 0.6,
    fontStyle: "italic",
  },

  starContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    padding: "14px 0",
  },

  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  btnRowCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  primaryBtn: {
    padding: "12px 24px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    color: "#1b0b14",
    background: "linear-gradient(135deg, #ff7ac8, #ffd1ea)",
    boxShadow: "0 8px 30px rgba(255, 122, 200, 0.2)",
    transition: "all 0.3s ease",
  },
  secondaryBtn: {
    padding: "10px 20px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
    background: "rgba(255,255,255,0.04)",
    color: "white",
    transition: "all 0.3s ease",
  },
  ghostBtn: {
    padding: "10px 16px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    color: "white",
    transition: "all 0.3s ease",
  },

  footer: {
    marginTop: 12,
    fontSize: 11,
    opacity: 0.4,
    textAlign: "center",
    letterSpacing: 0.5,
  },
};