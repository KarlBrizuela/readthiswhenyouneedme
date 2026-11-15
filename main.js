
lucide.createIcons();

const hugcount = document.getElementById("hug-count");
const emergencyhug = document.querySelector(".emergencyhug");

let count = 0;

emergencyhug.addEventListener("click", () => {

 
  count++;
  hugcount.textContent = count;

  
  const icons = ["💕", "✨", "💗", "🌸", "💖", "⭐"];

  for (let i = 0; i < 20; i++) {

    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.textContent =
      icons[Math.floor(Math.random() * icons.length)];

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
