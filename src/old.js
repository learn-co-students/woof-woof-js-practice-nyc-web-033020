document.addEventListener('DOMContentLoaded', function(){
    const url = 'http://localhost:3000/pups'
    fetch(url)
    .then(res => res.json())
    .then(dogs => allDogs(dogs))
    // console.log(dogs)
    goodDoggo()
    btnDefault()
})

function allDogs(dogArray){
    const dogBar = document.querySelector('#dog-bar')
    const dogUl = document.createElement('ul')
    dogArray.forEach(dog => {
        const dogNameCont = document.createElement('span')
        dogNameCont.setAttribute('class', 'dog-info')
        dogNameCont.textContent = `${dog.name}`
        function btnVal(){
            if (dog.isGoodDog === 'true'){
                btnVal = 'GOOD DOG'
            }
            else if (dog.isGoodDog === 'false'){
                btnVal = 'BAD DOG'
            }
        }            
        dogNameCont.addEventListener('click', function(e){
                const doggoDiv = document.querySelector('#dog-info')
                doggoDiv.innerHTML = 
                `
                <table>
                    <tr>
                        <td><img src="${dog.image}"></td>
                    </tr>
                    <tr>
                        <td><h2>${dog.name}</h2></td>
                    </tr>
                    <tr>
                        <td><button id="dogBtn" value="${dog.isGoodDog}" onclick="doggoStatus()">${btnVal}</button></td>
                    </tr>
                </table>
                `
                // console.log(dog.isGoodDog)
                
            })
        dogBar.appendChild(dogNameCont)
        
    })
}



function doggoStatus(){
    const dogButton = document.querySelector('#dogBtn')
    if (dogButton.value === 'true'){
        dogButton.textContent = 'BAD DOG'
        dogButton.style.color = 'red'
    }
    else {
        dogButton.textContent = 'GOOD DOG'
        dogButton.style.color = 'green'
    }
}