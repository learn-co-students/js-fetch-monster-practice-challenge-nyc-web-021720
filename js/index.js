document.addEventListener("DOMContentLoaded", () => {

let monsterContainer = document.findById('monster-container')



function getThemMonsters() {
    return fetch('http://localhost:3000/monsters')
      .then(resp => resp.json())
  }

function renderThemMonsters(monster){
    let h2 = document.createElement('h2')
    h2.innerText = monster.name

    let h3 = document.createElement('h3')
    h3.innerText= monster.age 

    let p = document.createElement('p')
    p.innerText= monster.description
     
    let divCard= document.createElement('div')

    divCard.setAttribute('class','card')
    divCard.append(h2,h3,p)
   
   monsterContainer.append(divCard)
}


getThemMonsters().then(monsters =>{
    monesters.forEach(monster=>{
        renderThemMonsters(monster)
    })
})
})