import { CartIcon } from "./iconos.js";

class NavBar {
  constructor(icon) {
    this.icon = icon;
  }

  render = (cantidad) => {
    return `
            <h3>carrito de compras</h3>
            <div class='nav-container'>
              ${this.icon}
              <div class='amount-container'>
                <p class='total-amount'>${cantidad}</p>
              </div>
            </div>
            `;
  };
}

export function insertarNavBar(cantidadItems) {
  const nav = document.getElementById("navBar");
  const icon = CartIcon();

  const navbar = new NavBar(icon);
  nav.innerHTML = navbar.render(cantidadItems);
}
