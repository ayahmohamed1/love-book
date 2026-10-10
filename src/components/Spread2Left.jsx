import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart
} from 'lucide-react';

export function Spread2Left({ data }) {
  const { song } = data;
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(182);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeat]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(true);
      });
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const seekTo = parseFloat(e.target.value);
    setCurrentTime(seekTo);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="spread-page spread2-left">
      <audio
        ref={audioRef}
        src={song?.audioUrl || "/audio/song.mp3"}
        preload="metadata"
      />

      <div className="music-player-card" onClick={(e) => e.stopPropagation()}>
        {/* Postage Stamp Photo Frame */}
        <div className="stamp-wrapper">
          <div className="postage-stamp-border">
            <div className="stamp-inner-artwork">
              <img
                src={song?.stampImage || "/images/song-cover.jpg"}
                alt={song?.title || "Album art"}
                className="stamp-photo"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Title, Artist and Heart Icon */}
        <div className="track-info-row">
          <div className="track-text">
            <h3 className="track-title">{song?.title || "Por primera vez"}</h3>
            <p className="track-artist">{song?.artist || "Camilo y Evaluna Montaner"}</p>
          </div>
          <button
            className="heart-like-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            aria-label="Like"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? 'fill-[#5c0b14] text-[#5c0b14]' : 'text-neutral-400 stroke-1'
              }`}
            />
          </button>
        </div>

        {/* Minimal Progress Bar */}
        <div className="audio-progress-section">
          <div className="progress-bar-container">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="progress-range-input"
              style={{
                background: `linear-gradient(to right, #5c0b14 ${progressPercent}%, #e8e2dc ${progressPercent}%)`
              }}
              aria-label="Song progress"
            />
          </div>
        </div>

        {/* Player Controls (Shuffle, Prev, Play, Next, Repeat) */}
        <div className="player-controls-row">
          <button
            className={`ctrl-btn secondary-btn ${isShuffle ? 'active-ctrl' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsShuffle(!isShuffle);
            }}
            aria-label="Shuffle"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          <button
            className="ctrl-btn secondary-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (audioRef.current) audioRef.current.currentTime = 0;
            }}
            aria-label="Previous"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            className="ctrl-btn main-play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white text-white" />
            ) : (
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            )}
          </button>

          <button
            className="ctrl-btn secondary-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (audioRef.current) {
                audioRef.current.currentTime = Math.min(duration, currentTime + 10);
              }
            }}
            aria-label="Next"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            className={`ctrl-btn secondary-btn ${isRepeat ? 'active-ctrl' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsRepeat(!isRepeat);
            }}
            aria-label="Repeat"
          >
            <Repeat className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Spread2Left;
