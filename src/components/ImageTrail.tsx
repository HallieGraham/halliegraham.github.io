// @ts-nocheck — legacy class helpers use implicit fields on classes.
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import "./ImageTrail.css";

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e, rect) {
  let clientX = 0;
  let clientY = 0;
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  return {
    x: Math.max(0, Math.min(rect.width, x)),
    y: Math.max(0, Math.min(rect.height, y)),
  };
}

function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

class ImageItem {
  DOM = { el: null, inner: null };
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect = null;

  constructor(DOM_el) {
    this.DOM.el = DOM_el;
    this.DOM.inner = this.DOM.el.querySelector(".content__img-inner");
    this.getRect();
    this.initEvents();
  }
  initEvents() {
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    window.addEventListener("resize", this.resize);
  }
  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }
}

class ImageTrailVariant4 {
  constructor(container) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll(".content__img")].map(
      (img) => new ImageItem(img)
    );
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.onPointerMove = (ev) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };

    this.initRender = (ev) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      window.removeEventListener("mousemove", this.initRender);
      window.removeEventListener("touchmove", this.initRender);
    };

    // Listen on window so this can be used as a non-interactive background.
    window.addEventListener("mousemove", this.onPointerMove, { passive: true });
    window.addEventListener("touchmove", this.onPointerMove, { passive: true });
    window.addEventListener("mousemove", this.initRender, { passive: true });
    window.addEventListener("touchmove", this.initRender, { passive: true });
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition =
      this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance !== 0) {
      dx /= distance;
      dy /= distance;
    }
    dx *= distance / 100;
    dy *= distance / 100;

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: "power1",
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2,
          filter: `brightness(${Math.max((400 * distance) / 100, 100)}%) contrast(${Math.max((400 * distance) / 100, 100)}%)`,
        },
        {
          duration: 0.4,
          ease: "power1",
          scale: 1,
          filter: "brightness(100%) contrast(100%)",
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: "power3",
          opacity: 0,
        },
        0.4
      )
      .to(
        img.DOM.el,
        {
          duration: 1.5,
          ease: "power4",
          x: `+=${dx * 110}`,
          y: `+=${dy * 110}`,
        },
        0.05
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }
}

const variantMap = {
  4: ImageTrailVariant4,
};

export default function ImageTrail({ items = [], variant = 4 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!items.length) return;

    const Cls = variantMap[variant] || variantMap[4];
    new Cls(containerRef.current);
  }, [variant, items]);

  return (
    <div className="content" ref={containerRef}>
      {items.map((url, i) => (
        <div className="content__img" key={i}>
          <div
            className="content__img-inner"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
}

