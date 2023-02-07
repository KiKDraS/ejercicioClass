import { CartContainer } from "./cartContainer.js";
import { insertarNavBar } from "./navBar.js";

(() => {
  //Elementos del DOM
  const section = document.getElementById("cartContainer");

  //Items en carrito
  let cantidadItems = 0;

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
    cantidadItems = items.length;
    insertarNavBar(cantidadItems);

    //Insertar Carrito
    const cartContainer = new CartContainer(items);
    cartContainer.calculateTotalPrice();
    cartContainer.handleClick();
    section.innerHTML = cartContainer.render();
  })();
})();
