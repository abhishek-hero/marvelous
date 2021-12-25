let timerId;
let characterData;
let source = 'play'

let audio = document.querySelector("#audio")
let song = document.querySelector('#song')

audio.addEventListener('click', () => {

    if (source == 'play') {
        audio.src = '../mute.png'
        song.play()
        source = 'mute'
    } else if (source == 'mute') {
        audio.src = '../play.png'
        source = 'play'
        song.pause()
    }
})

const showDetails = (element) => {

    let localData = localStorage.setItem(
        "characterDetails",
        JSON.stringify(element)
    );
    document.getElementById("characterName").value = null
    window.location.href = 'showDetails.html'
};

let showDiv = document.querySelector("#showData-div");
const appendToDom = (data) => {

    if (characterData == undefined) {
        showDiv.style.display = "none";
        return;
    }

    showDiv.style.display = "block";
    showDiv.innerHTML = null
    showDiv.classList.add("showDiv");
    showDiv.style.margin = "auto";
    showDiv.style.marginTop = "50px";

    data.forEach((element) => {
        let div = document.createElement("div");
        div.classList.add("character-div");

        let nameTag = document.createElement("p");
        nameTag.innerText = element.name;

        nameTag.addEventListener('click', () => {
            showDetails(element)
        })

        div.append(nameTag);
        showDiv.append(div);
    });
};

const searchChar = async () => {
    let charname = document.getElementById("characterName").value;

    if (charname.length < 2) {
        return false;
    }

    let response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${charname}&limit=5&ts=abhishek&apikey=0f5864060da9aad0ee266ba6afb22792&hash=7077e62c9ce7c5f8ccb6638c7fce74a9`
    );

    let { data } = await response.json();

    characterData = data.results;

    if (characterData !== undefined) {
        console.log(characterData);
        appendToDom(characterData);
    }

};

const debounce = (searchChar, delay) => {
    if (timerId) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
        searchChar();
    }, delay);
};
