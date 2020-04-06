
let page =1

// Main 
document.addEventListener("DOMContentLoaded", function(){
    getMonster(page)
    createMonsterForm()
    pageButton(page)
})

// All the functions start below

function getMonster(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(monster => renderMonsterHTML(monster))
 }


function renderMonsterHTML(monster){
    const monsterContainer=document.getElementById("monster-container")
    
    monster.forEach(monster=>{
        // this has to be inside the forEach to show all the 50 div of monster's
        const monsterDiv=document.createElement('div')
        monsterDiv.innerHTML=`
       <h2>name: ${monster.name}</h2>
       <h4>age: ${monster.age} </h4>
       <p>Bio: ${monster.description} </p>`
       monsterContainer.appendChild(monsterDiv)
    })

}


function createMonsterForm(){
    const monsterForm=document.querySelector("#create-monster")
    let newMonsterForm=document.createElement("form")
    newMonsterForm.className="new-monster"
    newMonsterForm.innerHTML=`
    <input type ="text" name="name" placeholder="Name">
    <input type ="number" name="age"placeholder="Age">
    <input type ="textarea" name="description" placeholder="Bio">
    <input type="submit" value= "Add Monster"/>
    `
    monsterForm.appendChild(newMonsterForm)

    newMonsterForm.addEventListener("submit",function(e){
        e.preventDefault()

        let userInput=document.getElementsByClassName('new-monster')[0]
        console.log(userInput)

        fetch('http://localhost:3000/monsters',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: `${userInput[0].value}`,
                age: `${userInput[1].value}`,
                description: `${userInput[2].value}`
            })

        })
        newMonsterForm.reset()
    })
    
}

function pageButton(page) {
    const backPage = document.getElementById("back")
    const forwardPage = document.getElementById("forward")

    let monsterContainer = document.getElementById('monster-container')

    backPage.addEventListener('click', function(event) {
        
        page--
        // make the HTML in the page for monsterContainer empty again 
        monsterContainer.innerHTML = ""
        // and then you render again getMonster to get the monster display 
        getMonster(page)
    })
    forwardPage.addEventListener('click', function(event) {       
        
        page++
        monsterContainer.innerHTML = ""
        getMonster(page)
    })
} 





