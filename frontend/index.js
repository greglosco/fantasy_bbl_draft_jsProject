const baseURL = "http://localhost:3000"
const ownerURL = `${baseURL}/owners`
const playerURL = `${baseURL}/players`
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
        const newOwner = new Owner(json[ownerClicks])
        console.log(ownerClicks)
        const renderedOwner = newOwner.ownerHTML
        document.querySelector("div#owner-container").append(renderedOwner)
    })
}




class Player {
    constructor(name, team, position) {
        this.name = name
        this.team = team
        this.position = position
    }
}

