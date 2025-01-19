document.addEventListener("DOMContentLoaded", () => 
    {
    const productosContainer = document.querySelector("#productos-container");
  
    //capturo los elementos html (botones) que necesito
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const pageInfo = document.getElementById("page-info");
  
    //estan variables se utilizan para ver la pagina actual, la cantidad de elementos a mostrar y el total de elementos.
    let currentPage = 1;
    const limit = 20;
    let totalProductos = 0;
  
  
    function fetchProductos(page) 
    {
      //esta variable se usa para saber los elemtos que ya mostre y los que tienen que mostrar, o sea a partir del 2 en adelante
      const skip = (page - 1) * limit;
  
      fetch('https://dummyjson.com/products/category/smartphones')
        .then((response) => response.json())
        .then((data) => {
          totalProductos = data.total;
          const productos = data.products;
  
          // Limpia el contenedor de productos
          productosContainer.innerHTML = "";
  
          // Genera las cards de productos
          productos.forEach((product) => 
            {
            const cardDiv = document.createElement("div");
            cardDiv.className = "col-md-4";
  
            cardDiv.innerHTML = `
              <div class="card mt-3">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text fw-bold">Precio: $${product.price}</p>
                  <button class="btn btn-success mt-auto">Agregar</button>
                </div>
              </div>
            `;
  
            // Agregar evento al botón "Agregar"
            const botonAgregar = cardDiv.querySelector("button");
            botonAgregar.addEventListener("click", () => 
              {
              agregarAlCartito(product);
            });
  
            // Añadir la card al contenedor
            productosContainer.appendChild(cardDiv);
          });
  
  
          pageInfo.textContent = `Page ${currentPage}`;          
          prevBtn.disabled = currentPage === 1;
          nextBtn.disabled = (currentPage * limit) >= totalProductos;
  
  
  
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  
    // Función para agregar al carrito usando localStorage
    function agregarAlCartito(product) 
    {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.title} ha sido agregado al carrito!`);
    }
  
      prevBtn.addEventListener("click", () => 
        {
        if (currentPage > 1) {
            currentPage--;
            fetchProductos(currentPage);
        }
        });
  
  
      nextBtn.addEventListener("click", () => 
        {
        if ((currentPage * limit) < totalProductos) 
          {
            currentPage++;
            fetchProductos(currentPage);
        }
        });
  
  
  
    // Carga inicial de productos
    fetchProductos(currentPage);
  });
  