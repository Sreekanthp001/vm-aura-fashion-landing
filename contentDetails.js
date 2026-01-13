console.clear();

let id = location.search.split('?')[1];

// Function to update badge from LocalStorage
function updateBadge() {
    let cart = JSON.parse(localStorage.getItem('venturemond_cart')) || [];
    let badge = document.getElementById("badge");
    if (badge) {
        badge.innerHTML = cart.length;
    }
}

// Initial badge update
updateBadge();

function dynamicContentDetails(ob) {
    let mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    let imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = ob.preview;
    imageSectionDiv.appendChild(imgTag);

    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    let h1 = document.createElement('h1');
    h1.innerHTML = ob.name;

    let h4 = document.createElement('h4');
    h4.innerHTML = ob.brand;

    let detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    let h3DetailsDiv = document.createElement('h3');
    h3DetailsDiv.innerHTML = 'Rs ' + ob.price;

    let h3Description = document.createElement('h3');
    h3Description.innerHTML = 'Description';

    let para = document.createElement('p');
    para.innerHTML = ob.description;

    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    let h3ProductPreview = document.createElement('h3');
    h3ProductPreview.innerHTML = 'Product Preview';
    productPreviewDiv.appendChild(h3ProductPreview);

    // Image Preview Logic
    for(let i=0; i<ob.photos.length; i++) {
        let previewImg = document.createElement('img');
        previewImg.className = 'previewImg'; // Changed id to class for multiple images
        previewImg.src = ob.photos[i];
        previewImg.onclick = function() {
            document.getElementById("imgDetails").src = this.src;
        }
        productPreviewDiv.appendChild(previewImg);
    }

    // BUTTON SECTION - Fixed with LocalStorage
    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    let buttonTag = document.createElement('button');
    buttonTag.innerHTML = 'Add to Cart';
    
    buttonTag.onclick = function() {
        // Get existing cart or empty array
        let cart = JSON.parse(localStorage.getItem('venturemond_cart')) || [];
        
        // Add current product id to cart
        cart.push(id);
        
        // Save back to LocalStorage
        localStorage.setItem('venturemond_cart', JSON.stringify(cart));
        
        // Visual Feedback
        updateBadge();
        alert("Item added to Venturemond Cart!");
    }
    
    buttonDiv.appendChild(buttonTag);

    // Appending everything
    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);
    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(h3DetailsDiv);
    detailsDiv.appendChild(h3Description);
    detailsDiv.appendChild(para);
    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);

    return mainContainer;
}

// BACKEND CALLING
let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if(this.readyState === 4 && this.status == 200) {
        let contentDetails = JSON.parse(this.responseText);
        dynamicContentDetails(contentDetails);
    }
}
httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + id, true);
httpRequest.send();