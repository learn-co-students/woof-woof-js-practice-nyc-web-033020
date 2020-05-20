document.addEventListener('DOMContentLoaded', function(){
    const url = 'http://localhost:3000/pups'
    const dogBar = document.querySelector('#dog-bar')
    const dogInfoDiv = document.querySelector('#dog-info')

    // header funtion dog names 
    function addingToDogBar(array){
      array.forEach(element => {
          const dogCard = document.createElement('span')
          dogCard.setAttribute('id','dog-bar')
          dogCard.setAttribute('data-set', `${element.id}`)
          dogCard.innerHTML = `${element.name}`
          dogBar.appendChild(dogCard)
      })
    }
    // load dog bar 
    fetch(url).then(res => res.json()).then(dogs => addingToDogBar(dogs))

    //load do info
    function loadDogInfo(element){
        if (element.isGoodDog == false ){
        dogInfoDiv.innerHTML = `<img src="${element.image}"> <h2>${element.name}</h2> <button>Bad Dog!</button>`
        dogInfoDiv.setAttribute('data-set', `${element.id}`)
        } else if (element.isGoodDog == true ){
        dogInfoDiv.innerHTML = `<img src="${element.image}"> <h2>${element.name}</h2> <button>Good Dog!</button>`
        dogInfoDiv.setAttribute('data-set', `${element.id}`)
        }
    }



    document.addEventListener('click', function(e){
       if (e.target.localName == 'span'){
           const id = e.target.dataset.set
           fetch(`${url}/${id}`).then(res => res.json()).then(dog => loadDogInfo(dog))
       } else if (e.target.innerHTML == 'Filter good dogs: ON'){
         console.log(e.target)
         e.target.innerHTML = 'Filter good dogs: OFF'
         dogInfoDiv.innerHTML = ''
       } else if (e.target.innerHTML == "Good Dog!"){
           const dogId = e.target.parentElement.dataset.set
                fetch(`${url}/${dogId}`,{
                    method: 'PATCH',
                    headers: 
                        {"content-type": "application/json",
                        Accept: "content-type/json"
                        }, 
                        body: JSON.stringify({ isGoodDog: false })
                }).then( e.target.innerHTML = 'Bad Dog!')
       } else if (e.target.innerHTML == "Bad Dog!"){
        const dogId = e.target.parentElement.dataset.set
             fetch(`${url}/${dogId}`,{
                 method: 'PATCH',
                 headers: 
                     {"content-type": "application/json",
                     Accept: "content-type/json"
                     }, 
                     body: JSON.stringify({ isGoodDog: true })
             }).then( e.target.innerHTML = 'Good Dog!')
            } else if (e.target.innerHTML = 'Filter good dogs: OFF'){
                e.target.innerHTML = 'Filter good dogs: ON'
                fetch(url).then(res => res.json()).then(dogs => {
                    dogs.forEach(one => {
                        if (one.isGoodDog == true){
                            const newDogDiv = document.createElement('div')
                            newDogDiv.innerHTML = `<img src="${one.image}"> <h2>${one.name}</h2> <button>Good Dog!</button>`
                            newDogDiv.setAttribute('data-set', `${one.id}`)
                            dogInfoDiv.appendChild(newDogDiv)
                        }
                    })

                })
            } else if (e.target.id == 'filter-div'){
                       console.log(e.target)
                        e.target.innerHTML = 'Filter good dogs: OFF'
                        dogInfoDiv.remove()
            }
    })
    
    


})
