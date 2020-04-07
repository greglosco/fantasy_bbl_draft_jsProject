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


    ownerHTML(ownerObj) {
        return 
        `
        <h3>${this.name}</h3>
        <h5>${this.teamname}</h5>
        `
    }

}

function fetchOwners() {
    return fetch(ownerURL)
    .then(res => res.json())
    .then(json => {
        const newOwner = new Owner(json)
        const renderedOwner = newOwner.ownerHTML()
        document.querySelector("div#owner-container").append(renderedOwner)
    })
}


ownerBtn.addEventListener("click", e => {
    console.log("hi")
    fetchOwners()
})

class Player {
    constructor(name, team, position) {
        this.name = name
        this.team = team
        this.position = position
    }
}

