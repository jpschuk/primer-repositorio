/** @format */

// Declaracion de class
class Productos {
	constructor(id, nombre, precio, imgUrl) {
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.imgUrl = imgUrl;
	}
}

//tratamiento de inputs, creacion y carga de productos en localStorage

// Carga de productos almacenados en localStorage para futuro tratamiento
let productos = [];
const loadProducts = () => {
	if (!localStorage.getItem('productosAlmacenados')) {
		productos.push(new Productos(1, 'Leche', 200, 'https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/lecheok_0.jpg.webp?itok=0XaoEZv0'));
		productos.push(new Productos(2, 'Pan', 100, 'https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/lecheok_0.jpg.webp?itok=0XaoEZv0'));
		productos.push(new Productos(3, 'Huevos', 150, 'https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/lecheok_0.jpg.webp?itok=0XaoEZv0'));
		localStorage.setItem('productosAlmacenados', JSON.stringify(productos));
	} else {
		let productosEnLocalStorage = localStorage.getItem('productosAlmacenados');
		productos = JSON.parse(productosEnLocalStorage);
	}
	if (!localStorage.getItem('cart')) {
		localStorage.setItem('cart', '[]');
	}
};
// Creacion y manipulacion de elementosHTML (DOM)

//Declaro funcion de Output de productos cargados en localStorage usando DOM
const mostrarProductos = () => {
	let cajaPadre = document.querySelector('.padre');
	cajaPadre.innerHTML = '';
	for (const producto of productos) {
		let elementoHtml = document.createElement('div');
		elementoHtml.className = 'col-4';
		elementoHtml.innerHTML = `
		<div class='product-card'>
		<div class='img-box'>
				<img src=${producto.imgUrl} alt="">
			</div>
			<div>
				<p> ${producto.nombre}</p> 
				<p> ${producto.precio}</p> 
			</div>
			<div>
				<button id='${producto.id}' class='btn btn-add'	>
					Agregar al carrito
				</button>
			</div>
		</div>`;
		cajaPadre.append(elementoHtml);
	}
};

const addCartFuncToButtons = () => {
	const buttons = document.querySelectorAll('.btn-add');
	let $buttons = Array.from(buttons);

	$buttons.map((boton) => {
		boton.addEventListener('click', addToCart);
		boton.id = boton.id;
	});
};

const deleteCartToButtons = () => {
	const buttons = document.querySelectorAll('.btn-delete');
	let $buttons = Array.from(buttons);
	$buttons.map((boton) => {
		boton.addEventListener('click', deleteFromCart);
		boton.id = boton.id;
	});
};

const deleteFromCart = (event) => {
	let cart = JSON.parse(localStorage.getItem('cart'));
	cart = cart.filter((prod) => prod.id != event.currentTarget.id);
	localStorage.setItem('cart', JSON.stringify(cart));
	mostrarCarrito();
};

const addToCart = (event) => {
	const cart = JSON.parse(localStorage.getItem('cart'));
	const prodToAdd = productos.filter((prod) => prod.id == event.currentTarget.id);
	cart.push(prodToAdd[0]);
	localStorage.setItem('cart', JSON.stringify(cart));
	mostrarCarrito();
};

const mostrarCarrito = () => {
	const cart = JSON.parse(localStorage.getItem('cart'));
	let cajaPadre = document.querySelector('.cart');
	cajaPadre.innerHTML = '';
	for (const prodCart of cart) {
		let elementoHtml = document.createElement('div');
		elementoHtml.className = 'col-4';
		elementoHtml.innerHTML = `
		<div class='product-card'>
		<div class='img-box'>
		<img src=${prodCart.imgUrl} alt="">
		</div>
		<div>
		<p> ${prodCart.nombre}</p> 
				<p> ${prodCart.precio}</p> 
			</div>
			<div>
				<button id='${prodCart.id}' class='btn btn-delete'	>
				Quitar del carrito
				</button>
				</div>
				</div>`;
		cajaPadre.append(elementoHtml);
	}
	calcularTotal();
	deleteCartToButtons();
};
const calcularTotal = () => {
	const cart = JSON.parse(localStorage.getItem('cart'));
	const totalElement = document.querySelector('.total-amount');
	let total = 0;
	cart.map((prod) => (total += prod.precio));
	totalElement.innerHTML = total;
};
// Llamadada a la funcion para mostrar productos
loadProducts();
mostrarProductos();
mostrarCarrito();
addCartFuncToButtons();
deleteCartToButtons();

// Declaracion de escuchador de eventos (eventListening) para la eliminacion de productos
