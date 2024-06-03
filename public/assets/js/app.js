let roommates = [];
let gastos = [];
let gastoEditing = null;

const agregarGasto = async () => {
  const roommateSelected = $("#roommatesSelect").val();
  const descripcion = $("#descripcion").val();
  const monto = Number($("#monto").val());

  try {
    const selectedRoommate = roommates.find(roommate => roommate.nombre === roommateSelected);

    if (selectedRoommate) {
      const roommateId = selectedRoommate.id;

      const data = {
        roommate_id: roommateId,
        roommate_nombre: roommateSelected,
        gasto_name: descripcion,
        monto: monto,
      };

      const response = await fetch("http://localhost:3000/api/v1/gastos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${errorText}`);
      }

      const createdGasto = await response.json();
      console.log("Gasto creado:", createdGasto);
      location.reload();
      imprimirGastos();
    } else {
      console.error("No se encontró ningún compañero de cuarto con ese nombre.");
    }
  } catch (error) {
    console.error("Error al agregar gasto:", error.message);
  }
};

const getRoommates = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/roommates");
    roommates = await res.json();
    console.log(roommates);
  } catch (error) {
    console.log(error);
  }
};

const getGastos = async () => {
  const res = await fetch("http://localhost:3000/api/v1/gastos");
  gastos = await res.json();
  console.log("Gastos recuperados:", gastos);
};

const calcularDebeRecibe = () => {
  const totalGastos = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
  const cuotaIndividual = totalGastos / roommates.length;

  let debe = {};
  let recibe = {};

  roommates.forEach(roommate => {
    debe[roommate.nombre] = 0;
    recibe[roommate.nombre] = 0;
  });

  gastos.forEach(gasto => {
    const { roommate_nombre, monto } = gasto;
    roommates.forEach(roommate => {
      if (roommate.nombre !== roommate_nombre) {
        debe[roommate.nombre] += monto / roommates.length;
      }
    });
    recibe[roommate_nombre] += monto * (roommates.length - 1) / roommates.length;
  });

  roommates.forEach(roommate => {
    const nombre = roommate.nombre;
    debe[nombre] = Math.round(debe[nombre]);
    recibe[nombre] = Math.round(recibe[nombre]);
  });

  return { debe, recibe };
};

const imprimirRoommates = () => {
  const { debe, recibe } = calcularDebeRecibe();
  $("#roommates").html("");
  $("#roommatesSelect").html("");
  $("#roommatesSelectModal").html("");

  roommates.forEach(roommate => {
    $("#roommatesSelect").append(`<option value="${roommate.nombre}">${roommate.nombre}</option>`);
    $("#roommatesSelectModal").append(`<option value="${roommate.nombre}">${roommate.nombre}</option>`);
    $("#roommates").append(`
      <tr>
        <td>${roommate.nombre}</td>
        <td id="debeRoommate">${debe[roommate.nombre]}</td>
        <td id="recibeRoommate">${recibe[roommate.nombre]}</td>
      </tr>
    `);
  });
};

const imprimirGastos = () => {
  $("#gastosHistorial").html("");
  gastos.forEach(g => {
    const gastoId = g.gasto_id; 
    $("#gastosHistorial").append(`
      <tr>
        <td>${g.roommate_nombre}</td>
        <td>${g.gasto_name}</td>
        <td>${g.monto}</td>
        <td class="d-flex align-items-center justify-content-between">
          <i class="fas fa-edit text-warning" onclick="editGasto('${g.gasto_id}')" data-toggle="modal" data-target="#exampleModal"></i>
          <i class="fas fa-trash-alt text-danger" onclick="deleteGasto('${g.gasto_id}')" ></i>
        </td>
      </tr>
    `);
  });
};

const imprimir = async () => {
  try {
    await getRoommates();
    await getGastos();
    imprimirRoommates();
    imprimirGastos();
  } catch (e) {
    console.log(e);
  }
};

const nuevoRoommate = () => {
  fetch("http://localhost:3000/api/v1/roommates", { method: "POST" })
    .then((res) => res.json())
    .then(() => {
      location.reload();
    });
};

const deleteGasto = async (id) => {
  await fetch("http://localhost:3000/api/v1/gastos/" + id, {
    method: "DELETE",
  });
  location.reload();
  imprimirGastos();
};

const updateGasto = async () => {
  const roommateSelected = $("#roommatesSelectModal").val();
  const descripcion = $("#descripcionModal").val();
  const monto = Number($("#montoModal").val());

  console.log("Datos enviados al backend:", {
    roommate: roommateSelected,
    descripcion,
    monto,
  });

  await fetch("http://localhost:3000/gastos/" + gastoEditing, {
    method: "PUT",
    body: JSON.stringify({
      roommate: roommateSelected,
      descripcion,
      monto,
    }),
  });
  $("#exampleModal").modal("hide");
  imprimir();
};

const editGasto = (id) => {
  gastoEditing = id;
  console.log(gastoEditing)
  const gasto = gastos.find(g => g.gasto_id === id);

  if (gasto) {
    const { gasto_name, monto, roommate_nombre } = gasto;

    $("#roommatesSelectModal").val(roommate_nombre);
    $("#descripcionModal").val(gasto_name);
    $("#montoModal").val(monto);
  } else {
    console.error("No se encontró ningún gasto con el ID:", id);
  }
};

imprimir();
