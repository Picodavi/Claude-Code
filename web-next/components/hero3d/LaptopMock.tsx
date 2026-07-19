"use client";

import Image from "next/image";
import picodaviScreen from "@/assets/picodavi-screen.webp";
import picodaviMobileScreen from "@/assets/picodavi-mobile-screen.png";
import iphoneFrame from "@/assets/iphone-frame.png";

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

      <div className="hero-phone__float">
        <div className="hero-phone__rig" data-hero-phone>
          <span className="hero-phone__reflection" />
          <div className="hero-phone__device">
            <div className="hero-phone__screen">
              <Image
                src={picodaviMobileScreen}
                alt=""
                fill
                sizes="44vw"
              />
              <span className="hero-phone__screen-accent" />
              <span className="panel-sweep" />
            </div>
            <Image
              className="hero-phone__frame"
              src={iphoneFrame}
              alt=""
              fill
              sizes="44vw"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
