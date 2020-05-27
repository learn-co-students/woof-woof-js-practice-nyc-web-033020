
/*
// const dogButton = document.createElement("button")

// let renderPup = pup => {
//     const dogBar = document.querySelector("#dog-bar")
//     const dogSpan = document.createElement("span")
//     addClickSpan(pup, dogSpan)
//     dogSpan.innerHTML = pup.name
//     dogBar.append(dogSpan)
// }

// let addClickSpan = (pup, span) => {
//     const dogButton = document.createElement("button")
//     // updatePup(pup)
//     dogButton.innerText = pup.isGoodDog // 1st place
//     const divDogInfo = document.querySelector("#dog-info")
//     span.addEventListener("click", e => {
//         divDogInfo.innerHTML = `
//             <h2>${pup.name}</h2>
//             <img src=${pup.image}>
//         `;
//         span.dataset.id = pup.id
//         divDogInfo.append(dogButton)
//         addClickButton(pup, dogButton)
        
//     })
// }

// // 71-75 build out hash first
// // everything else is the same except the isGoodDog, change it

// //patch request, paste my hash instead of the hash that was online

// let updatePup = (pup) => {
//     let updateDog = {
//         name: pup.name,
//         image: pup.image,
//         isGoodDog: pup.isGoodDog 
//     }

//     fetch(pupUrl +`/${pup.id}`, {
//         method: 'PATCH',
//         headers: headersz,
//         body: JSON.stringify(updateDog)
//     })
//     .then(response => response.json())
//     .then(console.log)
// }

// let addClickButton = (pup, button) => {
//         button.addEventListener("click", e => {
//             debugger;
//         console.log("click")
//         // debugger; just refresh browser for it to work
//         if (button.innerText === "false") {
//             button.innerText = "true"
//             pup.isGoodDog = "true"
//             console.log("INNERTEXT IS FALSE")
//             //const pupData = pup.find(pup => `{$pup.id})` 

//         } else {
//             button.innerText = "false"
//             pup.isGoodDog = "false"
//             console.log("INNERTEXT IS TRUE")
//         }
//     })
// }

// fetch('https://example.com/profile', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });


    // // let changeButtonText =

*/