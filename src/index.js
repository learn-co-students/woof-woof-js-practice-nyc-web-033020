const pupsUrl = "http://localhost:3000/pups"

document.addEventListener('DOMContentLoaded', () =>{
  const dogBarDiv = document.getElementById('dog-bar')
  const dogInfoDiv = document.getElementById('dog-info')

  const addPupSpan = (pup) => {
    const dogNameSpan = document.createElement('span')
    dogNameSpan.id = pup.id
    dogNameSpan.textContent = pup.name
    dogBarDiv.appendChild(dogNameSpan)
  };

  const goodOrBadPup = (pup) => {
    if(pup.isGoodDog){
      return 'Good Dog!'
    } else {
      return 'Bad Dog!'
    }
  };

  
  fetch(pupsUrl)
  .then(resp => resp.json())
  .then(puppies => {
    puppies.forEach(pup => addPupSpan(pup));
  })

  document.addEventListener('click', (e) => {
    if(e.target.id === "good-dog-filter"){
      if(e.target.textContent === "Filter good dogs: OFF"){
        for(const key in dogBarDiv.children){
          fetch(pupsUrl+`/${dogBarDiv.children[key].id}`)
          .then(resp => resp.json())
          .then(pup => {
            if (!pup.isGoodDog){
              dogBarDiv.children[key].style.display = "none";
            }
          })
        }
        e.target.textContent = "Filter good dogs: ON"

      } else if (e.target.textContent === "Filter good dogs: ON"){
          for(const key in dogBarDiv.children){ 
            dogBarDiv.children[key].style.display = "block";
          }  
          e.target.textContent = "Filter good dogs: OFF"
        }
    } else if(e.target.nodeName === 'SPAN'){
        fetch(pupsUrl+`/${e.target.id}`)
        .then(resp => resp.json())
        .then( pup => {
          dogInfoDiv.innerHTML = `
          <img src=${pup.image}> <h2>${pup.name}</h2> <button data-dog-id="${pup.id}">${goodOrBadPup(pup)}</button>
          `
        })
    } else if (e.target.nodeName === 'BUTTON' && e.target.id !== 'good-dog-filter'){
        if (e.target.textContent === 'Good Dog!'){
          fetch(pupsUrl+`/${e.target.dataset.dogId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              isGoodDog: false
            })
          })
          .then(e.target.textContent = 'Bad Dog!')
        } else if (e.target.textContent ===  'Bad Dog!'){
          fetch(pupsUrl+`/${e.target.dataset.dogId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              isGoodDog: true
            })
          })
          .then(e.target.textContent = 'Good Dog!')
        }
    }
  });



});