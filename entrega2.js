//Productos existentes

let carrito = [];

class Producto {
    constructor(nombre,cantidad,precio) {
      this.nombre = nombre;
      this.cantidad = cantidad;
      this.precio = precio;
    }
  
    mostrarInfoProducto() {
      console.log("Producto: "+this.nombre+"  Cantidad: "+this.cantidad+"  Precio: $" +this.precio
      );
    }
}

const falda1=new Producto("Volantes",3,345)
const falda2=new Producto("Plisada",10,230)
const falda3=new Producto("Pliegues",1,400)

const pantalon1=new Producto("Deportivos",3,345)
const pantalon2=new Producto("Leggins",10,230)
const pantalon3=new Producto("Recto",1,400)

const playera1=new Producto("SinMangas",3,345)
const playera2=new Producto("CuelloV",10,230)
const playera3=new Producto("CuelloRedondo",1,400)

const faldas=[falda1,falda2,falda3]
const pantalones=[pantalon1,pantalon2,pantalon3]
const playeras=[playera1,playera2,playera3]

function agregarProducto(array) {
    let productoIngresado = prompt("Ingrese el nombre del producto");
    let cantidadIngresado = prompt("Ingrese la cantidad");
    let precioIngresado = parseInt(prompt("Ingrese el precio"));
  
    const productoNuevo = new Producto( productoIngresado, cantidadIngresado, precioIngresado);
  
    array.push(productoNuevo);
    console.log("Producto agregado: ")
    productoNuevo.mostrarInfoProducto();
}

function mostrarCatalogoForEach(array) {
    console.log("Los productos disponibles son:");
    array.forEach(
        producto=>producto.mostrarInfoProducto()
    )
}

function agregarAlCarrito(producto) {
    let cantidadDeseada = parseInt(prompt("Ingrese la cantidad deseada:"));
  
    if (isNaN(cantidadDeseada) || cantidadDeseada <= 0) {
      console.log("La cantidad ingresada no es válida");
      return;
    }
  
    if (cantidadDeseada > producto.cantidad) {
      console.log("No hay suficiente cantidad en existencia");
      return;
    }
  
    let productoEnCarrito = carrito.find((item) => item.nombre === producto.nombre);
  
    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidadDeseada;
    } else {
      let nuevoProducto = new Producto(producto.nombre, cantidadDeseada, producto.precio);
      carrito.push(nuevoProducto);
    }
  
    console.log("Producto agregado al carrito");

    vendedor()
}

function mostrarNota(array) {
    console.log("Detalle de la compra:");
  
    let totalCompra = 0;
  
    array.forEach((producto) => {
      const precioParcial = producto.precio * producto.cantidad;
      totalCompra += precioParcial;
  
      console.log("Producto: " + producto.nombre);
      console.log("Cantidad: " + producto.cantidad);
      console.log("Precio unitario: $" + producto.precio);
      console.log("Precio parcial: $" + precioParcial);
      console.log("--------------");
    });
  
    console.log("Total de la compra: $" + totalCompra);

    cliente()
  }
  
    
function buscarProducto(){
    let productoBuscado=prompt("Ingresa el producto que deseas buscar")

    //concatenar
    const todosProductos = faldas.concat(playeras,pantalones);

    let busqueda=todosProductos.find(
      (product)=>product.nombre.toUpperCase()==productoBuscado.toUpperCase()
    )
    if(busqueda==undefined){console.log(`El producto no esta en nuestro catalogo`)}
    else {
        console.log("Características del producto:");
        console.log("Nombre:", busqueda.nombre);
        console.log("Precio:", busqueda.precio);
        console.log("Cantidad en existencia:", busqueda.cantidad);
        

        let deseas=prompt("¿Deseas comprarlo?SI/NO")

        if(deseas="SI") agregarAlCarrito(busqueda)
    }

    cliente()
}

function buscarPrecio() {
    let precioMin = parseInt(prompt("Ingresa el precio mínimo:"));
    let precioMax = parseInt(prompt("Ingresa el precio máximo:"));

    const todosProductos = faldas.concat(playeras, pantalones);

    let productosEnRango = todosProductos.filter(
      (product) => product.precio >= precioMin && product.precio <= precioMax
    );

    if (productosEnRango.length === 0) {
      console.log("No hay productos en ese rango de precios");
    } else {
      console.log("Productos en el rango de precios:");
      productosEnRango.forEach((product) => {
        product.mostrarInfoProducto();
      });
    }

    cliente()
}


//mood cliente
function cliente(){
   console.log("Versión:Cliente")
   let opc=parseInt(prompt(`Elige una opción de compra
        1-Producto en especifico(busqueda)
        2-Rango de precio(busqueda)
        3-Mostrar nota
        4-Regresar al menu de usuario
    `))

    switch(opc){
        case 1:
            buscarProducto();
            break
        case 2:
            buscarPrecio()
            break
        case 3:
            mostrarNota(carrito)
            break;
        case 4:
            usuario()
            break
        default:
            alert("La opción ingresada no es valida,vuelve a intentar")
            cliente()
    }
}


//Opciones de vendedor
function modificarCantidad() {
    let categoria = parseInt(prompt(`Elige una categoría:
      1 - Faldas
      2 - Pantalones
      3 - Playeras
    `));
  
    let array;
  
    switch (categoria) {
      case 1:
        array = faldas;
        break;
      case 2:
        array = pantalones;
        break;
      case 3:
        array = playeras;
        break;
      default:
        console.log("Categoría inválida");
        return;
    }
  
    mostrarCatalogoForEach(array);
  
    let productoSeleccionado = prompt("Ingresa el nombre del producto:");
  
    let producto = array.find((p) => p.nombre.toUpperCase() === productoSeleccionado.toUpperCase());
  
    if (!producto) {
      console.log("El producto no se encontró en la categoría seleccionada");
      return;
    }
  
    let cantidadModificada = parseInt(prompt("Ingresa la cantidad a agregar:"));
  
    if (isNaN(cantidadModificada) || cantidadModificada <= 0) {
      console.log("La cantidad ingresada no es válida");
      return;
    }
  
    producto.cantidad += cantidadModificada;
  
    console.log("Cantidad actualizada del producto:");
    console.log("Nombre:", producto.nombre);
    console.log("Precio:", producto.precio);
    console.log("Nueva cantidad:", producto.cantidad);
}

function modificarPrecio() {
    let categoria = parseInt(prompt(`Elige una categoría:
      1 - Faldas
      2 - Pantalones
      3 - Playeras
    `));
  
    let array;
  
    switch (categoria) {
      case 1:
        array = faldas;
        break;
      case 2:
        array = pantalones;
        break;
      case 3:
        array = playeras;
        break;
      default:
        console.log("Categoría inválida");
        return;
    }
  
    mostrarCatalogoForEach(array);
  
    let productoSeleccionado = prompt("Ingresa el nombre del producto:");
  
    let producto = array.find((p) => p.nombre.toUpperCase() === productoSeleccionado.toUpperCase());
  
    if (!producto) {
      console.log("El producto no se encontró en la categoría seleccionada");
      return;
    }
  
    let nuevoPrecio = parseFloat(prompt("Ingresa el nuevo precio:"));
  
    if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
      console.log("El precio ingresado no es válido");
      return;
    }
  
    producto.precio = nuevoPrecio;
  
    console.log("Precio actualizado del producto:");
    console.log("Nombre:", producto.nombre);
    console.log("Nuevo precio:", producto.precio);
}
  

function vendedor(){
    console.log("Versión:Vendedor")
    let opc=parseInt(prompt(`Elige una opción de almacen
         1-Agregar producto
         2-Modificar cantidad
         3-Modificar precio
         4-Regresar al menu de usuario
     `))
 
     switch(opc){
         case 1:
            agregarProducto(faldas);
             break
         case 2:
             modificarCantidad()
             break
         case 3:
             modificarPrecio()
             break;
         case 4:
             usuario()
             break
         default:
             alert("La opción ingresada no es valida,vuelve a intentar")
             vendedor()
     }
 }


//Elegir usuario
function usuario(){
    let user=parseInt(prompt(`Elige una opción
        1-Cliente
        2-Vendedor
        3-Salir
    `))

    if(user==1) cliente()
    else if(user==2)vendedor()
    else if(user==3) console.log("Programa finalizado")
    else{
        console.log("Opcion incorrecta, volviendo al menu de usuario")
        usuario()
    }


}

usuario()
