import axios from 'axios';
import Noty from 'noty';

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector('#cartCounter');

// update cart function
function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res=> {
        cartCounter.innerText = res.data.totalQty;
        // this noty handles the pop-up function when you add item to cart
        new Noty({
          type: 'success',
          timeout: 1000,
          text: 'Item added to cart',
          progressBar: false, // Enable this if you want the noty pop-up to show a tiny progress bar which true by default & it is cool tho
          // layout: 'topLeft'
      }).show();
    }).catch(err => {
      new Noty({
        type: 'error',
        timeout: 1000,
        text: 'Something went wrong',
        progressBar: false, // Enable this if you want the noty pop-up to show a tiny progress bar which true by default & it is cool tho
        // layout: 'topLeft'
    }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
    console.log(pizza);
  });
});
