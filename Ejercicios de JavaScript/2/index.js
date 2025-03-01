const input = document.getElementById("tareaInput");
const btnAgregar = document.getElementById("agregarBtn");
const lista = document.getElementById("listaTareas");

btnAgregar.addEventListener("click", agregarTarea);
lista.addEventListener("click", administrarTarea);

function agregarTarea() {
  const texto = input.value.trim();
  if (texto === "") return alert("Agrega una tarea");

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = texto; 

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";

  span.addEventListener("click", () => {
    li.classList.toggle("completada");
  });

  btnEditar.addEventListener("click", () => {
    const nuevoInput = document.createElement("input");
    nuevoInput.type = "text";
    nuevoInput.value = span.textContent;

    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar";

    btnGuardar.addEventListener("click", () => {
      span.textContent = nuevoInput.value;
      li.replaceChild(span, nuevoInput);
      li.replaceChild(btnEditar, btnGuardar);
    });

    li.replaceChild(nuevoInput, span);
    li.replaceChild(btnGuardar, btnEditar);
  });

  li.appendChild(span);
  li.appendChild(btnEliminar);
  li.appendChild(btnEditar);
  lista.appendChild(li);
  input.value = "";
}

function administrarTarea(e) {
    if (e.target.tagName === "BUTTON" && e.target.textContent === "Eliminar") {
      e.target.parentElement.remove();
    }
  }
