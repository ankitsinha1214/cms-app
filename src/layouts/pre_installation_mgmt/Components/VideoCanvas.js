import React, { useRef, useEffect } from 'react';

const VideoCanvas = ({ videoSrc }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const ctx = canvas.getContext('2d');

      video.addEventListener('play', () => {
        const draw = () => {
          if (!video.paused && !video.ended) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(draw);
          }
        };
        draw();
      });
    }
  }, [videoSrc]);

  return (
    <div>
      <video
        ref={videoRef}
        src={videoSrc}
        controls
        style={{ display: 'none' }} // Hide video element if only canvas is needed
      />
      <canvas ref={canvasRef} height={360} style={{ border: '1px solid #000' }} />
    </div>
  );
};

export default VideoCanvas;
