let nombres = "Alvaro Perez";
var edades = 32;
const cualquiercosa = 30;
let activo = true;
let variablenula = null;
let indefinido;
//cualquiercosa = "Alvaro";

console.log(nombres);
console.log(edades);
console.log(cualquiercosa);

console.log(typeof activo);
console.log(typeof variablenula);
console.log(typeof indefinido);

console.log(10 + 5);

console.log(10 == "10");
console.log(10 === "10");

let mensaje = edades >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(mensaje);

function saludar(nombre) {
  //console.log(`Hola ${nombre}`);
  return "Hola " + nombre;
}

console.log(saludar(nombres));

const sumar = (a, b) => a + b;

console.log(sumar(11, 5));

let frutas = ["Manzana", "Banano", "Pera"];

console.log(frutas);

frutas.push("Naranja");

console.log(frutas);

frutas.pop();

console.log(frutas);

console.log(frutas.length);

frutas.push("Mango");

let filtrar = frutas.filter((f) => f.startsWith("M"));
console.log(filtrar);

let personas = [];
let persona = {
  nombre: "Alvaro",
  edad: 32,
  saludar: function () {
    console.log(`Hola ${nombres}, edad ${edades}`);
  },
};
personas.push({
  nombre: "Alvaro",
});

console.log(personas);

persona.saludar();

persona.nombre = "Alvaro Javier";

console.log(persona);

const { nombre, edad } = persona;

console.log(persona.nombre);
console.log(nombre);

function esperar() {
  return new Promise((resolver) => {
    setTimeout(() => {
      resolver("Hecho");
    }, 3000);
  });
}

async function ejecutar() {
  console.log("Esperando...");
  let resultado = await esperar();
  console.log(resultado);
}

ejecutar();

let elemento = document.getElementById("sumar");
console.log(elemento);

elemento.addEventListener("click", () => {
  alert("Mostrar resultado?");
});

/*fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
*/

async function llamarapi() {
  try {
    let respuesta = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then((response) => response.json());
    console.log(respuesta);
  } catch (error) {
    console.log("Error al obtener los datos" + error);
  }
}

llamarapi();

class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hacerSonido() {
    console.log(this.nombre + " hace sonido");
  }
}

let perro = new Animal("Gato");
perro.hacerSonido();

//Calcular

document.getElementById("sumar").addEventListener("click", () => {
  calcular("+");
});

document.getElementById("restar").addEventListener("click", () => {
  calcular("-");
});

document.getElementById("multiplicar").addEventListener("click", () => {
  calcular("*");
});

document.getElementById("dividir").addEventListener("click", () => {
  calcular("/");
});

document.getElementById("raiz").addEventListener("click", () => {
  let num = parseFloat(document.getElementById("numero1").value);
  if (num < 0) {
      mostrarResultado("No se puede calcular la raíz de un número negativo");
  } else {
      mostrarResultado(`√${num} = ${Math.sqrt(num).toFixed(2)}`);
  }
});

function calcular(operacion) {
  let num1 = parseFloat(document.getElementById("numero1").value);
  let num2 = parseFloat(document.getElementById("numero2").value);
  let resultado;

  if (isNaN(num1) || isNaN(num2)) {
      mostrarResultado("Por favor ingrese números válidos");
      return;
  }

  switch (operacion) {
      case "+":
          resultado = num1 + num2;
          break;
      case "-":
          resultado = num1 - num2;
          break;
      case "*":
          resultado = num1 * num2;
          break;
      case "/":
          if (num2 === 0) {
              mostrarResultado("No se puede dividir por cero");
              return;
          }
          resultado = num1 / num2;
          break;
  }

  mostrarResultado(`Resultado: ${resultado}`);
}

function mostrarResultado(mensaje) {
  document.getElementById("resultado").textContent = mensaje;
}
