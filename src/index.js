
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
	
})
	.then(function (response) {
		return response.json();
	})
	.then(function (json) {
		obj = json;
		for (let i = 0; i < obj.length; i++) {
			let newDiv = document.createElement("div");
			let header2 = document.createElement("h2");
			let img = document.createElement("img");
			let para = document.createElement("p");
			let btn = document.createElement("button");
			btn.className="btnLike";
			para.className="numberOfLike"

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


			btn.onclick = function(event){
				event.preventDefault();
				fetch(`http://localhost:3000/toys/${obj[i].id}`,{
					method:"PATCH",
					headers: 
					{
					"Content-Type": "application/json",
					Accept: "application/json"
					},
					
					body:JSON.stringify({
					"likes":`${obj[i].likes}`
					})
				})
					.then(function(res){
						return res.json()
					})
					.then(function(obja){
						console.log(obja);
						
						para.innerHTML =`${obj[i].likes++} likes`
						
					})
			console.log("Nothing happens")
			}
			


		}
	});


let addBtn = document.getElementById("new-toy-btn");

addBtn.onclick = function(){
	fetch("http://localhost:3000/toys",
	{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			"name": "Jessie",
			"image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
			"likes": 0
		  })
	}).then(function(response){
		return response.json();
	}).then(function(json){
		console.log(json);
		let newDiv = document.createElement("div");
		let header2 = document.createElement("h2");
		let img = document.createElement("img");
		let para = document.createElement("p");
		let btn = document.createElement("button");
		btn.className="btnLike";
		para.className="numberOfLike"
		newDiv.className = "card";
		toyCol.appendChild(newDiv);

		newDiv.appendChild(header2);
		newDiv.appendChild(img);
		newDiv.appendChild(para);
		newDiv.appendChild(btn);

		header2.innerHTML = `${json.name}`;
		img.src = `${json.image}`;
		para.innerText = `${json.likes} likes`;
		btn.innerHTML = `Like It`;


		
	})
}





