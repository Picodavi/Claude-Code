"use client";

import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type LaptopMockProps = {
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  pointerEnabled: boolean;
  reducedMotion: boolean;
};

export function LaptopMock({
  progress,
  pointerX,
  pointerY,
  pointerEnabled,
  reducedMotion,
}: LaptopMockProps) {
  const scrollRotateY = useTransform(
    progress,
    [0, 0.18, 0.48, 0.72, 1],
    [-10, 14, 176, 322, 360],
  );
  const scrollRotateX = useTransform(
    progress,
    [0, 0.2, 0.52, 0.78, 1],
    [4, -2, 7, 1, -3],
  );
  const scaleRaw = useTransform(
    progress,
    [0, 0.18, 0.5, 0.78, 1],
    [0.82, 1, 0.88, 1.08, 1.42],
  );
  const xRaw = useTransform(
    progress,
    [0, 0.22, 0.5, 0.78, 1],
    ["8%", "0%", "-4%", "-13%", "-18%"],
  );
  const yRaw = useTransform(
    progress,
    [0, 0.25, 0.52, 0.8, 1],
    ["8%", "0%", "-5%", "7%", "19%"],
  );
  const pointerRotateY = useTransform(pointerX, [-1, 1], [-7, 7]);
  const pointerRotateX = useTransform(pointerY, [-1, 1], [4, -4]);
  const rotateYRaw = useTransform(() =>
    scrollRotateY.get() + (pointerEnabled ? pointerRotateY.get() : 0),
  );
  const rotateXRaw = useTransform(() =>
    scrollRotateX.get() + (pointerEnabled ? pointerRotateX.get() : 0),
  );
  const rotateY = useSpring(rotateYRaw, { stiffness: 88, damping: 20, mass: 0.55 });
  const rotateX = useSpring(rotateXRaw, { stiffness: 88, damping: 20, mass: 0.55 });
  const scale = useSpring(scaleRaw, { stiffness: 86, damping: 21, mass: 0.6 });

  return (
    <div className="hero-mac" aria-hidden>
      <div className="hero-mac__float">
        <motion.div
          className="hero-mac__rig"
          style={
            reducedMotion
              ? { rotateX: 2, rotateY: -8, scale: 0.94 }
              : {
                  rotateX,
                  rotateY,
                  scale,
                  x: xRaw,
                  y: yRaw,
                  transformStyle: "preserve-3d",
                }
          }
        >
          <span className="hero-mac__reflection" />

          <div className="hero-mac__lid">
            <div className="hero-mac__back">
              <span className="hero-mac__brand">
                Picodavi<span>.</span>
              </span>
              <i />
            </div>

            <div className="hero-mac__front">
              <span className="hero-mac__camera" />
              <div className="hero-mac__screen">
                <div className="hero-mac__browserbar">
                  <i />
                  <i />
                  <i />
                  <span>tu-negocio.com</span>
                </div>
                <div className="hero-mac__website">
                  <div className="hero-mac__website-nav">
                    <b>Ca la Núria</b>
                    <span><i /><i /><i /></span>
                  </div>
                  <div className="hero-mac__website-hero">
                    <small>Sabores de siempre</small>
                    <strong>Tu negocio,<br />online.</strong>
                    <em>Reservar <span>→</span></em>
                  </div>
                  <div className="hero-mac__website-photo">
                    <span />
                    <i />
                  </div>
                  <div className="hero-mac__website-cards">
                    {[0, 1, 2].map((item) => (
                      <span key={item}><i /><b /><small /></span>
                    ))}
                  </div>
                </div>
                <span className="panel-sweep" />
              </div>
            </div>
          </div>

          <div className="hero-mac__hinge" />
          <div className="hero-mac__base"><span /></div>
        </motion.div>
      </div>
    </div>
  );
}
