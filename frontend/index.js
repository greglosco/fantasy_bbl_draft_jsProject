const baseURL = "http://localhost:3000"
const ownerURL = `${baseURL}/owners`
const playerURL = `${baseURL}/players`
const draftSlotContainers = document.querySelector("div#drafting-slots")
const ownerBtn = document.querySelector("button.owner")
const existingOwners = []
const existingPlayers = []

//live coding exercise
const sortOwnerDiv = document.querySelector("div#sortButton")

const sortOwner = document.createElement('button')
sortOwner.innerHTML = "Sort Owners"
sortOwner.className = "sort-owners"
sortOwner.addEventListener("click", () => sortOwners())
sortOwnerDiv.append(sortOwner)

function sortOwners() {
    const slots = document.querySelectorAll("div.owner-container h3")
    Array.from(slots).sort(function(a,b) {
            if (a.innerHTML < b.innerHTML) {
                return -1
            } else {
                return 1
            }
        }).forEach(el => {
            document.querySelector("div#drafting-slots").append(el.parentElement)
        })
    }

// end live coding exercise

ownerBtn.addEventListener("click", () => fetchOwners())

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

function randomOwnerInteger() {
    const randomNum = Math.floor(Math.random() * 12)
    if (!(existingOwners.includes(randomNum))) {
        existingOwners.push(randomNum)
        return randomNum
    } else {
        return randomOwnerInteger()
    }
}

function fetchPlayers(e) {
    const pGElement = e.target.parentElement.firstElementChild.nextElementSibling
    const sGElement = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling
    const sFElement = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
    const pFElement = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
    const cElement = e.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
    if (pGElement.innerHTML == "" || sGElement.innerHTML == "" || sFElement.innerHTML == "" || pFElement.innerHTML == "" || cElement.innerHTML == "") {
        fetch(playerURL)
        .then(res => res.json())
        .then(json => {
            const newPlayerOwner = e.target.parentElement.parentElement.querySelector("h3").innerHTML
            const newPlayer = new Player(json[randomPlayerInteger()], newPlayerOwner)

            const pick = e.target.parentElement.querySelector(`div#team p#${newPlayer.position.replace(/\s+/g, '-')}`)
            if (pick.innerHTML == "") {
                pick.innerHTML = newPlayer.playerHTML

                const editPlayerNameBtn = document.createElement("button")
                    editPlayerNameBtn.className = "edit-player-name"
                    editPlayerNameBtn.innerHTML = "Edit Name"
                    editPlayerNameBtn.addEventListener("click", e => editPlayerName(newPlayer, e))
                pick.append(editPlayerNameBtn)

                const removePlayerBtn = document.createElement("button")
                    removePlayerBtn.className = "remove-player"
                    removePlayerBtn.innerHTML = "X"
                    removePlayerBtn.addEventListener("click", e => deletePick(e))
                pick.append(removePlayerBtn)
            } else {
                existingPlayers.pop()
                fetchPlayers(e)
            }
        })
    }   
}

class Player {
    constructor(obj, owner) {
        this.id = obj.id
        this.name = obj.name
        this.team = obj.team
        this.position = obj.position
        this.owner = owner
    }

    get playerHTML() {
        return `${this.position}: <span>${this.name}</span> - ${this.team} <input type='hidden' id='${this.id}'>`
    }
}

function randomPlayerInteger() {
    const randomNum = Math.floor(Math.random() * 60)
    if (!(existingPlayers.includes(randomNum))) {
        existingPlayers.push(randomNum)
        return randomNum
    } else {
        return randomPlayerInteger()
    }
}

function editPlayerName(newPlayer, e) {
    const nameField = (e.target.parentElement.querySelector("span"))
    const form = document.createElement("form")
    const input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("placeholder", "New Name")
    form.append(input)
    const submitBtn = document.createElement("button")
        submitBtn.innerHTML = "Update Name"
        submitBtn.addEventListener("click", e => updateName(newPlayer, input, e))
    form.append(submitBtn)
    nameField.append(form)
}

function updateName(newPlayer, input, e) {
    e.preventDefault()
    const nameField = (e.target.parentElement.parentElement)
    if (input.value == "") {
        nameField.innerHTML = newPlayer.name
    } else {
        fetch(`${playerURL}/${newPlayer.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": input.value
            })
        })
        .then(res => res.json())
        .then(json => {
            nameField.innerHTML = json.name
        })
    }
}

function deletePick(e) {
    const playerid = (e.target.parentElement.querySelector("input").id)
        e.target.parentElement.innerHTML = ""
        removePlayerElement(existingPlayers, playerid)   
}

function removePlayerElement(array, id) {
    const index = array.indexOf(id-1)
    array.splice(index, 1)
    return existingPlayers
}