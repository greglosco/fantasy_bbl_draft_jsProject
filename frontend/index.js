const baseURL = "http://localhost:3000"
const ownerURL = `${baseURL}/owners`
const playerURL = `${baseURL}/players`
const draftSlotContainers = document.querySelector("div#drafting-slots")
const ownerBtn = document.querySelector("button.owner")
const playerBtn = document.querySelector("button.player")
let ownerClicks = 0


function countOwnerClicks() {
    ownerClicks++
}

class Owner {
    constructor(obj) {
        this.name = obj.name
        this.teamname = obj.teamname
    }

    get ownerHTML() { 
        return (`
        ${this.name}
        ${this.teamname}
        `)
    }
}

ownerBtn.addEventListener("click", e => {
    fetchOwners()
})

function fetchOwners() {
    fetch(ownerURL)
    .then(res => res.json())
    .then(json => {
        const ownerContainer = document.createElement("div")
            ownerContainer.className = "owner-container"
            draftSlotContainers.append(ownerContainer)
        const newOwner = new Owner(json[ownerClicks])
        const renderedOwner = newOwner.ownerHTML
        ownerContainer.append(renderedOwner)
    })      
}




class Player {
    constructor(name, team, position) {
        this.name = name
        this.team = team
        this.position = position
    }
}

