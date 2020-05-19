document.addEventListener("DOMContentLoaded", () => {
  const dogBar = document.getElementById("dog-bar")
  const dogInfoDiv = document.getElementById("dog-info")
  const filterButton = document.getElementById("good-dog-filter")
  const baseUrl = "http://localhost:3000/pups/"

  function fetchDogs() {
    fetch(baseUrl)
      .then(res => res.json())
      .then(json => displayPups(json))
  }

  function fetchGoodDogs() {
    fetch(baseUrl)
      .then(res => res.json())
      .then(json => {
        let goodPups = json.filter(pup => pup.isGoodDog)
        displayPups(goodPups)
      })
  }

  function fetchDog(id) {
    fetch(baseUrl + id)
      .then(res => res.json())
      .then(json => displayPupInfo(json))
  }

  function changePupStatus(id, newStatus) {
    fetch(baseUrl + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: newStatus
      })
    })
  }

  function displayPups(pups) {
    dogBar.innerHTML = ''

    pups.forEach(pup => {
      let pupSpan = document.createElement("span")
      pupSpan.dataset.id = pup.id
      pupSpan.innerHTML = pup.name

      dogBar.appendChild(pupSpan)
    })
  }

  function displayPupInfo(pup) {
    dogInfoDiv.innerHTML = ''

    let pupImage = document.createElement("img")
    pupImage.src = pup.image

    let pupName = document.createElement("h2")
    pupName.innerHTML = pup.name

    let pupStatus = document.createElement("button")
    pupStatus.dataset.id = pup.id
    pupStatus.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"

    dogInfoDiv.appendChild(pupImage)
    dogInfoDiv.appendChild(pupName)
    dogInfoDiv.appendChild(pupStatus)
  }

  dogBar.addEventListener("click", e => {
    if (e.target.tagName == "SPAN") {
      fetchDog(e.target.dataset.id)
    }
  })

  dogInfoDiv.addEventListener("click", e => {
    if (e.target.innerHTML == "Good Dog!") {
      e.target.innerHTML = "Bad Dog!"
      changePupStatus(e.target.dataset.id, false)
    } else if (e.target.innerHTML == "Bad Dog!") {
      e.target.innerHTML = "Good Dog!"
      changePupStatus(e.target.dataset.id, true)
    }
  })

  filterButton.addEventListener("click", e => {
    if (e.target.innerHTML == "Filter good dogs: OFF") {
      e.target.innerHTML = "Filter good dogs: ON"
      fetchGoodDogs()
    } else {
      e.target.innerHTML = "Filter good dogs: OFF"
      fetchDogs()
    }
  })

  fetchDogs()
})
