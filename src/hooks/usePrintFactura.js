import { jsPDF } from "jspdf";

export const usePrintFactura = ({
  pedidos,
  user,
  mesa,
  efectivo,
  devuelta,
  cierre,
  dinero,
  cliente,
}) => {
  const doc = new jsPDF({
    unit: "mm",
    format: [58, 300],
  });
  const iva = 0.19;
  var salto = 6;
  var total = 0;

  const setTheTotal = () => {
    var suma = 0;
    pedidos.forEach((element) => {
      suma = suma + element.cantidad * element.precio;
    });

    total = suma;
  };

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const imprimirSaltoLinea = (nombre, cantidad) => {
    var contador = 0;
    var text = "";
    while (contador < nombre.length) {
      var subContador = 0;
      while (subContador < cantidad && contador < nombre.length) {
        text = text + nombre[contador];
        subContador++;
        contador++;
      }
      if (contador < nombre.length) {
        text = text + "-";
      }
      imprimir(text);
      text = "";
    }
  };
  const imprimirTabla = (nombre, precio, total) => {
    const texto = nombre.split("");
    const inicio = salto;
    imprimirSaltoLinea(texto, 20);
    imprimir(
      `           \t\t\t\t${precio}\t\t${total}`,
      (salto - 3 + inicio) / 2
    );
  };

  const imprimirTablaComanda = (nombre, precio) => {
    const texto = nombre.split("");
    const inicio = salto;
    imprimirSaltoLinea(texto, 27);
    imprimir(`           \t\t\t\t\t${precio}`, (salto + inicio - 3) / 2);
  };

  const getTurno = (hora) => (hora < 16 ? "Día" : "Noche");

  const imprimir = (text, linea = salto) => {
    doc.text(text, 6, linea);
    salto += 3;
  };

  const imprimirLinea = () => {
    imprimir("______________________________________");
  };
  const imprimirComentario = (nombre, comentario) => {
    const com = comentario.split("");
    imprimir(`${nombre}:`);
    imprimirSaltoLinea(com, 30);
  };
  const print = () => {
    doc.setFontSize(6);

    setTheTotal();
    const date = new Date(Date.now());
    imprimir("Restaurante MARMARIS");
    imprimir("NIT: 700162695-5");
    imprimir("Telefono: 7273099 - 3163622240");
    imprimir(`Turno: ${getTurno(date.getHours())}`);
    imprimir(`factura de venta numero ${pedidos[0].factura}`);
    imprimir(`Vendedor: ${user.nombre}`);
    imprimir(
      `Fecha: ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} Hora: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
    if (typeof cliente !== "undefined") {
      imprimirSaltoLinea(`Cliente: ${cliente.nombre}`, 40);
      imprimir(`Telefono: ${cliente.numero}`);
      imprimirSaltoLinea(`Direccion: ${mesa.nombre}`, 40);
    } else {
      imprimirSaltoLinea(`Mesa: ${mesa.nombre}`, 40);
    }
    imprimirLinea();
    imprimir("Nombre\t\t\tCantidad\tTotal");
    imprimirLinea();
    pedidos.forEach((pedido) => {
      imprimirTabla(
        pedido.nombre,
        pedido.cantidad,
        pedido.cantidad * pedido.precio
      );
    });
    imprimirLinea();
    imprimir(`total:     \t\t\t\t\t\t${total}`);
    imprimirLinea();
    imprimir(`% iva\tValor base\tValor Impuesto`);
    imprimir(
      `${iva * 100}\t\t${Math.round(total * (1 - iva))}\t\t${Math.round(
        total * iva
      )}`
    );
    imprimir("");
    imprimir("");
    imprimir(`Efectivo:  \t\t\t\t\t${efectivo}`);
    imprimir(`Cambio:    \t\t\t\t\t${devuelta}`);
    imprimirLinea();
    imprimir("\t\t\tMuchas gracias");
    doc.save(
      `./${date.getFullYear()}/${
        monthNames[date.getMonth()]
      }/${date.getDay()}/Facturas/Factura ${pedidos[0].factura}`
    );
  };

  const imprimirCierre = (col1, col2, col3) => {
    doc.text(col1, 6, salto);
    doc.text(col2, 27 - col2.length / 2, salto);
    doc.text(col3, 48 - col3.length / 2, salto);
    salto += 3;
  };
  const comanda = () => {
    doc.setFontSize(8);

    setTheTotal();
    const date = new Date(Date.now());
    imprimir(`Turno: ${getTurno(date.getHours())}`);
    imprimir(
      `Fecha: ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} Hora: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
    imprimir(`factura de venta numero ${pedidos[0].factura}`);

    if (mesa.domicilio) {
      imprimirSaltoLinea(`Nombre: ${cliente.nombre}`, 35);
      imprimirSaltoLinea(`Telefono: ${cliente.numero}`, 35);
      imprimirSaltoLinea(`Direccion: ${mesa.nombre}`, 35);
    } else {
      imprimir(`Mesa: ${mesa.nombre}`);
    }
    imprimir(`Vendedor: ${user.nombre}`);
    imprimirLinea();
    imprimir("Nombre\t\t\t\t   Cant");
    imprimirLinea();
    pedidos.forEach((pedido) => {
      imprimirTablaComanda(pedido.nombre, pedido.cantidad);
    });
    imprimirLinea();
    pedidos.forEach((pedido) => {
      if (pedido.comentario) {
        imprimirComentario(pedido.nombre, pedido.comentario);
        imprimirLinea();
      }
    });
    doc.save(
      `./${date.getFullYear()}/${
        monthNames[date.getMonth()]
      }/${date.getDay()}/Comandas/Comanda ${pedidos[0].factura}`
    );
  };

  const facturacion = () => {
    doc.setFontSize(6);
    imprimir("CIERRE DE CAJA");
    const date = new Date();
    imprimir(
      `Fecha: ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} Hora: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
    console.log(user);
    imprimir(`Responsable: ${user.nombre}`);
    imprimirLinea();
    imprimir(`Base 200000`);
    imprimir(`Cierre ${cierre}`);
    imprimirLinea();
    imprimir("Valor\t\t\tcant\t\t\tsubTotal");
    dinero.forEach((din) => {
      imprimirCierre(
        `${din.valor}`,
        `${din.cantidad}`,
        `${din.cantidad * din.valor}`
      );
    });
    imprimirLinea();
    doc.save(
      `./${date.getFullYear()}/${
        monthNames[date.getMonth()]
      }/${date.getDate()}/Cierres/Cierre`
    );
  };

  return { print, comanda, facturacion };
};
