const state = {
    pupID: null,
    isGoodDog: null
}

function renderPups(pupsList) {
    // console.log(pupsList)
    const dogBar = document.getElementById("dog-bar")
    pupsList.forEach(pup => {
        dogBar.innerHTML += `
        <span id=${pup.id}>${pup.name}</span>
        `
    })
}
// if the element is in the index.html file, add the
// event listener to the element
// if the element is created in javascript
// use event delegation

//master detail pattern
//a list of things
// clicking on an item, sets the id of that item in the state
// and sometimes u need to set additional properties on the state
// that can be used later on in the patch

// when u get an error, take a berathe in, breathe out slowly
// tell urself its gonna be okay
// read at the error message, click on the very first file
// with line number, then think how did i get here to this line
// look at the function name, go back to the error
// work your way backwards through the list of things u can click on
//im hapyy when i get an error message

// remember to close tags if they have to be closed <li></li>
// focus on functionality, give errors a max of 2-3 searches, 10 min
// 1 min one search

function renderPupsSpanWithData() {
    fetch(`http://localhost:3000/pups`)
        .then(response => response.json())
        .then((pups) => {
            renderPups(pups)
        })
}

function clickSpanEvents() {
    const dogBar = document.getElementById("dog-bar")
    dogBar.addEventListener("click", function (event) {
        state.pupID = event.target.id
        // console.log('state', state)
        fetch(`http://localhost:3000/pups/${state.pupID}`)
            .then(res => res.json())
            .then(pup => renderPupDetail(pup));

    })
}

function renderPupDetail(pup) {
    // console.log(pup)
    state.isGoodDog = pup.isGoodDog
    const pupInfo = document.getElementById("dog-info")
    let label = "";
    if (pup.isGoodDog)
        label = "Good Dog!"
    else
        label = "Bad Dog!"

    pupInfo.innerHTML = `
    <img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button class="DogType" >${label}</button>
    `

}

function reversePupButton() {
    document.addEventListener("click", e => {
        if (e.target.className === "DogType" /*&& state.isGoodDog === true*/) {
            fetch(`http://localhost:3000/pups/${state.pupID}`, {
                method: "PATCH",
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                },
                body: JSON.stringify({ isGoodDog: !state.isGoodDog })
            })
            .then(response => response.json())
            .then(pup => {
                renderPupDetail(pup)
            })
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    renderPupsSpanWithData();
    clickSpanEvents();
    reversePupButton();

});

// Mock Data
//why didnt my mock data workk for all of them at once
//for the individual pup it did work
// const mockPup =
//     {
//       "id": 1,
//       "name": "Mr. Bonkers",
//       "isGoodDog": false,
//       "image": "https://curriculum-content.s3.amazonaws.com/js/woof-woof/dog_1.jpg"
//     }


    //problem: i keep getting null for the btn bc its created
    //later on in the program
    //if you have to wait until the button is there
    // just do e.target.identifier === identifier

        // else {
        //     fetch(`http://localhost:3000/pups/${state.pupID}`, {
        //         method: "PATCH",
        //         headers: {
        //             "accept": "application/json",
        //             "content-type": "application/json"
        //         },
        //         body: JSON.stringify({ isGoodDog: true })
        //     })
        //     .then(response => response.json())
        //     .then(pup => {
        //         renderPupDetail(pup)
        //     })
        // }