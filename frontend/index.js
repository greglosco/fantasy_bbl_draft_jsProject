const baseURL = "http://localhost:3000"
const ownerURL = `${baseURL}/owners`
const playerURL = `${baseURL}/players`
const draftSlotContainers = document.querySelector("div#drafting-slots")
const ownerBtn = document.querySelector("button.owner")


const playerBtn = document.querySelector("button.player")

ownerBtn.addEventListener("click", e => {
    fetchOwners()
})

function randomOwnerInteger() {
    const generatedNums = []
    const randomNum = Math.floor(Math.random() * 32)
    if (generatedNums.includes(randomNum)) {
        generatedNums.push(randomNum)
    }
    return randomNum
}

class Owner {
    constructor(obj) {
        this.name = obj.name
        this.teamname = obj.teamname
    }

    get ownerHTML() { 
        return (`
        <h3>${this.name}</h3>
        <h5>${this.teamname}</h5>
        <button class=player>Draft a Player</button>
        <p id="Point-Guard">Point-Guard:</p>
        <p id="Shooting-Guard">Shooting-Guard:</p>
        <p id="Small Forward">Small Forward:</p>
        <p id="Power Forward">Power Forward:</p>
        <p id="Center">Center:</p>
        `)
    }
}

function fetchOwners() {
    fetch(ownerURL)
    .then(res => res.json())
    .then(json => {
        const ownerContainer = document.createElement("div")
            ownerContainer.className = "owner-container"
            draftSlotContainers.append(ownerContainer)
        const newOwner = new Owner(json[randomOwnerInteger()])
        const renderedOwner = newOwner.ownerHTML
        ownerContainer.innerHTML = renderedOwner
    })      
}


class Player {
    constructor(name, team, position) {
        this.name = name
        this.team = team
        this.position = position
    }
}

