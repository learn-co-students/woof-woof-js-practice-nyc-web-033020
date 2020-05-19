document.addEventListener('DOMContentLoaded', () => {
const url = "http://localhost:3000/pups/"
const dogInfo = document.getElementById('dog-info')
const dogBar = document.getElementById('dog-bar')
const headers = {
    "content-type": "application/json",
    "accept": "applicatoin/json"
}

const renderSelectedDog = dog => {
    dogInfo.innerHTML = `
    <h2>${dog.name}</h2>
    <img src= ${dog.image}>
    <button id='GoodDogButton'>${dog.isGoodDog? 'Good Dog!' : 'Bad Dog!'}</button>
    `
    const dogButton = document.getElementById('GoodDogButton')
    dogButton.addEventListener('click', e => {
        if (e.target.innerText == 'Good Dog!') {    
            e.target.innerText = 'Bad Dog!'
            // updatedGoodDog(dog)
                const updateDog = {
                    name: dog.name,
                    image: dog.image, 
                    isGoodDog: false
                }
                const updatedDogfetch =  
                fetch(url+`/${dog.id}`,{  
                    method: 'PATCH',
                    headers: headers,
                    body: JSON.stringify(updateDog)
                    })
                .then(response => response.json())
                .then(console.log)

        } else if (e.target.innerText == 'Bad Dog!') {
            e.target.innerText = 'Good Dog!'
            // updatedBadDog(dog)
                const updateDog = {
                    name: dog.name,
                    image: dog.image, 
                    isGoodDog: true
                }
            
                let updatedDogfetch =  
                fetch(url+`/${dog.id}`,{  
                    method: 'PATCH',
                    headers: headers,
                    body: JSON.stringify(updateDog)
                    })
                .then(response => response.json())
                .then(console.log)
        }
    })
}

const renderDogSpan = dog => {
    const spanTag = document.createElement('span')
    spanTag.innerText = dog.name
    dogBar.appendChild(spanTag)
    spanTag.addEventListener('click', (e) => {
        renderSelectedDog(dog)
    })
}

fetch(url)
.then(res => res.json())
.then(data => data.forEach(renderDogSpan))

})