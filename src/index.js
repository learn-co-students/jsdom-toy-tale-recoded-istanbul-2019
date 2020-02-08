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
});

// const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
// const imgCon = document.getElementById("dog-image-container");
// let newIm = document.createElement("img");

// imgCon.appendChild(newIm);
// document.querySelector("img").id ="image";

// fetch(imgUrl).then(function(response){
// 	return response.json()
// 	.then(function(json){
// 		document.getElementById("image").src=json.message[0];

// 	})
// })

// let newLi = document.createElement("li");
// // document.getElementById("dog-breeds")
// // document.querySelector

// const breedUrl = 'https://dog.ceo/api/breeds/list/all'

// fetch(breedUrl).then(function(response){
// 	return response.json()
// 	.then(function(json){
// 		aI = json;
// 		for (let i=0;i<json.length;i++){
//             document.querySelector("#dog-breeds").appendChild(newLi).innerText=json.message[i];
// }
// 	})
// })

let toyCol = document.getElementById("toy-collection");

let myData = {
	id: Number,
	name: "",
	image: ""
};

fetch("http://localhost:3000/toys", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	},
	// body:`{
	// 	"name":"Ali",
	// 	"image":"ll",
	// 	"likes":0

	// }`
})
	.then(function (response) {
		return response.json();
	})
	.then(function (json) {
		obj = json;
		for (let i = 0; i < obj.length; i++) {
			console.log(obj[i])
			let newDiv = document.createElement("div");
			let header2 = document.createElement("h2");
			let img = document.createElement("img");
			let para = document.createElement("p");
			let btn = document.createElement("button");
			newDiv.className = "card";
			toyCol.appendChild(newDiv);

			newDiv.appendChild(header2);
			newDiv.appendChild(img);
			newDiv.appendChild(para);
			newDiv.appendChild(btn);

			header2.innerHTML = `${obj[i].name}`;
			img.src = `${obj[i].image}`;
			para.innerText = `${obj[i].likes} likes`;
			btn.innerHTML = `Like It`;

		}
	});


let addBtn = document.getElementById("new-toy-btn");

addBtn.onclick = function(){
	fetch("http://localhost:3000/toys",
	{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({
			"name": "Jessie",
			"image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
			"likes": 0
		  })
	}).then(function(response){
		return response.json();
	}).then(function(json){
		let newDiv = document.createElement("div");
		let header2 = document.createElement("h2");
		let img = document.createElement("img");
		let para = document.createElement("p");
		let btn = document.createElement("button");
		newDiv.className = "card";
		toyCol.appendChild(newDiv);

		newDiv.appendChild(header2);
		newDiv.appendChild(img);
		newDiv.appendChild(para);
		newDiv.appendChild(btn);

		header2.innerHTML = `${json[0].name}`;
		img.src = `${json[0].image}`;
		para.innerText = `${json[0].likes} likes`;
		btn.innerHTML = `Like It`;
	})
}
