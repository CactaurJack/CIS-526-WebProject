fetch("./box-locations.json")
.then(response => {
   return response.json();
})
.then(data => {
  for(let i = 0; i<data.length; i++){
    var newDiv = document.createElement("div");
    var elem = document.createElement("img");
    elem.src = 'https://open.mapquestapi.com/staticmap/v5/map?locations=' + data[i].lat + '%20' + data[i].lng + '&size=300,300&key=fb84O6s080JPauguxWmJVpAnkv806tYQ&zoom=14';
    var para = document.createElement("p");
    var title = document.createTextNode(data[i].name);
    para.appendChild(title);
    newDiv.appendChild(elem);
    newDiv.appendChild(para);

    document.getElementById("cardContainer").appendChild(newDiv);
  }
});




