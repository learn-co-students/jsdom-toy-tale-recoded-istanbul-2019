let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  getTOYS().catch(err => console.error(err));
  async function getTOYS() {
    const response = await fetch("./toys.json")
    const result = await response.json();
    result.forEach(item => {
      create = (arg) => document.createElement(arg);
      let dd = create('div');
      dd.setAttribute("class", "card");
      let hhname = document.createTextNode(item.name);
      let hh = create('h2');
      hh.appendChild(hhname);
      let ii = create('img');
      ii.setAttribute("class", "toy-avatar");
      ii.src = item.image;
      let pptext = document.createTextNode(`${item.likes} Likes`);
      let pp = create('p');
      pp.appendChild(pptext);
      let bbtext = document.createTextNode("Like <3");
      let bb = create('button')
      bb.appendChild(bbtext);
      bb.setAttribute("class", "like-btn");
      dd.appendChild(hh);
      dd.appendChild(ii);
      dd.appendChild(pp);
      dd.appendChild(bb);
      document.querySelector('#toy-collection').appendChild(dd);
      //end of adding div.card

    })//end of result foreach

    let formprevent = document.querySelector('.add-toy-form');
    let getBTN = document.querySelectorAll(".card");
    let tab = [], index;
    getBTN.forEach(btnone => {
      tab.push(btnone.textContent);
      let currentlike = btnone.children[2].innerText.slice(0, btnone.children[2].innerText.indexOf(' Likes'));
      //when each div.card is clicked
      btnone.addEventListener("click", (e) => {
        e.preventDefault();
        index = tab.indexOf(btnone.textContent);
        console.log(index);
        currentlike++;
        addlikes(currentlike, index).catch(err => console.error(err));
      });
    })

  }//end of async gettoys
  document.querySelector(".submit").addEventListener("click", (e) => {
    e.preventDefault();
    addTOYS();
    console.log('submitting')
  });
  
  async function addTOYS() {
    let newname = document.querySelector("input[name='name']").value;
    let newimg = document.querySelector("input[name='image']").value;
    let postInfo = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newname,
        image: newimg,
        likes: 0
      })
    };//end of postInfo
    const response = await fetch("./toys.json", postInfo);
    const result = await response.json();
    result.forEach(item => {
      console.log(item);
    })//end of result foreach
      .catch(err => console.error(err));
  }//end of async addtoys

  async function addlikes(currentlike, index) {
    let postInfo = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: currentlike
      })
    };//end of postInfo
  }//end of async addlikes
})//end of domload
