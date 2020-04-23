let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyForm = document.querySelector(".container");
  const toys= document.querySelector("#toy-collection"); 
  fetch('http://localhost:3000/toys')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for(const element of data){
      let div= document.createElement('div');
      div.className='card';
      let h2= document.createElement('h2');
      h2.textContent= element['name'];
      div.appendChild(h2);
      let img= document.createElement('img');
      img.src= element.image;
      img.width=200; 
      img.height=200;
      div.appendChild(img);
      let p= document.createElement('p');
      p.textContent='Likes:'+element['likes'];
      div.appendChild(p); 
      let btn= document.createElement('button');

      btn.addEventListener('click',() => {  
        p.textContent='Likes:'+displayLike(element['likes']);  
        //fetchLike(displayLike(element['likes']));
       });
      btn.className= "like-btn";
      btn.textContent=  " ♥ Like ";
      div.appendChild(btn); 
      toys.appendChild(div);
    }

  });
  let i=1;
  function displayLike(like){
    let curLike=parseInt(like)+i;
    i++;
    return curLike;
  }
  function fetchLike(curLike){
    fetch("http://localhost:3000/toys/:id",{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": curLike
      })
    })
  }

  let newToy= document.querySelector('#new-toy-btn');
  newToy.addEventListener("click",function(){
    fetch('http://localhost:3000/toys',objConfig)

    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  let objConfig={
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
      },
    body: JSON.stringify({
      "id":9,
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
      })


  }

});
