# 🦎 Chameleon JS

Colorful your header! Set sections background color to header.

A small (~8kb), dependency-free, javascript utility.

Please, feel free to use and improve it! 🤘

See [demo](https://codepen.io/oim/pen/ZEaoNQN)

## 💾 Installation

Donwload this `chameleon` folder

It contains `chameleon.js` class and `helpers.js` functions

```js
import Chameleon from "./chameleon/chameleon.js";
```

## 🔌 Usage

Define:

- an `header` element
- an `array` of elements to get background-color
- (optional) object `options` { offset, lightClass, darkClass }

```js
// Header element
const header = document.querySelector(".chameleon-js");
// Array of sections
const arrayElems = document.querySelectorAll(".watch");
// Init Chameleon
const chameleon = new Chameleon(header, arrayElems, {
  offset: 0,
  lightClass: "light-text",
  darkClass: "dark-text",
});
chameleon.init;
```

## 📝 Markup

```html
<header class="chameleon-js">...</header>
<section class="cyan">...</section>
<section class="magenta watch">...</section>
<section class="yellow">...</section>
<section class="watch">
  <!-- Works with image too! return rgba(0, 0, 0, 0) -->
  <img src="https://unsplash.it/1440/768" alt="" />
</section>
<section class="black watch">...</section>
...
```

## Browser Support

Chameleon supports all modern browsers.
