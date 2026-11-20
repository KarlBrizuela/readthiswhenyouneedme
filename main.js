
lucide.createIcons();



const hugcount = document.getElementById("hug-count");
const emergencyhug = document.querySelector(".emergencyhug");
const hugclose = document.getElementById("hugclose");
const hugmodal = document.getElementById("hugmodal");
const oknow = document.getElementById("oknow");
const anothersqueeze = document.getElementById("anothersqueeze");

const envelopecontainer = document.querySelector("#envelopeContainer");

const letterimage = document.getElementById("letterimage");
const letterEmoji = document.getElementById("letterEmoji");
const letterCategory = document.getElementById("letterCategory");
const letterTitle = document.getElementById("letterTitle");
const letterBody = document.getElementById("letterBody");

const letterModal = document.getElementById("letterModal");
const letterClose = document.getElementById("letterClose");

const envelopeSearch = document.getElementById("envelopeSearch");
const envelopeFilters = document.getElementById("envelopeFilters");
const envelopeCount = document.getElementById("envelopeCount");
const clearSearch = document.getElementById("clearSearch");
const resetFilters = document.getElementById("resetFilters");




let count = 0;

let allLetters = [];

let activeFilter = "all";




const backgroundMusic = new Audio();

backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

const playLetterMusic = (musicPath) => {

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    backgroundMusic.src = musicPath;
    backgroundMusic.load();

    backgroundMusic.play().catch((error) => {
        console.error("Unable to play music:", error);
    });

};

const stopLetterMusic = () => {

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

};




const createHugParticles = (element, particleClass, xProperty, yProperty) => {

    const icons = ["💕", "✨", "💗", "🌸", "💖", "⭐"];

    for (let i = 0; i < 20; i++) {

        const particle = document.createElement("span");

        particle.classList.add(particleClass);

        particle.textContent =
            icons[Math.floor(Math.random() * icons.length)];

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 120 + 50;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.setProperty(xProperty, `${x}px`);
        particle.style.setProperty(yProperty, `${y}px`);

        element.appendChild(particle);

        particle.addEventListener("animationend", () => {
            particle.remove();
        });

    }

};




emergencyhug.addEventListener("click", () => {

    hugmodal.classList.add("active");

    count++;

    hugcount.textContent = count;

    createHugParticles(
        emergencyhug,
        "particle",
        "--x",
        "--y"
    );

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

    createHugParticles(
        anothersqueeze,
        "hug",
        "--hor",
        "--ver"
    );

});




const loadEnvelopes = async () => {

    try {

        const response = await fetch("./data/letters.json");

        if (!response.ok) {
            throw new Error("Failed to load letters.");
        }

        allLetters = await response.json();

        renderEnvelopes();

    } catch (error) {

        console.error("Envelope Error:", error);

        envelopecontainer.innerHTML = `
            <div class="no-envelopes">
                <span>💔</span>
                <h3>Something went wrong</h3>
                <p>Unable to load your letters. Please try again.</p>
            </div>
        `;

    }

};




const renderEnvelopes = () => {

    const searchValue = envelopeSearch.value
        .toLowerCase()
        .trim();


    const filteredLetters = allLetters.filter((letter) => {

        const category = letter.category.toLowerCase();
        const title = letter.title.toLowerCase();
        const message = letter.message.toLowerCase();


        const matchesSearch =
            category.includes(searchValue) ||
            title.includes(searchValue) ||
            message.includes(searchValue);


        const matchesCategory =
            activeFilter === "all" ||
            category === activeFilter.toLowerCase();

        return matchesSearch && matchesCategory;

    });


    envelopecontainer.innerHTML = "";


    envelopeCount.textContent =
        `Showing ${filteredLetters.length} of ${allLetters.length} Letters`;


    if (filteredLetters.length === 0) {

        envelopecontainer.innerHTML = `
            <div class="no-envelopes">
                <span>💌</span>
                <h3>No letters found</h3>
                <p>Maybe try searching for something else?</p>
            </div>
        `;

        return;

    }


    filteredLetters.forEach((letter) => {

        const envelopedCard = document.createElement("div");

        envelopedCard.classList.add("envelope-card");

        envelopedCard.style.background = letter.color;

        envelopedCard.innerHTML = `
            <div class="envelope-emoji">
                ${letter.emoji}
            </div>

            <div class="envelope-icon">
                💌
            </div>

            <h3>${letter.category}</h3>

            <p>${letter.title}</p>

            <span class="envelope-label">
                Open Me
            </span>
        `;


        

        envelopedCard.addEventListener("click", () => {

           

            letterimage.src = letter.image;

            // letterEmoji.textContent = letter.emoji;

            // letterCategory.textContent = letter.category;

            letterTitle.textContent = letter.title;

            letterBody.textContent = letter.message;


          

            letterModal.classList.add("active");


            

            if (letter.music) {

                playLetterMusic(letter.music);

            } else {

                stopLetterMusic();

            }

        });


        envelopecontainer.appendChild(envelopedCard);

    });

};



envelopeSearch.addEventListener("input", () => {

    renderEnvelopes();

});




envelopeFilters.addEventListener("click", (event) => {

    const button = event.target.closest(".filter-btn");

    if (!button) return;

    activeFilter = button.dataset.filter.toLowerCase();


    document.querySelectorAll(".filter-btn").forEach((btn) => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    renderEnvelopes();

});




clearSearch.addEventListener("click", () => {

    envelopeSearch.value = "";

    renderEnvelopes();

});




resetFilters.addEventListener("click", () => {

    envelopeSearch.value = "";

    activeFilter = "all";


    document.querySelectorAll(".filter-btn").forEach((btn) => {

        btn.classList.toggle(
            "active",
            btn.dataset.filter === "all"
        );

    });


    renderEnvelopes();

});




letterClose.addEventListener("click", () => {

    letterModal.classList.remove("active");

    stopLetterMusic();

});




loadEnvelopes();
