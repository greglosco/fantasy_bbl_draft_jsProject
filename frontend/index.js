const baseURL = "http://localhost:3000"
const ownerURL = `${baseURL}/owners`
const playerURL = `${baseURL}/players`
const draftSlotContainers = document.querySelector("div#drafting-slots")
const ownerBtn = document.querySelector("button.owner")
const existingOwners = []
const existingPlayers = []


ownerBtn.addEventListener("click", () => fetchOwners())

function randomOwnerInteger() {
    const randomNum = Math.floor(Math.random() * 12)
    if (!(existingOwners.includes(randomNum))) {
        existingOwners.push(randomNum)
        return randomNum
    } else {
        return randomOwnerInteger()
    }
}

function randomPlayerInteger() {
    const randomNum = Math.floor(Math.random() * 120)
    if (!(existingPlayers.includes(randomNum))) {
        existingPlayers.push(randomNum)
        return randomNum
    } else {
        return randomPlayerInteger()
    }
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
        <div id=team>
            <p id="Point-Guard"></p>
            <p id="Shooting-Guard"></p>
            <p id="Small-Forward"></p>
            <p id="Power-Forward"></p>
            <p id="Center"></p>
        </div>
        `)
    }
}

function fetchOwners() {
    fetch(ownerURL)
    .then(res => res.json())
    .then(json => {
        const newOwner = new Owner(json[randomOwnerInteger()])

        const ownerContainer = document.createElement("div")
            ownerContainer.className = "owner-container"
            draftSlotContainers.append(ownerContainer)
        ownerContainer.innerHTML = newOwner.ownerHTML        
        
            const playerBtn = document.createElement("button")
            playerBtn.className = "player"
            playerBtn.innerHTML = "Draft a Player"
            playerBtn.addEventListener("click", e => fetchPlayers(e))
            ownerContainer.querySelector("div#team").prepend(playerBtn)
    })      
}

function fetchPlayers(e) {
    fetch(playerURL)
    .then(res => res.json())
    .then(json => {
        const newPlayer = new Player(json[randomPlayerInteger()])
        const pick = e.target.parentElement.querySelector(`div#team p#${newPlayer.position.replace(/\s+/g, '-')}`)
        if (pick.innerHTML == "") {
            pick.innerHTML = newPlayer.playerHTML
            const removePlayerBtn = document.createElement("button")
            removePlayerBtn.className = "remove-player"
            removePlayerBtn.innerHTML = "X"
            removePlayerBtn.addEventListener("click", e => deletePlayer(pick, e))
            pick.append(removePlayerBtn)
        } else {
            existingPlayers.pop()
            fetchPlayers(e)
        }
    })
}

class Player {
    constructor(obj) {
        this.name = obj.name
        this.team = obj.team
        this.position = obj.position
        this.owner_id = obj.owner.id
    }

    get playerHTML() {
        return `${this.position}: ${this.name} - ${this.team}`
    }
}

function deletePlayer(pick, e) {
    fetch(`${baseURL}/${pick.id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(obj => {
        e.target.parentElement.innerHTML = ""
    })
}

