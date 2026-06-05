import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Maximize, Minimize } from 'lucide-react';

const VIDEO_ID = 'Z-iYN-QF8p8'; // Video bài giảng mẫu về Tồn tại xã hội & Ý thức xã hội

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
  const [showConclusion, setShowConclusion] = useState(false);

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

        </motion.div>

        {/* PHẦN GIỚI THIỆU & HƯỚNG DẪN CHƠI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 grid md:grid-cols-2 gap-8"
        >
          {/* Cột 1: Giới thiệu tổng quan */}
          <div className="bg-white border-2 border-zinc-100 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-soviet-red" />
            <span className="px-3 py-1 bg-soviet-red/10 text-soviet-red text-xs font-black rounded-full uppercase tracking-wider block w-fit mb-4">
              Khung 1: Tổng quan dự án
            </span>
            <h3 className="text-2xl font-black text-zinc-900 mb-4">
              Phim Điện Ảnh Tương Tác: Thực tại Biện Chứng
            </h3>
            <p className="text-zinc-600 text-base font-semibold leading-relaxed">
              Chào mừng bạn đến với dự án trải nghiệm mô phỏng tương tác, nơi triết học Karl Marx không còn là những trang sách lý thuyết khô khan. Bạn sẽ nhập vai Khánh – một nhà phát triển trẻ đang đứng trước áp lực sinh tồn khốc liệt. Dự án này được thiết kế để bạn trực tiếp kiểm chứng quy luật: <span className="text-soviet-red font-bold">"Tồn tại xã hội quyết định ý thức"</span>. Hãy đưa ra những lựa chọn mang tính sống còn để khám phá xem liệu lý tưởng có thể đứng vững trước sức mạnh của vật chất, hay sẽ bị bóp nghẹt bởi những thỏa hiệp.
            </p>
          </div>

          {/* Cột 2: Hướng dẫn tương tác */}
          <div className="bg-zinc-900 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group border border-white/10">
            <div className="absolute top-0 left-0 w-2 h-full bg-soviet-gold" />
            <span className="px-3 py-1 bg-soviet-gold/20 text-soviet-gold text-xs font-black rounded-full uppercase tracking-wider block w-fit mb-4">
              Khung 2: Hướng dẫn tương tác
            </span>
            <h3 className="text-2xl font-black text-soviet-gold mb-4">
              Cơ chế Tương tác &amp; Sinh tồn
            </h3>
            <div className="space-y-4 text-zinc-300 text-base font-semibold leading-relaxed">
              <p className="font-bold text-white">
                Dự án hoạt động dựa trên logic Tương tác Phân nhánh (Branching Simulation):
              </p>
              <ul className="space-y-3 list-none pl-0">
                <li className="flex items-start gap-2">
                  <span className="text-soviet-gold font-black mt-0.5">•</span>
                  <span><strong>Lựa chọn sinh tồn:</strong> Tại mỗi nút thắt, bạn sẽ đối mặt với các lựa chọn từ Phím <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs text-white">1</kbd> đến <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs text-white">9</kbd>. Mỗi quyết định phản ánh một trạng thái ý thức trước áp lực của vật chất.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-soviet-gold font-black mt-0.5">•</span>
                  <span><strong>Hệ quả tức thì:</strong> Nếu lựa chọn sai (tha hóa hoặc thất bại), hệ thống sẽ mô phỏng hậu quả thảm khốc của lựa chọn đó ngay lập tức.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-soviet-gold font-black mt-0.5">•</span>
                  <span><strong>Cơ chế "Tua ngược Biện chứng":</strong> Đừng sợ thất bại! Bạn có 5 giây "tua ngược" (Glitch effect) để quay về thời điểm ban đầu, từ đó rút ra bài học và đưa ra lựa chọn đúng đắn để kiến tạo một tương lai tốt đẹp hơn.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* TRÌNH PHÁT CUSTOM TOÀN DIỆN */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className={`shadow-2xl transition-all duration-300 relative ${isFullscreen
            ? 'w-screen h-screen border-0 rounded-none p-0 bg-black overflow-hidden flex flex-col justify-center'
            : 'bg-white border-4 border-soviet-red p-8 rounded-3xl flex flex-col gap-6'
            }`}
          style={isFullscreen ? { width: '100vw', height: '100vh', zIndex: 99999 } : {}}
        >
          {/* Vùng Video */}
          <div className={`bg-black overflow-hidden relative group ${isFullscreen ? 'absolute inset-0 w-full h-full border-0 rounded-none shadow-none' : 'aspect-video w-full rounded-2xl border-4 border-soviet-gold shadow-lg'
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

        {/* NÚT KIẾN THỨC ẨN */}
        <AnimatePresence>
          {((duration > 570 ? currentTime >= 570 : (duration > 0 && currentTime >= duration * 0.9)) && !showConclusion) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={() => setShowConclusion(true)}
                className="relative group px-10 py-5 bg-zinc-900 text-soviet-gold border-4 border-soviet-gold font-black uppercase text-sm tracking-widest rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden flex items-center gap-3"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-soviet-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                {/* Pulsing indicator */}
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-soviet-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-soviet-gold"></span>
                </span>
                <span>Kiến Thức Ẩn</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHẦN NỘI DUNG MỞ RỘNG: GIẢI MÃ TRIẾT HỌC */}
        <AnimatePresence>
          {showConclusion && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-16 bg-white border-4 border-soviet-red shadow-2xl p-8 md:p-12 rounded-3xl relative overflow-hidden text-zinc-800"
            >
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-soviet-red via-soviet-gold to-soviet-red" />

              <span className="px-4 py-1.5 bg-soviet-red/10 text-soviet-red text-xs font-black rounded-full uppercase tracking-widest block w-fit mb-6 mx-auto">
                Giải mã Triết học – Ý nghĩa sau những lựa chọn
              </span>

              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 leading-tight text-center">
                "Tồn tại xã hội quyết định ý thức"
              </h2>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-6 leading-tight text-center">
                Là định mệnh hay là sự lựa chọn?
              </h2>

              <p className="text-zinc-600 text-base font-semibold leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                Như bạn đã thấy qua trải nghiệm của Khánh, những áp lực về "cơm áo gạo tiền" hay những rào cản từ thực tại khắc nghiệt không chỉ là thử thách, mà chính là tồn tại xã hội đang định hình tư duy của mỗi cá nhân. Tuy nhiên, nếu dừng lại ở đó, con người sẽ chỉ là "nô lệ" của hoàn cảnh.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-soviet-red/30 transition-all flex flex-col justify-between animate-fade-in text-center">
                  <div>
                    <div className="w-10 h-10 bg-soviet-red text-white flex items-center justify-center rounded-xl font-black text-lg mb-4 shadow-md mx-auto">1</div>
                    <h4 className="text-lg font-black text-zinc-900 mb-2 leading-tight">Tính độc lập tương đối của Ý thức</h4>
                    <p className="text-zinc-500 text-sm font-semibold leading-relaxed">
                      Marx không phủ nhận tầm quan trọng của vật chất, nhưng ông cũng khẳng định rằng Ý thức xã hội có tính độc lập tương đối. Điều này có nghĩa là, dù thực tại có tàn khốc đến đâu, con người vẫn có khả năng nhận thức và phản kháng. Việc Khánh kiên định chọn "Phím 9" – chấp nhận thất bại vật chất để giữ gìn đạo đức – chính là biểu hiện của việc dùng ý thức tiến bộ để tác động ngược trở lại thực tại, tạo ra uy tín và nền tảng cho sự thành công bền vững sau này.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-soviet-red/30 transition-all flex flex-col justify-between animate-fade-in text-center">
                  <div>
                    <div className="w-10 h-10 bg-soviet-red text-white flex items-center justify-center rounded-xl font-black text-lg mb-4 shadow-md mx-auto">2</div>
                    <h4 className="text-lg font-black text-zinc-900 mb-2 leading-tight">Không có chỗ cho sự tha hóa</h4>
                    <p className="text-zinc-500 text-sm font-semibold leading-relaxed">
                      Một điểm quan trọng: Marx không bao giờ ủng hộ hay dung túng cho sự tha hóa dưới cái cớ "vì hoàn cảnh". Sự tha hóa (như việc Khánh chọn thỏa hiệp với cái ác, "tẩy xanh" doanh nghiệp) không phải là giải pháp, mà là quá trình con người tự đánh mất chính mình vào tay vật chất. Đó là khi con người biến thành "vật phẩm" trong tay các quy luật khách quan thay vì làm chủ chính mình.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-soviet-red/30 transition-all flex flex-col justify-between animate-fade-in text-center">
                  <div>
                    <div className="w-10 h-10 bg-soviet-red text-white flex items-center justify-center rounded-xl font-black text-lg mb-4 shadow-md mx-auto">3</div>
                    <h4 className="text-lg font-black text-zinc-900 mb-2 leading-tight">Bài học về sự Cải tạo</h4>
                    <p className="text-zinc-500 text-sm font-semibold leading-relaxed">
                      Triết học Marx dạy chúng ta không phải để ngồi chờ hoàn cảnh thay đổi, mà để cải tạo thực tại. Lựa chọn đúng đắn của bạn (Phím 9) không phải là sự từ bỏ vật chất, mà là sự kiên trì tích lũy giá trị (làm đúng quy trình, giữ sạch thuật toán) để tạo ra một "tồn tại xã hội" mới. Khi đó, ý thức tiến bộ sẽ trở thành động lực để thúc đẩy vật chất phát triển theo hướng tích cực.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-8 flex flex-col items-center text-center gap-6">
                <p className="text-zinc-500 text-sm font-bold italic max-w-2xl mx-auto">
                  Kết luận: Đời sống vật chất là điểm xuất phát, nhưng đạo đức và lý tưởng chính là la bàn để chúng ta không lạc lối trong cuộc hành trình cải tạo thế giới. Bạn đã chọn làm chủ vận mệnh của Khánh, hay để hoàn cảnh nhấn chìm lý tưởng của chính mình?
                </p>
                <Link
                  to="/overview"
                  className="px-8 py-4 bg-soviet-red text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-red-700 shadow-lg shadow-soviet-red/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Mục lục sản phẩm
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VideoSection;
