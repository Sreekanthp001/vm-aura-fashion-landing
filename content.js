function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "contentDetails.html?" + ob.id;

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  h3.innerHTML = ob.name;

  let h4 = document.createElement("h4");
  h4.innerHTML = ob.brand;

  let h2 = document.createElement("h2");
  h2.innerHTML = "Rs " + ob.price;

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");

// Fetch Products from API
let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
  if (this.readyState === 4 && this.status == 200) {
      let products = JSON.parse(this.responseText);
      
      // Update Badge from LocalStorage
      let cart = JSON.parse(localStorage.getItem('venturemond_cart')) || [];
      if(document.getElementById("badge")) {
          document.getElementById("badge").innerHTML = cart.length;
      }

      for (let i = 0; i < products.length; i++) {
        if (products[i].isAccessory) {
          containerAccessories.appendChild(dynamicClothingSection(products[i]));
        } else {
          containerClothing.appendChild(dynamicClothingSection(products[i]));
        }
      }
  }
};
httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
httpRequest.send();