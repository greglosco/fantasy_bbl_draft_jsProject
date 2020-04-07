const baseURL = "http://localhost:3000"
const ownerURL = `${baseURL}/owners`
const playerURL = `${baseURL}/players`
const ownerBtn = document.querySelector("button.owner")
const playerBtn = document.querySelector("button.player")

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
    fetchOwners(e)
})

function fetchOwners(e) {
    fetch(ownerURL)
    .then(res => res.json())
    .then(json => {
        const newOwner = new Owner(json[0])
        console.log(e.target)
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

