import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function createOceanAudio(ctx: AudioContext): () => void {
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 3);
  masterGain.connect(ctx.destination);

  const nodes: AudioNode[] = [masterGain];

  function makeWaveLayer(freq: number, amp: number, speed: number, filterFreq: number) {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = filterFreq;
    filter.Q.value = 0.5;

    const gainNode = ctx.createGain();
    gainNode.gain.value = amp;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = speed;
    lfo.type = "sine";
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = amp * 0.9;
    lfo.connect(lfoGain);
    lfo.connect(ctx.destination);

    const waveLfo = ctx.createOscillator();
    waveLfo.frequency.value = freq;
    waveLfo.type = "sine";
    const waveLfoGain = ctx.createGain();
    waveLfoGain.gain.value = amp * 0.5;

    source.connect(filter);
    filter.connect(gainNode);
    lfoGain.connect(gainNode.gain);
    gainNode.connect(masterGain);

    waveLfo.connect(waveLfoGain);
    waveLfoGain.connect(filter.frequency);

    source.start();
    lfo.start();
    waveLfo.start();

    nodes.push(source, filter, gainNode, lfo, lfoGain, waveLfo, waveLfoGain);
  }

  makeWaveLayer(0.07, 0.35, 0.05, 300);
  makeWaveLayer(0.12, 0.25, 0.08, 600);
  makeWaveLayer(0.05, 0.18, 0.03, 150);

  const deepOsc = ctx.createOscillator();
  deepOsc.type = "sine";
  deepOsc.frequency.value = 60;
  const deepGain = ctx.createGain();
  deepGain.gain.value = 0.04;
  deepOsc.connect(deepGain);
  deepGain.connect(masterGain);
  deepOsc.start();
  nodes.push(deepOsc, deepGain);

  return () => {
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
  };
}

export default function OceanPlayer() {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  const start = useCallback(() => {
    if (ctxRef.current) {
      ctxRef.current.close();
    }
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    stopRef.current = createOceanAudio(ctx);
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    stopRef.current?.();
    setTimeout(() => {
      ctxRef.current?.close();
      ctxRef.current = null;
    }, 1600);
    setPlaying(false);
  }, []);

  const toggle = () => {
    if (playing) stop();
    else start();
  };

  useEffect(() => {
    return () => {
      stopRef.current?.();
      ctxRef.current?.close();
    };
  }, []);

  const bars = [3, 5, 8, 5, 9, 6, 4, 7, 5, 3];

  return (
    <motion.div
      data-testid="ocean-player"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl px-5 py-3 flex items-center gap-4"
            style={{
              background: "rgba(2, 13, 26, 0.75)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(13, 148, 136, 0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex flex-col">
              <span
                className="text-white/90 text-xs font-medium tracking-wide"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Ocean Ambient
              </span>
              <span
                className="text-teal-400/60 text-[10px] tracking-widest uppercase"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {playing ? "Playing" : "Paused"}
              </span>
            </div>

            {/* Waveform visualizer */}
            <div className="flex items-center gap-[3px] h-6">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[3px] rounded-full bg-teal-400/70"
                  animate={
                    playing
                      ? {
                          scaleY: [0.3, 1, 0.5, 1, 0.3],
                          opacity: [0.4, 1, 0.6, 1, 0.4],
                        }
                      : { scaleY: 0.3, opacity: 0.3 }
                  }
                  transition={{
                    duration: 1.2 + i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.12,
                  }}
                  style={{ height: `${h * 2}px`, transformOrigin: "center" }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        data-testid="button-toggle-player"
        onClick={() => {
          toggle();
          setExpanded(true);
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => !playing && setExpanded(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: playing
            ? "rgba(13, 148, 136, 0.25)"
            : "rgba(2, 13, 26, 0.75)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${playing ? "rgba(13,148,136,0.5)" : "rgba(13,148,136,0.2)"}`,
          boxShadow: playing
            ? "0 0 24px rgba(13,148,136,0.3), 0 4px 16px rgba(0,0,0,0.4)"
            : "0 4px 16px rgba(0,0,0,0.4)",
        }}
        title={playing ? "Pause ocean sounds" : "Play ocean sounds"}
      >
        {/* Pulse ring when playing */}
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full border border-teal-400/30"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        {playing ? (
          /* Pause icon */
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <rect x="1" y="0" width="4" height="16" rx="2" fill="rgba(13,148,136,0.9)" />
            <rect x="9" y="0" width="4" height="16" rx="2" fill="rgba(13,148,136,0.9)" />
          </svg>
        ) : (
          /* Wave / play icon */
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path
              d="M1 7 Q4 2 7 7 Q10 12 13 7 Q16 2 17 7"
              stroke="rgba(13,148,136,0.8)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        )}
      </motion.button>
    </motion.div>
  );
}
