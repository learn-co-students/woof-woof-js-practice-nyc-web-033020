const PUPS_URL = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", () => {

    loadPups()
})

document.addEventListener("click", (e) =>{
    if (e.target.className === 'pup-span'){
        loadPupInfo(e.target.dataset.id)
    }
})

document.addEventListener("click", (e)=>{
    if (e.target.className ==='good-bad-button'){
        // console.log(e.target.textContent)
        toggleGoodDog(e.target.parentNode.dataset.id, e.target.textContent)
    }
})

document.addEventListener("click", ()=>{
    if (event.target.id === "good-dog-filter"){
        if (event.target.textContent ==="Filter good dogs: OFF"){
            event.target.textContent="Filter good dogs: ON"
            loadFilteredPups()
        } else if(event.target.textContent ==="Filter good dogs: ON"){
            event.target.textContent = "Filter good dogs: OFF"
            loadPups()
        }
    }
})
// This function filters for good pups

const loadFilteredPups = () =>{
    fetch(PUPS_URL)
    .then(r => r.json())
    .then(filterPups)
}

const filterPups = (pups) =>{
    const dogBarDiv = document.getElementById('dog-bar')
    dogBarDiv.innerHTML = ""
    const goodDogs = pups.filter(pup => {
        return pup.isGoodDog === true
    })
    makeAllPups(goodDogs)
}

// This toggles the good/bad dog button
let toggleGoodDog = (pupID,goodBadString) =>{
    if (goodBadString === "Bad Dog!"){
    fetch(`${PUPS_URL}/${pupID}`,{
        method : "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
            isGoodDog : true
        })
    })
    .then(response => loadPupInfo(pupID))
    }else if(goodBadString === "Good Dog!"){
        fetch(`${PUPS_URL}/${pupID}`,{
            method : "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                isGoodDog : false
            })
        })
        .then(response => loadPupInfo(pupID))
    }
}

// This stuff loads the pup info

const loadPupInfo = (pupID) =>{
    fetch(`${PUPS_URL}/${pupID}`)
    .then(r => r.json())
    .then(makePupInfoElements)
}

const makePupInfoElements = (pup) =>{
    const pupInfoDiv = document.getElementById('dog-info')
    pupInfoDiv.dataset.id = pup.id
    pupInfoDiv.innerHTML =`
    <img src="${pup.image}">
    <h2>${pup.name}</h2>
    <button class = "good-bad-button">${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
    `
}


// This stuff loads the pups

let loadPups = () =>{
    const dogBarDiv = document.getElementById('dog-bar')
    dogBarDiv.innerHTML = ""
    fetch(PUPS_URL)
    .then(r => r.json())
    .then(makeAllPups)
}

let makeAllPups = (pups) =>{
    pups.forEach(pup => makePup(pup))
}

let makePup = (pup) =>{
    const dogBarDiv = document.getElementById('dog-bar')
    const newPupSpan = document.createElement('span')
    newPupSpan.textContent = pup.name
    newPupSpan.className = 'pup-span'
    newPupSpan.dataset.id = pup.id
    dogBarDiv.append(newPupSpan)
}