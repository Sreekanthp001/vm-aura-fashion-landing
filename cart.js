let cartContainer = document.getElementById('cartContainer');
let cartData = JSON.parse(localStorage.getItem('venturemond_cart')) || [];

function dynamicCartSection(ob, count) {
    let boxDiv = document.createElement('div');
    boxDiv.className = 'cart-item-box'; // Custom class for styling
    boxDiv.style.display = "flex";
    boxDiv.style.alignItems = "center";
    boxDiv.style.margin = "10px 0";

    boxDiv.innerHTML = `
        <img src="${ob.preview}" style="width: 80px; border-radius: 5px; margin-right: 15px;">
        <div>
            <h3>${ob.name} (x${count})</h3>
            <h4>Amount: Rs ${ob.price * count}</h4>
        </div>
    `;
    return boxDiv;
}

// Backend Call to get full product info for items in cart
let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if(this.readyState === 4 && this.status == 200) {
        let allProducts = JSON.parse(this.responseText);
        let totalAmount = 0;
        cartContainer.innerHTML = ""; // Clear loader

        // Logic to count duplicates
        let counts = {};
        cartData.forEach(id => { counts[id] = (counts[id] || 0) + 1; });

        Object.keys(counts).forEach(id => {
            let product = allProducts.find(p => p.id == id);
            if(product) {
                totalAmount += (product.price * counts[id]);
                cartContainer.appendChild(dynamicCartSection(product, counts[id]));
            }
        });

        document.getElementById("totalItem").innerHTML = 'Total Items: ' + cartData.length;
        document.getElementById("toth4").innerHTML = 'Amount: Rs ' + totalAmount;
    }
};

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
httpRequest.send();

// Place Order Logic
document.getElementById('place-order-btn').onclick = function() {
    localStorage.removeItem('venturemond_cart'); // Clear cart
    location.href = 'orderPlaced.html';
};