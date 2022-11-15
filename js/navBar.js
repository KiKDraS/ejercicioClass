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
