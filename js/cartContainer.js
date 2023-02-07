/*
    Renderiza la vista del carrito. Contiene una lista de Objetos CartItem
    Maneja la funcionalidad de aplicación.

    renderItems() 
        => Lee la lista de Objetos para generar la vista del carrito

    calculateTotalPrice() 
        => Lee la lista de Objetos para calcular el precio total de los items en el carrito. Vuelve a renderizar la vista para actualizar correctamente los valores

    handleClick() => Maneja la delegación del evento click a los distintos elementos de la vista
        => Botones up/down 
            => Cambian el valor almacenado en el Objeto CartItem según el id. Vuelven a renderizar la vista para actualizar valores
        => Botón clear
            => Limpia el array almacenado en el Objeto Container. Actualiza la vista renderizada
            
    render() 
        => retorna el HTML que se inserta en el innerHTML del elemento de HTML para generar la vista del carrito. Genera una vista condicional en base a la existencia de elementos en el array items del Objeto CartContainer
*/

import { ChevronDown, ChevronUp } from "./iconos.js";
import { insertarNavBar } from "./navBar.js";

export class CartContainer {
  constructor(items) {
    this.items = items;
    this.total = 0;
    this.cantidadItems = items.length;
  }

  renderItems = () => {
    return this.items
      .map((item) => {
        const cartItem = new CartItem(item);
        return cartItem.render();
      })
      .join("");
  };

  calculateTotalPrice = () => {
    let amount = 0;
    let totalPrice = 0;
    this.items.forEach((item) => {
      amount += item.amount;
      totalPrice += item.amount * Number(item.price);
      this.total = totalPrice;
    });
  };

  handleClick = () => {
    document.addEventListener("click", ({ target }) => {
      const container = document.getElementById("cartContainer");

      if (target.classList.contains("up")) {
        const itemId = target.id.slice(3, target.id.length);
        const item = this.items.find((item) => item.id === itemId);
        const itemIndex = this.items.indexOf(item);
        const nuevaCantidad = item.amount + 1;

        this.items[itemIndex].amount = nuevaCantidad;
        this.calculateTotalPrice();

        let cantidadItems = 0;
        this.items.forEach((el) => (cantidadItems += el.amount));
        this.cantidadItems = cantidadItems;

        insertarNavBar(this.cantidadItems);
        container.innerHTML = this.render();
      } else if (target.classList.contains("down")) {
        const itemId = target.id.slice(5, target.id.length);
        const item = this.items.find((item) => item.id === itemId);
        const itemIndex = this.items.indexOf(item);
        const nuevaCantidad = item.amount - 1;

        if (nuevaCantidad === 0) {
          this.items.splice(itemIndex, 1);
          this.calculateTotalPrice();

          let cantidadItems = 0;
          this.items.forEach((el) => (cantidadItems += el.amount));
          this.cantidadItems = cantidadItems;

          insertarNavBar(this.cantidadItems);
          container.innerHTML = this.render();
        } else {
          this.items[itemIndex].amount = nuevaCantidad;
          this.calculateTotalPrice();

          let cantidadItems = 0;
          this.items.forEach((el) => (cantidadItems += el.amount));
          this.cantidadItems = cantidadItems;

          insertarNavBar(this.cantidadItems);
          container.innerHTML = this.render();
        }
      } else if (target.id === "remove") {
        const itemId = target.dataset.id;
        this.items = this.items.filter((el) => el.id !== itemId);

        let cantidadItems = 0;
        this.items.forEach((el) => (cantidadItems += el.amount));
        this.cantidadItems = cantidadItems;

        insertarNavBar(this.cantidadItems);
        container.innerHTML = this.render();
      } else if (target.id === "clear") {
        const borrar = confirm("¿Seguro que quiere eliminar todo el carrito?");

        if (borrar) {
          this.items = [];
          insertarNavBar(0);
          container.innerHTML = this.render();
        } else {
          return;
        }
      }
    });
  };

  render = () => {
    if (this.items.length < 1) {
      return ` 
            <section class="cart">
                <h2>your bag</h2>
                <h4 class="empty-cart">is currently empty</h4>
            </section>
            `;
    }
    return `
    <section class="cart">
        <header>
            <h2>your bag</h2>
        </header>
        <div>
            ${this.renderItems()}
        </div>
        <footer>
        <hr />
        <div class="cart-total">
            <h4>
            total <span>${this.total.toFixed(2)}</span>
            </h4>
        </div>
        <button id="clear" class="btn clear-btn">
            clear cart
        </button>
        </footer>
    </section>
    `;
  };
}

class CartItem {
  constructor(item) {
    const { id, img, title, price, amount } = item;
    this.id = id;
    this.img = img;
    this.title = title;
    this.price = price;
    this.amount = amount;
    this.btnUp = new Button(`up-${this.id}`, ChevronUp, "btn-up");
    this.btnDown = new Button(`down-${this.id}`, ChevronDown, "btn-down");
  }

  render = () => {
    return `
            <article class="cart-item">
                <img src=${this.img} alt=${this.title} />
                <div>
                  <h4>${this.title}</h4>
                  <h4 class="item-price">${this.price}</h4>
                  <button
                    id="remove"
                    class="remove-btn"
                    data-id=${this.id}>
                    remove
                  </button>
                </div>
                <div>
                  ${this.btnUp.render()}
                  <p class="amount">${this.amount}</p>
                  ${this.btnDown.render()}
                </div>
            </article>
                `;
  };
}

class Button {
  constructor(id, iconFn, dataSet) {
    this.id = id;
    this.icon = iconFn(id, dataSet);
  }

  render = () => {
    return `<button class="amount-btn">
            ${this.icon}
        </button>`;
  };
}
