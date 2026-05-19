import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 

export default function SakuraRain({ id }) {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const sakuraConfig = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 12, density: { enable: true, area: 800 } },
      color: { value: "#ffffff" },
      shape: {
        type: "image",
        options: {
          image: [
            { src: "/sakura_1.png", width: 100, height: 100 },
            { src: "/sakura_2.png", width: 100, height: 100 },
            { src: "/sakura_3.png", width: 100, height: 100 }
          ]
        }
      },
      opacity: {
        value: { min: 0.3, max: 0.7 },
        animation: { enable: true, speed: 1, sync: false }
      },
      size: {
        value: { min: 10, max: 20 },
        animation: { enable: true, speed: 2, sync: false }
      },
      move: {
        enable: true,
        speed: { min: 1, max: 3 }, 
        direction: "bottom", 
        random: true,
        straight: false,
        outModes: { default: "out" },
        attract: { enable: true, rotate: { x: 600, y: 1200 } }
      },
      rotate: {
        value: { min: 0, max: 360 },
        animation: { enable: true, speed: 5, sync: false }
      },
      wobble: { enable: true, distance: 10, speed: 10 }
    },
    retina_detect: true
  };

  return (
    <Particles
      id={id}
      init={particlesInit}
      className="absolute inset-0 h-full w-full"
      options={sakuraConfig}
    />
  );
}