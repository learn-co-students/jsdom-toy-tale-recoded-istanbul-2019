let addToy = false




document.addEventListener("DOMContentLoaded", ()=>{


  const div = document.querySelector("#toy-header")
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })


  function addcard(obj){
    
    //build a card

      const card = document.createElement("card")
      card.setAttribute("class","card")
      div.appendChild(card)
      
    //set nodes
    
      const h2 = document.createElement("h2")
      h2.innerHTML = obj.name
      card.appendChild(h2)
    
      const img = document.createElement("img")
      img.setAttribute("src",obj.image)
      card.appendChild(img)
    
      const p = document.createElement("p")
      p.innerHTML = obj.likes
      card.appendChild(p)
    
      const btn = document.createElement("button")
      btn.setAttribute("class",'like-btn')
      btn.setAttribute("type",'button')
      card.appendChild(btn)

      //incress likes
      
      btn.addEventListener('click',function(){
        let objConfigLikes =
      {
      method : 'PATCH',
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify({'likes' : parseInt(p.innerHTML) +1})

      }
        fetch("http://localhost:3000/toys/" + obj.id,objConfigLikes)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            p.innerHTML = object.likes;
          })
          .catch(function(error) {
            alert("Bad things! Ragnarők!");
            console.log(error.message);
          });
      })
    
    }
    
    fetch("http://localhost:3000/toys").then(res => res.json()).then( obj =>{obj.forEach(element => {
      addcard(element)
    });

    //add new toy
  let dateo = {
    name : document.querySelector("input[name='name']").value,
    image : document.querySelector("input[name='image']").value,
    likes : 0
  }
  let objConfig = {
    method: "POST",
    headers:{
    'Content-Type': 'application/json',
    "Accept": "application/json"
    },
  body: JSON.stringify(dateo)
  }

        document.querySelector("input[type='submit']").addEventListener("click",function(e){
          e.preventDefault() 
          fetch("http://localhost:3000/toys",objConfig)  .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            addcard(object);
          })
          .catch(function(error) {
            alert("Bad things! Ragnarők!");
            console.log(error.message);
          });
        })
  })

})
