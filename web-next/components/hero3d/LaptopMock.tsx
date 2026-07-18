"use client";

import Image from "next/image";
import picodaviScreen from "@/assets/picodavi-screen.png";

export function LaptopMock() {
  return (
    <div className="hero-mac" aria-hidden>
      <div className="hero-mac__float">
        <div className="hero-mac__rig" data-hero-mac>
          <div className="hero-mac__pointer" data-hero-pointer>
            <span className="hero-mac__reflection" />

            <div className="hero-mac__lid">
              <div className="hero-mac__back">
                <span className="hero-mac__brand">Picodavi<span>.</span></span>
                <i />
              </div>

              <div className="hero-mac__front">
                <span className="hero-mac__camera" />
                <div className="hero-mac__screen">
                  <div className="hero-mac__browserbar">
                    <i /><i /><i /><span>picodavi.com</span>
                  </div>
                  <div className="hero-mac__capture">
                    <Image
                      src={picodaviScreen}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 900px) 90vw, 48vw"
                    />
                  </div>
                  <span className="hero-mac__screen-accent" />
                  <span className="panel-sweep" />
                </div>
              </div>
            </div>

            <div className="hero-mac__hinge" />
            <div className="hero-mac__base"><span /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
