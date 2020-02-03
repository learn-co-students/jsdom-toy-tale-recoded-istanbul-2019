let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
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
})

//first
document.addEventListener("DOMContentLoaded", addToys);

function addToys() {
  return fetch( 'http://localhost:3000/toys', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    } )
    .then( function ( response ) {
      return response.json()
    } )
    .then( function ( object ) {
      let tToy=document.getElementsById('toy-collection');
      for(let item of object){
            let newDiv=document.createElement('div');
            newDiv.className="card";
            let h=document.createElement("h2");
            h.innerText=item['Text'];
            newDiv.appendChild(h);
            let img=document.createElement("img");
            img.className="toy-avatar";
            img.src=item['img'];
            newDiv.appendChild(img);
            let p=document.createElement("p");
            p.innerText=item['p'];
            newDiv.appendChild(p);
            let button=document.createElement("button");
            button.className="like-btn";
            button.src=item['btn'];
            newDiv.appendChild(button);
            tToy.appendChild(newDiv);
    }
    } )
}
//second
let bBtn=document.getElementsById('new-toy-btn');
bBtn.addEventListener('click',function(){
let x=document.getElementsByClassName('input-text');
let name1=x[0].value;
let image1=x[1].value;

 fetch( 'http://localhost:3000/toys', {
      method: "POST", //post
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
       "name": [name1],
       "image": [image1],
       "likes": 0
      } )
    } );
});
//third
function like(){
  let toyss=document.getElementsByClassName('like-btn');
  for(let x of toyss)
  {
    x.addEventListener('click', fetch( `http://localhost:3000/toys/${toy.Id}`, {
      method: "POST", //post
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
       
       "likes": [likes++]
      } )
    } ) //end fetch function
    ); //end event listener
  }//end for
  
}//end like function

