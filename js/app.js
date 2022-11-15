//Elementos del DOM
window.nav = document.getElementById("navBar");
const section = document.getElementById("cartContainer");

//Armar NavBar
let cantidad = 0;
window.navbar = new NavBar(CartIcon());

window.addEventListener("DOMContentLoaded", () => {
  //Initial State
  const items = [];
  const api = "https://course-api.com/react-useReducer-cart-project";

  (async () => {
    try {
      const res = await fetch(api);
      if (!res.ok)
        throw new Error(`Ocurrió un error: ${res.status} - ${res.statusText}`);

      const data = await res.json();
      data.forEach((item) => {
        items.push(item);
      });
    } catch (error) {
      console.log(error);
    }

    //Insertar NavBar
    cantidad = items.length;
    nav.innerHTML = navbar.render(cantidad);

    //Insertar Carrito
    const cartContainer = new CartContainer(items);
    cartContainer.calculateTotalPrice();
    cartContainer.handleClick();
    section.innerHTML = cartContainer.render();
  })();
});

window.addEventListener("click", (e) => {
  switch (e.target.dataset.id) {
    case "btn-up":
      cantidad++;
      nav.innerHTML = navbar.render(cantidad);
      break;

    case "btn-down":
      cantidad--;
      nav.innerHTML = navbar.render(cantidad);
      break;
  }
});
