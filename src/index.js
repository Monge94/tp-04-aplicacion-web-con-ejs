const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const { cargarMascotas } = require("./archivos");

const app = express();
const PORT = process.env.PORT || 3000;
const estadosPermitidos = ['En adopción', 'Reservada', 'Adoptada'];

async function iniciarServidor() {
  let mascotas;

  try {
<<<<<<< Updated upstream
    mascotasEnMemoria = await leerMascotas();

    // Configuración de EJS y Express
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
    
    app.use(expressEjsLayouts);
    app.set('layout', 'layouts/main');

    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../public')));

    // Rutas
    app.get('/', (req, res) => {
      res.render('inicio', { titulo: 'Inicio - Adopción de Mascotas' });
    });

    app.get('/mascotas', (req, res) => {
      res.render('mascotas/lista', { 
        titulo: 'Catálogo de Mascotas', 
        mascotas: mascotasEnMemoria 
      });
    });

    app.get('/mascotas/nueva', (req, res) => {
      res.render('mascotas/nueva', { 
        titulo: 'Registrar Nueva Mascota', 
        error: null, 
        valores: {} 
      });
    });

    app.get('/mascotas/:id', (req, res) => {
      const idBuscado = Number(req.params.id);
      const mascota = mascotasEnMemoria.find(m => m.id === idBuscado);

      if (!mascota) {
        return res.status(404).render('no-encontrado', { titulo: 'Mascota no encontrada' });
      }

      res.render('mascotas/detalle', { 
        titulo: `Detalle de ${mascota.nombre}`, 
        mascota 
      });
    });

    app.post('/mascotas', (req, res) => {
      const valores = {
        nombre: typeof req.body.nombre === 'string' ? req.body.nombre : '',
        especie: typeof req.body.especie === 'string' ? req.body.especie : '',
        edad: typeof req.body.edad === 'string' ? req.body.edad : '',
        estado: typeof req.body.estado === 'string' ? req.body.estado : '',
        descripcion: typeof req.body.descripcion === 'string' ? req.body.descripcion : ''
      };
      const nombre = valores.nombre.trim();
      const especie = valores.especie.trim();
      const edad = valores.edad.trim();
      const estado = valores.estado.trim();
      const descripcion = valores.descripcion.trim();
      const edadNum = Number(edad);

      const camposIncompletos = !nombre || !especie || !edad || !estado || !descripcion;
      const edadInvalida = !Number.isFinite(edadNum) || edadNum < 0;
      const estadoInvalido = !estadosPermitidos.includes(estado);

      if (camposIncompletos || edadInvalida || estadoInvalido) {
        return res.status(400).render('mascotas/nueva', {
          titulo: 'Registrar Nueva Mascota',
          error: 'Completa todos los campos, ingresa una edad válida igual o mayor a cero y selecciona un estado permitido.',
          valores
        });
      }

      const nuevoId = mascotasEnMemoria.length > 0 
        ? Math.max(...mascotasEnMemoria.map(m => m.id)) + 1 
        : 1;

      const nuevaMascota = {
        id: nuevoId,
        nombre,
        especie,
        edad: edadNum,
        estado,
        descripcion,
        imagen: '/img/mascota.svg'
      };

      mascotasEnMemoria.push(nuevaMascota);
      res.redirect('/mascotas');
    });

    // Manejador 404 general para rutas no definidas
    app.use((req, res) => {
      res.status(404).render('no-encontrado', { titulo: 'Página no encontrada' });
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

=======
    mascotas = await cargarMascotas();
>>>>>>> Stashed changes
  } catch (error) {
    console.error("No se pudieron cargar los datos iniciales:", error.message);
    process.exit(1);
  }

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.use(expressLayouts);
  app.set("layout", "layouts/main");
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    res.render("inicio", {
      title: "Inicio | Mascotas en adopción"
    });
  });

  app.get("/mascotas", (req, res) => {
    res.render("mascotas/lista", {
      title: "Catálogo | Mascotas en adopción",
      mascotas
    });
  });

  app.get("/mascotas/nueva", (req, res) => {
    res.render("mascotas/nueva", {
      title: "Nueva mascota | Mascotas en adopción",
      error: null,
      valores: {
        nombre: "",
        especie: "",
        edad: "",
        estado: "En adopción",
        descripcion: ""
      }
    });
  });

  app.get("/mascotas/:id", (req, res) => {
    const id = Number(req.params.id);
    const mascota = mascotas.find((item) => item.id === id);

    if (!mascota) {
      return res.status(404).render("no-encontrado", {
        title: "404 | Mascota no encontrada"
      });
    }

    return res.render("mascotas/detalle", {
      title: `${mascota.nombre} | Mascotas en adopción`,
      mascota
    });
  });

  app.post("/mascotas", (req, res) => {
    const valores = {
      nombre: String(req.body.nombre || "").trim(),
      especie: String(req.body.especie || "").trim(),
      edad: String(req.body.edad ?? "").trim(),
      estado: String(req.body.estado || "").trim(),
      descripcion: String(req.body.descripcion || "").trim()
    };

    const edad = Number(valores.edad);
    const estadosPermitidos = ["En adopción", "Reservada", "Adoptada"];
    let error = null;

    if (!valores.nombre || !valores.especie || !valores.edad ||
        !valores.estado || !valores.descripcion) {
      error = "Todos los campos son obligatorios.";
    } else if (!Number.isInteger(edad) || edad < 0) {
      error = "La edad debe ser un número entero mayor o igual a 0.";
    } else if (!estadosPermitidos.includes(valores.estado)) {
      error = "El estado seleccionado no es válido.";
    }

    if (error) {
      return res.status(400).render("mascotas/nueva", {
        title: "Nueva mascota | Mascotas en adopción",
        error,
        valores
      });
    }

    const nuevoId = mascotas.length
      ? Math.max(...mascotas.map((item) => item.id)) + 1
      : 1;

    mascotas.push({
      id: nuevoId,
      nombre: valores.nombre,
      especie: valores.especie,
      edad,
      descripcion: valores.descripcion,
      estado: valores.estado,
      imagen: "/img/mascota.svg"
    });

    return res.redirect("/mascotas");
  });

  app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
}

iniciarServidor().catch((error) => {
  console.error("Error inesperado al iniciar:", error);
  process.exit(1);
});