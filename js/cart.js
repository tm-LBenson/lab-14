/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems.items);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  // localStorage.clear();
  const tbody = document.querySelectorAll('tbody>tr');
  for (let tr of tbody) {
    tr.remove();
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  let tbody = document.querySelector('tbody');
  for (let i in cart.items) {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'row');
    const tdName = document.createElement('td');
    tdName.innerText = cart.items[i][0];
    const tdAmount = document.createElement('td');
    tdAmount.innerText = cart.items[i][1];
    const xButton = document.createElement('a');
    const tdButton = document.createElement('td');
    xButton.innerText = 'x';
    xButton.id = i;
    tbody.appendChild(tr);
    tr.appendChild(tdButton);
    tdButton.appendChild(xButton);
    tr.appendChild(tdAmount);
    tr.appendChild(tdName);
  }
}
// TODO: Find the table body
// TODO: Iterate over the items in the cart
// TODO: Create a TR
// TODO: Create a TD for the delete link, quantity,  and the item
// TODO: Add the TR to the TBODY and each of the TD's to the TR

function removeItemFromCart(event) {
  const deleteRows = document.querySelectorAll('.row');
  for (let row of deleteRows) {
    row.remove();
  }

  cart.removeItem(event.target.id);
  renderCart();
  localStorage.clear();
  localStorage.setItem('cart', JSON.stringify(cart));
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
}

// This will initialize the page and draw the cart on screen
renderCart();
