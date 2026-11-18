lucide.createIcons();

const hugcount = document.getElementById("hug-count");
const emergencyhug = document.querySelector(".emergencyhug");
const hugclose = document.getElementById("hugclose");
const hugmodal = document.getElementById("hugmodal");
const oknow = document.getElementById("oknow");
const anothersqueeze = document.getElementById("anothersqueeze");

let count = 0;

emergencyhug.addEventListener("click", () => {
  hugmodal.classList.add("active");

  count++;
  hugcount.textContent = count;

  const icons = ["💕", "✨", "💗", "🌸", "💖", "⭐"];

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.textContent = icons[Math.floor(Math.random() * icons.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120 + 50;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);

    emergencyhug.appendChild(particle);

    particle.addEventListener("animationend", () => {
      particle.remove();
    });
  }
});

hugclose.addEventListener("click", () => {
  hugmodal.classList.remove("active");
});

oknow.addEventListener("click", () => {
  hugmodal.classList.remove("active");
});

anothersqueeze.addEventListener("click", () => {

  count++;
  hugcount.textContent = count;

  
  const hugicons = ["💕", "✨", "💗", "🌸", "💖", "⭐"];

  for (let k = 0; k < 20; k++) {
    const hug = document.createElement("span");

    hug.classList.add("hug");
    hug.textContent = hugicons[Math.floor(Math.random() * hugicons.length)];

    const angulo = Math.random() * Math.PI * 2;
    const distansya = Math.random() * 120 + 50;

    const hor = Math.cos(angulo) * distansya;
    const ver = Math.sin(angulo) * distansya;

    hug.style.setProperty("--hor", `${hor}px`);
    hug.style.setProperty("--ver", `${ver}px`);

    anothersqueeze.appendChild(hug);

    hug.addEventListener("animationend", () => {
      hug.remove();
   });
  }
});
