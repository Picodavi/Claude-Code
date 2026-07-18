"use client";

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
                    <i /><i /><i /><span>tu-negocio.com</span>
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
                    <div className="hero-mac__website-photo"><span /><i /></div>
                    <div className="hero-mac__website-cards">
                      {[0, 1, 2].map((entry) => (
                        <span key={entry}><i /><b /><small /></span>
                      ))}
                    </div>
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
