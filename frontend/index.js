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

    ownerBtn.addEventListener("click", fetchOwners())

    function fetchOwners() {
        fetch(ownerURL)
        .then(res => res.json())
        .then(json => {
            const newOwner = new Owner(json)
            const renderedOwner = newOwner.ownerHTML()
            document.querySelector("div#owner-container").append(renderedOwner)
        })
    }

    function ownerHTML(ownerObj) {
        return 
        `
        <h3>${this.name}</h3>
        <h5>${this.teamname}</h5>
        `
    }

}

class Player {
    constructor(name, team, position) {
        this.name = name
        this.team = team
        this.position = position
    }
}

