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
  const { song } = data || {};
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(182);
  const [volume, setVolume] = useState(0.85);

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

      <div className="compact-music-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Vinyl Record Peeking Behind Top of Card */}
        <div className={`compact-vinyl-peek ${isPlaying ? 'is-spinning' : ''}`}>
          <div className="vinyl-groove-ring">
            <div className="vinyl-center-badge">
              <span className="vinyl-spindle"></span>
            </div>
          </div>
        </div>

        {/* Ultra-Modern Glassmorphic Burgundy Card */}
        <div className="compact-music-card">
          
          {/* Top Artwork Box with Arched 'I love you' & Tilted Polaroid */}
          <div className="artwork-card-box">
            <div className="arched-script-wrap">
              <svg viewBox="0 0 240 60" className="arched-svg">
                <path id="archCurve" d="M 20 52 Q 120 12 220 52" fill="transparent" />
                <text className="arched-text">
                  <textPath href="#archCurve" startOffset="50%" textAnchor="middle">
                    I love you
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="artwork-tilted-frame">
              <img
                src={song?.stampImage || "/images/Couple (2).jpg"}
                alt="Our Song"
                className="artwork-tilted-img"
                loading="eager"
              />
            </div>
          </div>

          {/* Song Title & Subtitle */}
          <div className="compact-track-info">
            <h4 className="compact-song-title">{song?.title || "Our Song"}</h4>
            <p className="compact-song-artist">{song?.artist || "every word for you"}</p>
          </div>

          {/* Timeline Scrubber */}
          <div className="compact-timeline-section">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="compact-scrubber"
              style={{
                background: `linear-gradient(to right, #e63946 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`
              }}
              aria-label="Song progress"
            />
            <div className="compact-time-labels">
              <span>{formatTime(currentTime)}</span>
              <span>-{formatTime(remainingTime)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="compact-controls-row">
            <button
              className="compact-ctrl-icon-btn skip-black-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (audioRef.current) audioRef.current.currentTime = 0;
              }}
              title="Previous"
              aria-label="Previous"
            >
              <SkipBack className="w-4 h-4 fill-black text-black" />
            </button>

            <button
              className="compact-play-circle-btn"
              onClick={togglePlay}
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white text-white" />
              ) : (
                <Play className="w-5 h-5 fill-white text-white ml-0.5" />
              )}
            </button>

            <button
              className="compact-ctrl-icon-btn skip-black-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.min(duration, currentTime + 10);
                }
              }}
              title="Next"
              aria-label="Next"
            >
              <SkipForward className="w-4 h-4 fill-black text-black" />
            </button>
          </div>

          {/* Mini Volume Bar */}
          <div className="compact-volume-bar">
            <Volume1 className="w-3 h-3 text-white/50" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="compact-volume-slider"
              style={{
                background: `linear-gradient(to right, #e63946 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
              }}
              aria-label="Volume"
            />
            <Volume2 className="w-3 h-3 text-white/50" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Spread2Left;
