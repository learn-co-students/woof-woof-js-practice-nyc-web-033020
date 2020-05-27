//mistake #1, didnt put dogBar into DOMCONTENTLOADED
//so the HTML wasn't loaded before we tried searching for it
// fix: added dogBar declaration once the HTML is loaded.

// mistake #2, wrap the fetch in a function and call the fetch
// the fetch is parent of all the other functions, so you need to 
// wrap the fetch in a function and call it

//mistake #3, forgetting that all the other functions
// will be in the renderdogs function

//mistake #4, remember that we are adding a click event to
//the dog's span, and then information will pop up about that
//specific dog, so we need to add the dog's id to the span
//this way we can access the specific dog, in the db,
//through the specific dog span.

//mistake #5, I need to do the event.target.dataset.id
// not the dogSpan, it's a click event, here we are working
// with event target ids because we need to make sure,
// what the user CLICKS' id matches the dog's id in the db

//mistake #6, need this code after 
//document click event. dogsData.forEach(dog => { 
//need to iterate over each dog in the db
//so we are saying if the target's id is equal to
// this specific dog's id in the database THEN
// but first we need access to the dog's data in the db!
// only way to do this is line 46 

//mistake #7, need to use event.target.dataset.id to access the 
// event.targets id

//mistake #8, add a classname to the button ur clicking
// add class name in the html by doing <btn class = "TypeofDog" >
// this way u can do event.target.className === "TypeofDog" (btn's classname)

//mistake #9, have 2 document.addEventListeners with a click
// i need to only have one of these

//mistake #10, if u have 2 or more document clicks events, 
//u need event delegation with if statements to specificy the click

// mistake #11, need a patch to change from true to false
// need a patch to change from false to true
// AKA, need one patch for each toggle

//mistake #12, use console logs to find the id easily

//mistake #13, now that we have the id for our patch, we can just use this
// to change information about the dog's keys ourselves
// MANUALLY!

//mistake #14, when working with binary values of true and false
// you can set the values with a true or false (will line 100), ternary operator
// or you can do an if statement, liz (line 80)

document.addEventListener("DOMContentLoaded", function(e){
    const url = `http://localhost:3000/pups`
    const dogBar = document.querySelector("#dog-bar")
    const dogDiv = document.querySelector("#dog-info")

    const getData = () =>{
        fetch(url)
        .then(response => response.json())
        .then(renderDogs)
    }

    
    const renderDogs = (dogsData) => {
        dogsData.forEach(dog => {
            dogSpan = document.createElement("span")
            dogSpan.innerText = `${dog.name}`
            dogSpan.dataset.id = `${dog.id}`
            dogBar.append(dogSpan)
        })

        document.addEventListener("click", function(event){
            if (event.target.parentElement === dogBar){
                dogsData.forEach(dog => { 
                    // this here is the other way of setting good dog and bad dog
                        //if (event.target.dataset.id === `${dog.id}`) {
                        // if (dog.isGoodDog === true){
                        //     dogDiv.dataset.id = `${dog.id}`
                        //     dogDiv.innerHTML= 
                        //     `
                        //     <img src=${dog.image}>
                        //     <h2>${dog.name}</h2>
                        //     <button class="TypeofDog" >Good Dog!</button>
                        //     `
                        // }
                        
                    // }
                    
                    if (event.target.dataset.id === `${dog.id}`) {
                        dogDiv.dataset.id = `${dog.id}`
                        dogDiv.innerHTML= 
                        `
                        <img src=${dog.image}>
                        <h2>${dog.name}</h2>
                        <button class="TypeofDog" >${dog.isGoodDog? 'Good Dog!':'Bad Dog!'}</button>
                        `
                    }
                })
            } else if (event.target.className === "TypeofDog") {
                // get id of the dog for the patch
                const id = event.target.parentElement.dataset.id
                // now that we have the id, we can just use this
                // to change information about the dog's keys ourselves
                // MANUALLY!
                // const id = event.target.parent.parent.dataset.id
                // console.log(id)
                if (event.target.innerHTML === 'Good Dog!') {
                    // event.target.innerHTML = "false"
                    fetch(`${url}/${id}`, {
                            method: "PATCH",
                            headers: {
                                "accept": "application/json",
                                "content-type": "application/json"
                            },
                            body: JSON.stringify({isGoodDog: false})
                        }).then(event.target.innerHTML = "Bad Dog!")
                } else {
                    fetch(`${url}/${id}`, {
                        method: "PATCH",
                        headers: {
                            "accept": "application/json",
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({isGoodDog: true})
                    }).then(event.target.innerHTML = "Good Dog!")
                }

            }
        })         

    }

    getData()
})
