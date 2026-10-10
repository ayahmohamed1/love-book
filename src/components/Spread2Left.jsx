import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
  VolumeX,
  Disc3,
  Music2
} from 'lucide-react';

export function Spread2Left({ data }) {
  const { song } = data;
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(182); // default ~3:02
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // Sync audio events
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

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Audio play prevented or unavailable:", e);
        setIsPlaying(true); // show animation anyway
      });
    }
  };

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value);
    setCurrentTime(seekTo);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="spread-page spread2-left">
      <audio
        ref={audioRef}
        src={song?.audioUrl}
        preload="metadata"
      />

      <div className="music-player-card">
        {/* Top Decorative Vintage Stamp Section */}
        <div className="stamp-wrapper">
          <div className="postage-stamp-border">
            <div className="stamp-inner-artwork">
              <img
                src={song?.stampImage}
                alt={song?.title || "Album art"}
                className="stamp-photo"
                loading="lazy"
              />
              {/* Optional spinning vinyl disc animation behind stamp */}
              <div className={`stamp-vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
                <Disc3 className="w-10 h-10 text-white/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Track Details & Heart Like */}
        <div className="track-info-row">
          <div className="track-text">
            <h3 className="track-title">{song?.title || "Por primera vez"}</h3>
            <p className="track-artist">{song?.artist || "Camilo y Evaluna Montaner"}</p>
          </div>
          <button
            className={`heart-like-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Like song"
            title={isLiked ? "Saved to favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#8b121e] text-[#8b121e]' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Audio Progress Scrubber */}
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
                background: `linear-gradient(to right, #8b121e ${progressPercent}%, #e2d9d2 ${progressPercent}%)`
              }}
              aria-label="Song progress"
            />
          </div>
          <div className="time-display-row">
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="total-duration">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Music Player Controls */}
        <div className="player-controls-row">
          <button
            className={`ctrl-btn secondary-btn ${isShuffle ? 'active-ctrl' : ''}`}
            onClick={() => setIsShuffle(!isShuffle)}
            title="خلط الأغاني"
            aria-label="Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            className="ctrl-btn secondary-btn"
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime = 0;
            }}
            title="السابق"
            aria-label="Previous track"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            className="ctrl-btn main-play-btn"
            onClick={togglePlay}
            title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
            aria-label={isPlaying ? "Pause song" : "Play song"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 play-icon" />
            ) : (
              <Play className="w-6 h-6 play-icon ml-0.5" />
            )}
          </button>

          <button
            className="ctrl-btn secondary-btn"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = Math.min(duration, currentTime + 10);
              }
            }}
            title="التالي"
            aria-label="Next track"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            className={`ctrl-btn secondary-btn ${isRepeat ? 'active-ctrl' : ''}`}
            onClick={() => setIsRepeat(!isRepeat)}
            title="تكرار الأغنية"
            aria-label="Repeat"
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Volume & Romantic Quote */}
        <div className="player-footer-extra">
          <button
            onClick={toggleMute}
            className="volume-toggle-btn"
            title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-500" /> : <Volume2 className="w-4 h-4 text-gray-500" />}
          </button>

          {song?.quote && (
            <p className="song-romantic-quote">
              <Music2 className="w-3.5 h-3.5 inline-block mr-1 text-[#8b121e]" />
              "{song.quote}"
            </p>
          )}
        </div>
      </div>

      {/* Decorative Page Footer Number */}
      <div className="page-footer-number">
        <span>03</span>
      </div>
    </div>
  );
}

export default Spread2Left;
