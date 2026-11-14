lucide.createIcons();

let hugcount = document.getElementById("hug-count");
const emergencyhug = document.querySelector(".emergencyhug");
let count = 0;



//for counting hugs
emergencyhug.addEventListener("click",  () => {
  count++;
  hugcount.textContent = count;
});

emergencyhug.addEventListener('click', ()=> {
     
const icons = ["💕","✨","💗","🌸","💖","⭐"]

for(let i= 0; i < 15; i++){

    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.textContent = icons[Math.floor(Math.random() * icons.length)];

   const angle = Math.random() * Math.PI * 2;
   const distance = Math.random() * 100 + 40;

   const x = Math.cos(angle) * distance;
   const y = Math.sin(angle) * distance;

   particle.style.left = "50%";
   particle.style.top = "50%";

   emergencyhug.appendChild(particle);

   particle.addEventListener("animation", ()=>{
    particle.remove();

   } )

}

})

