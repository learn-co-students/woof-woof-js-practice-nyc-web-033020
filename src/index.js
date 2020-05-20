document.addEventListener('DOMContentLoaded', e => {

pupsUrl = 'http://localhost:3000/pups'
fetch(pupsUrl)
.then(res => res.json())
.then(doggo => renderDogBar(doggo))

})

function renderDogBar(doggo){

    const dogBar = document.querySelector('#dog-bar')

    doggo.forEach(dog => {
        const span = document.createElement('span')
        span.textContent = `${dog.name}`
        span.className = 'dogBtn'
        span.dataset.id = `${dog.id}`
        dogBar.append(span)
        span.addEventListener('click', e => {
            const doggoDiv = document.querySelector('#dog-info')
            doggoDiv.innerHTML = `
            <img src="${dog.image}">
            <h2>${dog.name}</h2>
            <button id="dogBtn" data-status="${dog.isGoodDog}"></button>
            `
            let bool = ''
            const dogBtn = document.querySelector('#dogBtn')
            if (dog.isGoodDog === true)
            {
                dogBtn.textContent = "Good Dog!"
                bool = false
            }else{
                dogBtn.textContent = "Bad Dog!"
                bool = true
            }
            dogBtn.addEventListener('click', e => {
                if (e.target.textContent === "Good Dog!"){
                    dogBtn.textContent = "Bad Dog!"
                }else if (e.target.textContent === "Bad Dog!"){
                    dogBtn.textContent = "Good Dog!"
                }
                fetch(pupsUrl + `/${dog.id}`, {
                    method: 'PATCH',
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "isGoodDog": bool
                    })
                })
            })
            
        })
    
    })

    

}
