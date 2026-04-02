import { useState, useEffect, useRef, useCallback } from 'react';
import { NEXRAD_FRAMES } from '../components/Map/RadarLayer';

// how many minutes back each frame is (oldest first)
const FRAME_OFFSETS = [-30, -25, -20, -15, -10, -5, 0];

function getTimeLabel(offsetMinutes) {
  if (offsetMinutes === 0) return 'Now';
  const now = new Date();
  now.setMinutes(now.getMinutes() + offsetMinutes);
  return now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function useRadar() {
  const frameCount = NEXRAD_FRAMES.length;
  const lastIndex = frameCount - 1;
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const intervalRef = useRef(null);
  const pauseRef = useRef(null);

  const nextFrame = useCallback(() => {
    setCurrentFrameIndex((prev) => (prev + 1) % frameCount);
  }, [frameCount]);

  const prevFrame = useCallback(() => {
    setCurrentFrameIndex((prev) => (prev === 0 ? lastIndex : prev - 1));
  }, [lastIndex]);

  // animation loop — steps through frames, dwells on "Now" before looping back
  useEffect(() => {
    if (!isPlaying) return;

    const advance = () => {
      setCurrentFrameIndex((prev) => {
        const next = prev + 1;
        if (next > lastIndex) {
          // we're on the latest frame — hold here, then loop back to start
          pauseRef.current = setTimeout(() => {
            setCurrentFrameIndex(0);
            // normal interval kicks back in after this
          }, animationSpeed * 3);
          return prev; // stay put while we dwell
        }
        return next;
      });
    };

    intervalRef.current = setInterval(advance, animationSpeed);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(pauseRef.current);
    };
  }, [isPlaying, animationSpeed, lastIndex]);

  return {
    frameCount,
    currentFrameIndex,
    currentLabel: getTimeLabel(FRAME_OFFSETS[currentFrameIndex]),
    isPlaying,
    animationSpeed,
    setIsPlaying,
    setAnimationSpeed,
    setCurrentFrameIndex,
    nextFrame,
    prevFrame,
  };
}
