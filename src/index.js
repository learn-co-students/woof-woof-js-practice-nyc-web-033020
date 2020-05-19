// [x]Upon Loading, get the name of dogs from database with fetch 
// [x]get the blue area 
// [x]create a span for each dog witht eh don's name as innerhtml
// ### STEP 2: ADD PUPS TO DOG BAR
// [x]On the page, there is a `div` with the id of `"dog-bar"`. On page load, make a fetch
// [x]to get all of the pup objects. When you have this information, you'll need to add
// [x]a `span` with the pup's name to the dog bar (ex: `<span>Mr. Bonkers</span>`).
// ### STEP 3: SHOW MORE INFO ABOUT EACH PUP
// [x]When a user clicks on a pup's `span` in the dog bar, that pup's info (`image`, `name`, and `isGoodDog` status) should show up in the `div` with the id of `"dog-info"`.
// [x]When you have the pup's information, the dog info `div` should have the following children:
//  [x]- an `img` tag with the pup's image url
//  [x]- an `h2` with the pup's name
//  [x]- a `button` that says `"Good Dog!"` or `"Bad Dog!"` based on whether `isGoodDog` is true or false.
//  Ex:
//  ```
//   <img src=dog_image_url>
//   <h2>Mr. Bonkers</h2>
//   <button>Good Dog!</button>
// ### STEP 4: TOGGLE GOOD DOG
//  When a user clicks the Good Dog/Bad Dog button, two things should happen:
// [x]get button
// [x]addEventListener to button
//   -[x] The button's text should change from Good to Bad or Bad to Good
// change button textContent
//   - The corresponding pup object in the database should be updated to reflect the new isGoodDog value
// send a patch to server
//     - Please note, you can update a dog by making a PATCH request to `/pups/:id`

document.addEventListener("DOMContentLoaded", function(event){
    const headers = {
        "content-type": "application/json",
        "accept": "applicatoin/json"
    }
    let url = "http://localhost:3000/pups"
    let dogBar = document.querySelector("#dog-bar")
    let dogContainer = document.querySelector("#dog-summary-container")
    let dogNames = fetch(url)
    .then(response => (response.json()))
    .then(data => renderDogs(data))

    function renderDogs(dogData){
        dogData.forEach((dog) => {
            dogSpan = document.createElement('span')
            dogSpan.id = `${dog.name}-${dog.id}`
            dogSpan.textContent = `${dog.name}`
            dogBar.appendChild(dogSpan)
        })
        createDogDiv(dogData)
    }


    function createDogDiv(dogsArray) {document.addEventListener('click', function(event){
        if (event.target.parentNode === dogBar){
            let dogDiv = document.createElement('div')
            let dog = dogsArray.forEach((dog)=>{
            if (dog.name === event.target.textContent){
                dogDiv.innerHTML = `<img src="${dog.image}" alt='${dog.name}'>
                <h2>${dog.name}</h2>
                <button>${dog.isGoodDog? 'Good Dog!' : 'Bad Dog!'}</button>`
                goodDogButton = dogDiv.querySelector('button')
                goodDogButton.id = `${dog.id}`
                dogContainer.innerHTML = ""
                dogContainer.appendChild(dogDiv)
            }
        })}
        else if (event.target === dogContainer.querySelector('button')){
            if (event.target.textContent === "Good Dog!"){
                event.target.textContent = "Bad Dog!"
                console.log(event.target)
                const pupData = dogsArray.find(dog => `${dog.id}` === `${event.target.id}`);

                let updateDog = {
                    name: pupData.name,
                    image: pupData.image,
                    isGoodDog: false
                }

                let updatedDogfetch =  
                fetch(url+`/${event.target.id}`,{  
                    method: 'PATCH',
                    headers: headers,
                    body: JSON.stringify(updateDog)
                  })
                  .then(response => response.json())
                  .then(console.log)

            }
        else if (event.target === dogContainer.querySelector('button')){
                if (event.target.textContent === "Bad Dog!"){
                event.target.textContent = "Good Dog!"
                const pupData = dogsArray.find(dog => `${dog.id}` === `${event.target.id}`);

                let updateDog = {
                    name: pupData.name,
                    image: pupData.image,
                    isGoodDog: true
                }

                let updatedDogfetch =  
                fetch(url+`/${event.target.id}`,{  
                    method: 'PATCH',
                    headers: headers,
                    body: JSON.stringify(updateDog)
                  })
                  .then(response => response.json())
                  .then(console.log)
            }
        }
        }   
    })}
})