
document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar')
    const dogInfo = document.getElementById('dog-info')
    const goodDogButton = document.getElementById('good-dog-filter')

    document.addEventListener('click', (e) => {
        if (e.target.innerHTML === "Filter good dogs: OFF"){
            e.target.innerHTML = "Filter good dogs: ON"
        } else if (e.target.innerHTML === "Filter good dogs: ON"){
            e.target.innerHTML = "Filter good dogs: OFF"
        }
    })
    
    fetch(' http://localhost:3000/pups')
    .then( response => response.json())
    .then(json => {
        json.map((dog) => {
            let span = document.createElement('span')
            span.innerHTML = `${dog.name}`
            dogBar.appendChild(span)
            span.addEventListener('click', (e) => {
                function goodDog(dog) {
                    if (dog.isGoodDog === true) return 'Good Dog!'
                    else return 'Bad Dog'
                }
                
                dogInfo.innerHTML = `
                <h2>${dog.name}</h2>
                <img src= ${dog.image}>
                <button id=${dog.id}>${goodDog(dog)}</button>
                `
            })
        })
        dogInfo.addEventListener('click', (e)=>{
            if (e.target.innerText === "Good Dog!"){
                configurationObject = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: false		
                    })
                }
                    
                fetch("http://localhost:3000/pups" + `/${e.target.id}`, configurationObject)
                .then( (response) => { response.json() })
                .then( (json) => { console.log(json) })
                e.target.innerText = "Bad Dog"

            } else if (e.target.innerText === "Bad Dog"){                
                configurationObject = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: true		
                    })
                }
                    
                fetch("http://localhost:3000/pups" + `/${e.target.id}`, configurationObject)
                .then( (response) => { response.json() })
                .then( (json) => { console.log(json) })
                e.target.innerText = "Good Dog!"

            }
        })
    })      
})