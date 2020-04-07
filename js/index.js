let page = 1

document.addEventListener("DOMContentLoaded", function(){
    let monsterContainer = document.querySelector('#monster-container')
    let createMonsterContainer = document.querySelector('#create-monster')

    //create form
    let form = document.createElement('form')
    form.innerHTML = `
        <input placeholder='name' id='nameInput' />
        <input placeholder='age' id='ageInput' />
        <input placeholder='description' id='descriptionInput' />
        <button>SUBMIT</button>`
    createMonsterContainer.appendChild(form)
    fetchMonsters()

    function fetchMonsters() {
    monsterContainer.innerHTML = ''
    return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        displayMonsters(json);
    })
};

    function displayMonsters(monsterObj) {
        monsterObj.forEach(monster => {
            let newDiv = document.createElement('div')
            newDiv.innerHTML = `
            <h2>Monster: ${monster.name}</h2>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>`
            monsterContainer.appendChild(newDiv)
        });
    }

  form.addEventListener('submit', function(event){
    event.preventDefault()
    let nameInput = event.target.querySelector('#nameInput')
    let ageInput = event.target.querySelector('#ageInput')
    let descriptionInput = event.target.querySelector('#descriptionInput')
    let monster = {
        name: nameInput.value,
        age: ageInput.value,
        description: descriptionInput.value
    }
    createMonster(monster)
  });

  function createMonster(monster){
      debugger;
    fetch("http://localhost:3000/monsters", {
        method: 'POST',
        headers: 
            {"Content-Type": 'application/json'},
        body: JSON.stringify({
            name: monster.name,
            age: monster.age,
            description: monster.description
        })
    })
    fetchMonsters()
  };

  document.addEventListener("click", event => {
    if (event.target.id === "back") {
      if (page > 1){
        --page
        fetchMonsters()
      } else {
        alert("You're on the first page.")
      }
    }
    
    if ((event.target.id === "forward")) {
      if (page > 0) {
        ++page
        fetchMonsters()
      } else {
        alert("You're on the last page.")
      }
    }
});

});
