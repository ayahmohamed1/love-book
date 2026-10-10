import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2
} from 'lucide-react';

export function Spread2Left({ data }) {
  const { song } = data;
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(182);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume]);

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

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remainingTime = duration > currentTime ? duration - currentTime : 0;

  return (
    <div className="single-page-music-root">
      <audio
        ref={audioRef}
        src={song?.audioUrl || "/audio/song.mp3"}
        preload="metadata"
      />

      <div className="modern-music-stage" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Vinyl Record (Peeking and spinning when playing) */}
        <div className={`vinyl-record-peek ${isPlaying ? 'is-spinning' : ''}`}>
          <div className="vinyl-inner-label">
            <span className="vinyl-center-hole"></span>
          </div>
        </div>

        {/* Music Player Glassmorphic Card */}
        <div className="modern-player-card">
          
          {/* Album Artwork Card (Cream Paper with Arched "I love you" & Tilted Photo) */}
          <div className="album-artwork-box">
            
            {/* Arched Calligraphic Text */}
            <div className="arched-love-banner">
              <svg viewBox="0 0 280 80" className="arched-svg-text">
                <path id="curvePath" d="M 25 70 Q 140 10 255 70" fill="transparent" />
                <text className="arched-text-label">
                  <textPath href="#curvePath" startOffset="50%" textAnchor="middle">
                    I love you
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Tilted Photo Booth Style Photo */}
            <div className="tilted-album-photo-frame">
              <img
                src={song?.stampImage || "/images/song-cover.jpg"}
                alt="Our Song"
                className="tilted-album-photo"
                loading="lazy"
              />
            </div>
          </div>

          {/* Track Details */}
          <div className="modern-track-header">
            <h3 className="modern-song-title">{song?.title || "Our Song"}</h3>
            <p className="modern-song-subtitle">{song?.artist || "every word for you"}</p>
          </div>

          {/* Progress Timeline Scrubber */}
          <div className="modern-progress-box">
            <div className="timeline-input-wrap">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="modern-range-input"
                style={{
                  background: `linear-gradient(to right, #b32638 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`
                }}
                aria-label="Progress"
              />
            </div>
            <div className="timeline-labels-row">
              <span className="time-digit">{formatTime(currentTime)}</span>
              <span className="time-digit">-{formatTime(remainingTime)}</span>
            </div>
          </div>

          {/* Player Controls (Prev, Big Glowing Play/Pause, Next) */}
          <div className="modern-controls-row">
            <button
              className="modern-ctrl-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (audioRef.current) audioRef.current.currentTime = 0;
              }}
              title="Previous"
              aria-label="Previous"
            >
              <SkipBack className="w-5 h-5 fill-white text-white" />
            </button>

            <button
              className="modern-main-play-btn"
              onClick={togglePlay}
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-white text-white" />
              ) : (
                <Play className="w-6 h-6 fill-white text-white ml-0.5" />
              )}
            </button>

            <button
              className="modern-ctrl-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.min(duration, currentTime + 10);
                }
              }}
              title="Next"
              aria-label="Next"
            >
              <SkipForward className="w-5 h-5 fill-white text-white" />
            </button>
          </div>

          {/* Volume Control Slider */}
          <div className="modern-volume-row">
            <Volume1 className="w-3.5 h-3.5 text-white/60" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider-input"
              style={{
                background: `linear-gradient(to right, #b32638 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
              }}
              aria-label="Volume"
            />
            <Volume2 className="w-3.5 h-3.5 text-white/60" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Spread2Left;
