function getResponse(){
  let configObj = {
    method: "GET",
    headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
    },
    body: ''
  };

  fetch("http://localhost:3000/dogs", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      let div = document.getElementById('toy-collection');
      let div1 = document.createElement('div');
      let h = document.createElement(h2);
      let img = document.createElement(img);
      let p= document.createElement('p');
      let btn = document.createElement('button');
      divT.className = 'card';
      btn.classList.add("like-btn");
       for(toy of object)
      {
         h.innerHTML = toy.name;          
         img.src = toy.image ;          
         p.innerHTML= toy.likes;          
         div1.prepend(h);
         h.after(img);
         img.after(p);
         p.after(btn);
         div.appendChild(divT);         
        }
    });

}
getResponse();