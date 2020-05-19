/*  USER STORY

   x ADD PUPS TO DOG BAR

    PSEUDO CODE

   x Get #dog-bar div
   x Fetch for all pup objects
   x Create span with dog info
   x Append span to dog-bar

    USER STORY

   x SHOW MORE INFO ABOUT EACH PUP

    PSEUDO CODE

   x Create each dog's but do not append yet (data-bind to find dog by name or id)
   x    Each dog should have img tag, h2
   x    Create a button that says "Good Dog!" or "Bad Dog!" based on isGoodDog condition

    Add click event listener to document (listen for click on pup's span)
   x    Get dog-info div
   x    When clicked, append dog info to dog-info div
   x    When a different dog is clicked, remove() current dog info and append new dog info
   x    When same dog is clicked, remove() current dog info

    USER STORY
    
   x TOGGLE GOOD DOG

    PSEUDO CODE

   x Add good/bag dog condition to click event listener. 
   x When clicked, button should change text
   x Make fetch(patch) request to update pups dog goodness

    USER STORY

   x FILTER GOOD DOGS

    PSEUDO CODE

   x Add filter good dogs condition to click event
   x When clicked, button should change from OFF to ON, and vice versa.
   x If button is ON, dog bar will show only goodDogs(badDogs set style.display = block). If off, show all dogs.  


  
*/

const url = "http://localhost:3000/pups"
const dogBar = document.querySelector('#dog-bar')
const dogDisplay = document.querySelector('#dog-info')
const urlHeaders = {
    'Content-Type' : 'application/json',
    'Accept': 'application/json'
}

const goodDoggoCheck = (goodness) => {
    if (goodness === true){
        return "Good Dog!"
    } else {
        return "Bad Dog!"
    }
}

createDoggosSpan()

document.addEventListener('click', e => {
     
    
    const makeDogDisplay = () => {

        fetch(url)
            .then(resp => resp.json())
            .then(dogs => {
                dogs.forEach(dog => {
                    if (dog.name === e.target.textContent){
                    const dogInfo = createDoggosInfo(dog)
                    dogDisplay.appendChild(dogInfo)
                    }
                })
            })
        }

    const changeDogGoodness = bool => {

        fetch(`${url}/${e.target.parentNode.id}`,{
            method: 'PATCH',
            headers: urlHeaders,
            body: JSON.stringify({
                isGoodDog: bool
            })
        }) 
    }

    if ((e.target.className === 'doggoSpan') && (dogDisplay.childElementCount === 0)){
        
        makeDogDisplay()

    } else if ((e.target.className === 'doggoSpan') && (e.target.textContent !== dogDisplay.children[0].dataset.name)){

        dogDisplay.removeChild(dogDisplay.children[0])
        makeDogDisplay()

    } else if ((e.target.className === 'doggoSpan') && (e.target.textContent === dogDisplay.children[0].dataset.name)){

        dogDisplay.removeChild(dogDisplay.children[0])
        
    } else if (e.target.id === "button"){ 

        const goodness = document.querySelector('#button').textContent
        
        if (goodness === "Good Dog!"){
            changeDogGoodness(false)
        } else {
            changeDogGoodness(true)
        }

    } else if ((e.target.textContent.toLowerCase().includes("off")) && (e.target === document.querySelector('#good-dog-filter'))){
        e.target.textContent = "Filter good dogs: ON"
        const badDoggos = []
        fetch(url)
        .then(resp => resp.json())
        .then(doggo => {
            doggo.forEach(dog => {
                if (dog.isGoodDog === false){
                    badDoggos.push(dog)
                }
            })
            badDoggos.forEach(dog => {
                const span = document.querySelector(`#${dog.name}`)
                span.style.display = "none"
            })
        })
        
    } else if ((e.target.textContent.toLowerCase().includes("on")) && (e.target === document.querySelector('#good-dog-filter'))){
        e.target.textContent = "Filter good dogs: OFF"
        const badDoggos = []
        fetch(url)
        .then(resp => resp.json())
        .then(doggo => {
            doggo.forEach(dog => {
                if (dog.isGoodDog === false){
                    badDoggos.push(dog)
                }
            })
            badDoggos.forEach(dog => {
                const span = document.querySelector(`#${dog.name}`)
                span.style.display = ""
            })
        })
    }
})

function createDoggosSpan(){
    fetch(url)
    .then(resp => resp.json())
    .then(doggos => {
        doggos.forEach(dog => {
            const dogSpan = document.createElement('span')
            
            dogSpan.id = dog.name
            dogSpan.textContent = dog.name
            dogSpan.className = "doggoSpan"
            dogBar.appendChild(dogSpan)
        })
    })
}

function createDoggosInfo(dog){
    const dogInfo = document.createElement('div')
    dogInfo.className = "doggo-info"
    dogInfo.dataset.name = `${dog.name}`
    dogInfo.id = `${dog.id}`
    dogInfo.dataset.good = `${dog.isGoodDog}`
    dogInfo.innerHTML = `
    <img src="${dog.image}">
    <h2>${dog.name}</h2>
    <button id="button">${goodDoggoCheck(dog.isGoodDog)}</button>
    `
    return dogInfo
}








