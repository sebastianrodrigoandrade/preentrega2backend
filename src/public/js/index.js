const socket = io();

const form = document.getElementById("form");

const productsList = document.getElementById("productsList");

form.onsubmit = (e) =>{
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const status = document.getElementById("status").value;   
    const code = document.getElementById("code").value;   
    
    const product = {
        title,
        description,
        price,
        stock,
        category,
        status,
        code
    };
    socket.emit("newProduct", product);
    form.reset();
};

socket.on('products',  (products)=>{
    let listaProducts = "";
    products.forEach((prod) => {
        listaProducts += `
        <div class="card-body">
            <h3 class="card-text">ID: ${prod.id}</h3>
            <h5 class="card-title">TITULO: ${prod.title}</h5>
            <h4 class="card-text">PRECIO: $ ${prod.price}</h4>
            <p class="card-text">DESCRIPCIÓN: ${prod.description}</p>
            <p class="card-text"> STOCK: ${prod.stock}</p>
            <p class="card-text"> CATEGORIA:${prod.category}</p>
            <p class="card-text">ESTADO: ${prod.status}</p>
            <p class="card-text">CÓDIGO: ${prod.code}</p>

            <button type="button"  class="btn btn-danger">eliminar</button>
        </div>`;
        
    });
    productsList.innerHTML = listaProducts;

    const btnEliminar = document.querySelectorAll(".btn-danger");

    btnEliminar.forEach((btn)=>{
        btn.addEventListener('click', (e)  => {
            e.preventDefault();
            const idProd = e.target.parentElement.children[0].innerText;
            const id = Number(idProd);
            socket.emit("deleteProduct", id);
            console.log("ìd del eliminar", typeof(id));
    
        });
    
    });

});