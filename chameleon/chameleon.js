import { lightOrDark, extend } from "./helpers.js";

/**
 * Set section background color to header
 *
 * @param   {Object} header - Header element to change
 * @param   {Array} elems - Elements to get value
 * @param   {Object} options - Object to set options
 */
export default class Chameleon {
  constructor(header, elems, options = {}) {
    this.header = header;
    this.elems = elems;
    this.elemsArray = [];
    this.latestKnownScrollY = 0;
    this.ticking = false;
    this.active = false;
    this.currentColor = "";
    this.options = extend({}, Chameleon.defaultOptions, options);
    window.addEventListener("scroll", this.onScroll, false);
  }

  get init() {
    this.getElemsDatas();
    this.onLoad();
  }

  onLoad = () => {
    this.getElemsBgColor(window.scrollY);
  };

  onScroll = () => {
    this.latestKnownScrollY = window.scrollY;
    this.requestTick();
  };

  requestTick = () => {
    if (!this.ticking) {
      requestAnimationFrame(this.animateHeader);
    }
    this.ticking = true;
  };

  animateHeader = () => {
    let currentScrollY = this.latestKnownScrollY;
    this.ticking = false;

    if (!this.active) {
      this.destroy();
    }

    this.active = false;
    if (!this.active) {
      this.getElemsBgColor(currentScrollY);
    }
  };

  changeHeaderBgColor = (bgColor) => {
    this.header.style.cssText = "background-color:" + bgColor + ";";
  };

  getElemsDatas = () => {
    for (let elem of this.elems) {
      const top = elem.offsetTop;
      const bottom = top + elem.offsetHeight;
      const getSectionBgColor = window.getComputedStyle(elem).backgroundColor;
      this.elemsArray.push({
        top: top + this.options.offset,
        bottom: bottom,
        bgColor: getSectionBgColor,
      });
    }

    return this.elemsArray;
  };

  getElemsBgColor = (position) => {
    for (let elem of this.elemsArray) {
      if (position >= elem.top && position <= elem.bottom) {
        this.currentColor = elem.bgColor;
        this.getBrightness(this.currentColor);
        this.changeHeaderBgColor(elem.bgColor);
        this.active = true;
      }
    }
  };

  destroy = () => {
    this.changeHeaderBgColor("");
    this.header.classList.remove(
      this.options.darkClass,
      this.options.lightClass
    );
  };

  getBrightness = (currentColor) => {
    this.brightness = lightOrDark(currentColor);

    if (this.brightness == "light") {
      this.header.classList.remove(this.options.darkClass);
      this.header.classList.add(this.options.lightClass);
    } else if (this.brightness == "dark") {
      this.header.classList.remove(this.options.lightClass);
      this.header.classList.add(this.options.darkClass);
    }
  };
}

Chameleon.defaultOptions = {
  offset: -80,
  darkClass: "text__dark",
  lightClass: "text__light",
};
