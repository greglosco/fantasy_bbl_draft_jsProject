const baseURL = "http://localhost:3000"
const ownerURL = `${baseURL}/owners`
const playerURL = `${baseURL}/players`
const draftSlotContainers = document.querySelector("div#drafting-slots")
const ownerBtn = document.querySelector("button.owner")

ownerBtn.addEventListener("click", () => fetchOwners())

function randomOwnerInteger() {
    const generatedNums = []
    const randomNum = Math.floor(Math.random() * 12)
    if (generatedNums.includes(randomNum)) {
        generatedNums.push(randomNum)
    }
    return randomNum
}

function randomPlayerInteger() {
    const generatedNums = []
    const randomNum = Math.floor(Math.random() * 120)
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
        const ownerContainer = document.createElement("div")
            ownerContainer.className = "owner-container"
            draftSlotContainers.append(ownerContainer)
        const newOwner = new Owner(json[randomOwnerInteger()])
        ownerContainer.innerHTML = newOwner.ownerHTML
        const playerBtn = document.querySelector("button.player")
        playerBtn.addEventListener("click", e => fetchPlayers(e))
    })      
}

function fetchPlayers(e) {
    fetch(playerURL)
    .then(res => res.json())
    .then(json => {
        const playerContainer = document.createElement("div")
            playerContainer.className = "player-container"
            e.target.parentElement.append(playerContainer)
        const newPlayer = new Player(json[randomPlayerInteger()])
            // const pointGuardElement = e.target.nextElementSibling.children[0]
            // const shootingGuardElement = e.target.nextElementSibling.children[1]
            // const smallForwardElement = e.target.nextElementSibling.children[2]
            // const powerForwardElement = e.target.nextElementSibling.children[3]
            // const centerElement = e.target.nextElementSibling.children[4]
            // const teamElements = []
            // teamElements.push(pointGuardElement, shootingGuardElement, smallForwardElement, powerForwardElement, centerElement)
        const pick = document.querySelector(`div#team p#${newPlayer.position.replace(/\s+/g, '-')}`)
        // if pick.innerHTML = ""
        //     pick.innerHTML = newPlayer.playerHTML
    
        
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

    }
}

