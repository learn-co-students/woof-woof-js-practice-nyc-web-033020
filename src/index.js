
const populateDogBar = (goodDogsFilter) => {
	const dogBar = document.getElementById('dog-bar');
	dogBar.innerHTML = '';
	const url = goodDogsFilter ? 'http://localhost:3000/pups?isGoodDog=true' : 'http://localhost:3000/pups'
	fetch(url)
	.then( res => res.json() )
	.then( dogs => {
		dogs.forEach(dog => {
			const dogBarButton = document.createElement('span');
			dogBarButton.textContent = dog.name;
			dogBar.appendChild(dogBarButton);
			dogBarButton.addEventListener("click", e => {
				showDogInfo(dog);
			});
		});
	});
};

const toggleDogGoodness = dog => {
	dog.isGoodDog =! dog.isGoodDog
	console.log(dog.isGoodDog)
	const meta = {
		method: "PATCH",
		header: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(dog)
	};
	fetch(`http://localhost:3000/pups/${dog.id}`, meta)
	.then( res => res.json() ) 
	.then(showDogInfo(dog) )
};

const showDogInfo = dog => {
	const dogInfoContainer = document.getElementById('dog-info');
	dogInfoContainer.innerHTML = '';
	const dogInfo = document.createElement('div');
	dogInfoContainer.appendChild(dogInfo);
	dogInfo.innerHTML = `
		<img src='${dog.image}' />
		<h2>${dog.name}</h2>`;
	const goodDogButton = document.createElement('button');
	dogInfo.appendChild(goodDogButton);
	dog.isGoodDog ? goodDogButton.innerHTML  = 'Good Dog!' : goodDogButton.innerHTML = 'Bad Dog!'

	goodDogButton.addEventListener('click', () => {
		toggleDogGoodness(dog);
	});
};
document.addEventListener('DOMContentLoaded', () => {
	let filterOn = false;
	const goodDogFilter = document.getElementById('good-dog-filter');
	goodDogFilter.addEventListener("click", () => {
		filterOn = !filterOn;
		goodDogFilter.innerHTML = filterOn ? "Filter Bad Dogs: ON" : "Filter Bad Dogs: OFF";
		populateDogBar(filterOn);
	});
	populateDogBar();
	
})
