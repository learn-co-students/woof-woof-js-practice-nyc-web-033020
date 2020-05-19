window.addEventListener('DOMContentLoaded', (event) => { 
    console.log('DOM fully loaded and parsed'); 

    const url = 'http://localhost:3000/pups'
    const dogBarDiv = document.querySelector('#dog-bar')
    const dogInfoDiv = document.querySelector('#dog-info')
    const filterBtn = document.querySelector('#good-dog-filter')

    function fetchDogs() {
        fetch(url)
        .then(resp => resp.json())
        .then(json => renderPups(json))
    }
    fetchDogs()
    

    // Render dog buttons to Dog Bar div
    let renderPups = (data) => {
        for (const element of data) {
            const dogSpan = document.createElement('span')

            dogSpan.textContent = element.name
            dogBarDiv.appendChild(dogSpan)

            //Add id to dataset for data binding
            dogSpan.dataset.id = element.id
        }
    }

    //Click event to show more info about dog
    dogBarDiv.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            
            const id = e.target.dataset.id
            dogInfoDiv.innerHTML = ''

            //fetch to "show page"
            fetch(`http://localhost:3000/pups/${id}`)
                .then(resp => resp.json())
                .then(json => renderIndPup(json))

            //build up/render individual pup info
            let renderIndPup = (dog) => {
                // console.log(dog)

                const dogImg = document.createElement('img')
                const dogHeader = document.createElement('h2')
                const dogButton = document.createElement('button')


                dogImg.src = dog.image
                dogHeader.textContent = dog.name

                //Conditional logic for button text
                if (dog.isGoodDog === true) {
                    dogButton.textContent = "Good Dog!"
                    dogButton.className = "good-dog"
                } else if (dog.isGoodDog === false) {
                    dogButton.textContent = "Bad Dog!"
                    dogButton.className = "bad-dog"
                }

                //Append to DOM
                dogInfoDiv.appendChild(dogImg)
                dogInfoDiv.appendChild(dogHeader)
                dogInfoDiv.appendChild(dogButton)

                //add data id
                dogButton.dataset.id = dog.id

            }

        }
    })

    //Click event to toggle good/bad dog
    dogInfoDiv.addEventListener('click', (e) => {

        const id = e.target.dataset.id
        console.log(id)

        if (e.target.tagName === "BUTTON") {
            //conditional logic for good/bad
            if (e.target.className === "good-dog") {
                //fetch request to update isGoodDog status
                fetch(`http://localhost:3000/pups/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: false
                    })
                })
                    .then(resp => resp.json())
                    .then(json => updateDog(json))

                let updateDog = (dog) => {
                    const button = dogInfoDiv.querySelector('button')
                    button.textContent = "Bad Dog!"
                    button.className = "bad-dog"
                }

            } 
            
            else if (e.target.className === 'bad-dog') {
                //fetch request to update isGoodDog status
                fetch(`http://localhost:3000/pups/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: true
                    })
                })
                    .then(resp => resp.json())
                    .then(json => updateDog(json))

                let updateDog = (dog) => {
                    const button = dogInfoDiv.querySelector('button')
                    button.textContent = "Good Dog!"
                    button.className = "good-dog"
                }
            }

        }
    })

    filterBtn.addEventListener('click', (e) => {
        if (e.target.textContent === 'Filter good dogs: OFF') {
            e.target.textContent = "Filter good dogs: ON"

            //Get updated isGoodDog value
            fetch(`http://localhost:3000/pups/`)
                .then(resp => resp.json())
                .then(json => filterDogs(json))

            let filterDogs = (data) => {
                for (const element of data) {
                    const status = element.isGoodDog
                    const id = element.id

                    console.log(`${status} -- ${id}`)
                    // console.log(`${dogBarDiv} span[data-id=${id}]`)

                    if (status === false) {
                        const dogElement = document.querySelector(`#dog-bar > span:nth-child(${id})`)

                    dogElement.style.display = "none"
                    }
                    
                }
            }

        } else {
            e.target.textContent = 'Filter good dogs: OFF'
            dogBarDiv.innerHTML = ''
            fetchDogs()

        }
    })

});