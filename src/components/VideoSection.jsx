import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Maximize, Minimize } from 'lucide-react';

const VIDEO_ID = 'S0EUmPQuEpQ'; // Video bài giảng mẫu về Tồn tại xã hội & Ý thức xã hội

const VideoSection = () => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Khởi tạo trình phát YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    let player;

    const initPlayer = () => {
      player = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: VIDEO_ID,
        playerVars: {
          playsinline: 1,
          rel: 0,
          controls: 0, // Ẩn hoàn toàn bảng điều khiển mặc định của YouTube
          fs: 0,       // Tắt nút phóng to mặc định của YouTube
          disablekb: 1 // Tắt phím tắt mặc định của YouTube để tránh xung đột
        },
        events: {
          onReady: (event) => {
            playerRef.current = event.target;
            setDuration(event.target.getDuration());
            event.target.setVolume(volume);
          },
          onStateChange: (event) => {
            // event.data: 1 (playing), 2 (paused), 0 (ended)
            if (event.data === 1) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    // Đảm bảo trang web nhận tiêu điểm bàn phím khi tải
    window.focus();

    return () => {
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
    };
  }, []);

  // Lắng nghe và cập nhật tiến trình video định kỳ
  useEffect(() => {
    let interval;
    if (isPlaying && playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
      interval = setInterval(() => {
        setCurrentTime(playerRef.current.getCurrentTime());
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Điều khiển Play / Pause
  const handlePlayPause = () => {
    if (!playerRef.current) return;
    const state = playerRef.current.getPlayerState();
    if (state === 1) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
    window.focus(); // Trả tiêu điểm lại cho cửa sổ trang web
  };

  // Điều khiển âm lượng
  const handleVolumeChange = (e) => {
    const newVol = parseInt(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(newVol);
      if (newVol > 0 && playerRef.current.isMuted()) {
        playerRef.current.unMute();
      }
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
    window.focus();
  };

  // Tua video khi bấm tiến trình
  const handleProgressBarClick = (e) => {
    if (!playerRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    setCurrentTime(newTime);
    playerRef.current.seekTo(newTime, true);
    window.focus();
  };

  // Bật/tắt Fullscreen tùy chỉnh
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Lỗi khi phóng to:", err);
      });
    } else {
      document.exitFullscreen();
    }
    window.focus();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      window.focus();
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Lắng nghe phím tắt trên trang web (Hoạt động cả khi phóng to vì tiêu điểm luôn ở parent window)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Tránh cướp phím nếu đang gõ chữ ở các input khác (nếu có)
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      const key = e.key;

      // Phím 0-9: Tua đến 0% - 90%
      if (/^[0-9]$/.test(key)) {
        const percent = parseInt(key) * 10;
        if (playerRef.current && typeof playerRef.current.getDuration === 'function') {
          const videoDuration = playerRef.current.getDuration();
          if (videoDuration) {
            const seekTime = (videoDuration * percent) / 100;
            playerRef.current.seekTo(seekTime, true);
            setCurrentTime(seekTime);
          }
        }
      }
      // Phím Space: Play / Pause
      else if (key === ' ') {
        e.preventDefault();
        handlePlayPause();
      }
      // Phím F: Fullscreen
      else if (key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [duration]);

  // Định dạng hiển thị thời gian phút:giây
  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Tự động ẩn thanh điều khiển khi di chuột ngoài màn hình
  const controlTimeout = useRef(null);
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlTimeout.current);
    if (isPlaying) {
      controlTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    return () => clearTimeout(controlTimeout.current);
  }, [isPlaying]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-soviet-offwhite via-white to-soviet-gold/10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-12 text-soviet-red tracking-tight text-center">
            Tóm Tắt Nội Dung
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-b from-soviet-red via-soviet-red to-soviet-gold rounded-lg shadow-2xl border-4 border-soviet-gold p-8 mb-4 max-w-xs mx-auto text-white">
                <p className="text-4xl font-black">I</p>
                <p className="text-sm font-bold uppercase tracking-[0.3em] mt-4">Tồn Tại Xã Hội</p>
              </div>
              <p className="text-xl font-black text-soviet-red">Sinh hoạt vật chất &amp; Phương thức sản xuất</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-soviet-offwhite rounded-lg shadow-2xl p-12 border-4 border-soviet-gold"
            >
              <p className="text-3xl md:text-4xl font-black italic text-soviet-red mb-8 leading-relaxed">
                "Không phải ý thức của con người quyết định tồn tại của họ; trái lại, tồn tại xã hội của họ quyết định ý thức của họ."
              </p>
              <p className="text-xl text-zinc-600 font-bold">— K. Marx &amp; F. Engels</p>
              <p className="text-sm text-zinc-500 mt-6 italic">
                Luận điểm kinh điển đặt nền móng cho chủ nghĩa duy vật lịch sử
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* TRÌNH PHÁT CUSTOM TOÀN DIỆN */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className={`shadow-2xl transition-all duration-300 relative ${
            isFullscreen 
              ? 'w-screen h-screen border-0 rounded-none p-0 bg-black overflow-hidden flex flex-col justify-center' 
              : 'bg-white border-4 border-soviet-red p-8 rounded-3xl flex flex-col gap-6'
          }`}
          style={isFullscreen ? { width: '100vw', height: '100vh', zIndex: 99999 } : {}}
        >
          {/* Vùng Video */}
          <div className={`bg-black overflow-hidden relative group ${
            isFullscreen ? 'absolute inset-0 w-full h-full border-0 rounded-none shadow-none' : 'aspect-video w-full rounded-2xl border-4 border-soviet-gold shadow-lg'
          }`}>
            {/* YouTube Iframe */}
            <div id="youtube-player" className="w-full h-full pointer-events-none"></div>

            {/* Lớp phủ trong suốt chặn focus vào iframe nhưng vẫn bấm được Play/Pause */}
            <div
              className="absolute inset-0 z-10 bg-transparent cursor-pointer select-none outline-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              onClick={handlePlayPause}
            ></div>

            {/* Nút phóng to / thu nhỏ nổi ở góc dưới bên phải */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Ngăn kích hoạt Play/Pause của lớp phủ
                toggleFullscreen();
              }}
              className={`absolute bottom-4 right-4 z-20 p-3 bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95 ${showControls || !isPlaying ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90 pointer-events-none'
                }`}
              title={isFullscreen ? 'Thu nhỏ (F)' : 'Phóng to (F)'}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>


          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
