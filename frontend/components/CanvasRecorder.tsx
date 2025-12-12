import { useEffect } from "react";

const RECORD_DURATION = 20000; // ms (must match LOOP_DURATION * 1000)
const FPS = 60;

function CanvasRecorder() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const stream = canvas.captureStream(FPS);

    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm; codecs=vp9",
      videoBitsPerSecond: 8_000_000, // high quality
    });

    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      // auto-download
      const a = document.createElement("a");
      a.href = url;
      a.download = "synthetic-hero-background.webm";
      a.click();

      URL.revokeObjectURL(url);
      console.log("✅ Recording saved");
    };

    console.log("⏺ Recording started");
    recorder.start();

    setTimeout(() => {
      recorder.stop();
      console.log("⏹ Recording stopped");
    }, RECORD_DURATION);
  }, []);

  return null;
}

export default CanvasRecorder;