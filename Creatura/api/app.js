
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
//cosas porque cors//
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());
//fin cosas porque cors//

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

///////////////////////////////////////////////////////////////////
// SECCION CREATURAS //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

let creaturas = [
  {
    id_creatura: 1,
    nombre_creatura: 'Tsunamind',
    id_tipo1: 2,
    id_tipo2: 15,
    descripcion: 'Medusa.',
    hp: 80,
    atk: 55,
    def: 70,
    spa: 135,
    sdef: 115,
    spe: 55,
    creador: 'MMK',
    imagen: 'tsunamind.png',
    publico: 0
  },{
    id_creatura: 2,
    nombre_creatura: 'Boomvine',
    id_tipo1: 3,
    id_tipo2: 1,
    descripcion: '',
    hp: 10,
    atk: 120,
    def: 20,
    spa: 120,
    sdef: 15,
    spe: 150,
    creador: 'MMK',
    imagen: 'Boomvine.png',
    publico: 1
  },{
    id_creatura: 3,
    nombre_creatura: 'Lore',
    id_tipo1: 15,
    id_tipo2: 4,
    descripcion: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of-',
    hp: 120,
    atk: 20,
    def: 40,
    spa: 256,
    sdef: 80,
    spe: 50,
    creador: 'MMK',
    imagen: 'Lore.png',
    publico: 1
  },{
    id_creatura: 4,
    nombre_creatura: 'Nicolás',
    id_tipo1: 13,
    id_tipo2: 5,
    descripcion: 'Nicolás que haces acá??',
    hp: 90,
    atk: 120,
    def: 85,
    spa: 100,
    sdef: 70,
    spe: 95,
    creador: 'MMK',
    imagen: 'Nicolas.png',
    publico: 1
  },{
    id_creatura: 5,
    nombre_creatura: 'Gualberto',
    id_tipo1: 4,
    id_tipo2: 19,
    descripcion: 'Gualberto, naturalmente en su salón 16.',
    hp: 90,
    atk: 120,
    def: 85,
    spa: 100,
    sdef: 70,
    spe: 95,
    creador: 'Gualberto',
    imagen: 'Gualberto.png',
    publico: 1
  },{
    id_creatura: 6,
    nombre_creatura: 'The Queen of hearts',
    id_tipo1: 3,
    id_tipo2: 20,
    descripcion: 'Off with his head. NOW!',
    hp: 30,
    atk: 150,
    def: 35,
    spa: 40,
    sdef: 80,
    spe: 106,
    creador: 'Mr.Dr.Admin',
    imagen: 'Lorina.jpg',
    publico: 1
  }
];

// ALTA
/*
curl -X POST http://localhost:3000/creaturas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_creatura": "PlantaNormal",
    "id_tipo1": 1,
    "id_tipo2": 4,
    "descripcion": "Planta.",
    "hp": 10,
    "atk": 10,
    "def": 10,
    "spa": 10,
    "sdef": 10,
    "spe": 10,
    "creador": "MMK",
    "imagen": "https://url.imagen/planta.png",
    "publico": 1
  }'
*/
app.post('/creaturas', (req, res) => {
  const {
    nombre_creatura,
    id_tipo1,
    id_tipo2,
    descripcion,
    hp,
    atk,
    def,
    spa,
    sdef,
    spe,
    creador,
    imagen,
    publico
  } = req.body;

  if (
    !nombre_creatura || !descripcion || !creador || !imagen ||
    typeof id_tipo1 !== 'number' || typeof id_tipo2 !== 'number' ||
    typeof hp !== 'number' || typeof atk !== 'number' || typeof def !== 'number' ||
    typeof spa !== 'number' || typeof sdef !== 'number' || typeof spe !== 'number' ||
    typeof publico !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }

  const newCreatura = {
    id_creatura: creaturas.length > 0 ? Math.max(...creaturas.map(c => c.id_creatura)) + 1 : 1,
    nombre_creatura,
    id_tipo1,
    id_tipo2,
    descripcion,
    hp,
    atk,
    def,
    spa,
    sdef,
    spe,
    creador,
    imagen,
    publico
  };

  creaturas.push(newCreatura);
  res.status(201).json(newCreatura);
});

//MODIFICAR
/*
curl -X PUT http://localhost:3000/creaturas/6 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_creatura": "PlataNormalV2",
    "id_tipo1": 1,
    "id_tipo2": 4,
    "descripcion": "Planta pero Mejor",
    "hp": 20,
    "atk": 20,
    "def": 20,
    "spa": 20,
    "sdef": 20,
    "spe": 20,
    "creador": "MMK",
    "imagen": "https://url.imagen/planta-v2.png",
    "publico": 1
  }'
*/
app.put('/creaturas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = creaturas.findIndex(c => c.id_creatura === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Creatura no encontrada' });
  }

  const {
    nombre_creatura,
    id_tipo1,
    id_tipo2,
    descripcion,
    hp,
    atk,
    def,
    spa,
    sdef,
    spe,
    creador,
    imagen,
    publico
  } = req.body;

  if (
    !nombre_creatura || !descripcion || !creador || !imagen ||
    typeof id_tipo1 !== 'number' || typeof id_tipo2 !== 'number' ||
    typeof hp !== 'number' || typeof atk !== 'number' || typeof def !== 'number' ||
    typeof spa !== 'number' || typeof sdef !== 'number' || typeof spe !== 'number' ||
    typeof publico !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }

  creaturas[index] = {
    id_creatura: id,
    nombre_creatura,
    id_tipo1,
    id_tipo2,
    descripcion,
    hp,
    atk,
    def,
    spa,
    sdef,
    spe,
    creador,
    imagen,
    publico
  };

  res.json(creaturas[index]);
});




//BAJA
/*
curl -X DELETE http://localhost:3000/creaturas/6
*/
app.delete('/creaturas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const originalLength = creaturas.length;
  creaturas = creaturas.filter(c => c.id_creatura !== id);

  if (creaturas.length < originalLength) {
    res.status(204).send();
  } else {
    res.status(404).send('Creatura no encontrada');
  }
});

//LISTAR TODO
/*
curl http://localhost:3000/creaturas
*/
app.get('/creaturas', (req, res) => {
  res.json(creaturas);
});

app.get('/creaturas2', (req, res) => {
  res.json(creaturas);



});



//BUSCAR POR ID
/*
curl http://localhost:3000/creaturas/1
*/
app.get('/creaturas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const creatura = creaturas.find(c => c.id_creatura === id);
  if (creatura) {
    res.json(creatura);
  } else {
    res.status(404).send('Creatura no encontrada');
  }
});

//BUSCAR POR NOMBRE
/*
curl http://localhost:3000/creaturas/nombre/Tsunamind
*/
app.get('/creaturas/nombre/:nombre', (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const resultados = creaturas.filter(c =>
    c.nombre_creatura.toLowerCase().includes(nombre)
  );
  res.json(resultados);
});

//BUSCAR CREATURAS DE UN CREADOR
/*
curl http://localhost:3000/creaturas/creador/MMK
*/
app.get('/creaturas/creador/:creador', (req, res) => {
  const creador = req.params.creador.toLowerCase();
  const resultados = creaturas.filter(c =>
    c.creador.toLowerCase() === creador
  );
  res.json(resultados);
});

///////////////////////////////////////////////////////////////////
// FIN SECCION CREATURA ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// SECCION USUARIOS ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

let usuarios = [
  {
    nickname: "MMK",
    correo: "MMK@example.com",
    foto: "https://i.imgur.com/MMK.jpg",
    biografia: "Aca haciendo la API",
    contraseña: "midnightmayoi",
    tipo: "admin"
  },
  {
    nickname: "Gualberto",
    correo: "gualberto@gmail.com",
    foto: "https://i.imgur.com/gualberto.jpg",
    biografia: "Profesor",
    contraseña: "salon16",
    tipo: "usuario"
  }
];

//ALTA
/*
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nickname": "Ariel",
    "correo": "ariel@gmail.com",
    "foto": "https://i.imgur.com/ariel.jpg",
    "biografia": "Sol.",
    "contraseña": "123",
    "tipo": "usuario"
  }'
*/
app.post('/usuarios', (req, res) => {
  const { nickname, correo, foto, biografia, contraseña, tipo } = req.body;

  if (!nickname || !correo || !contraseña || !tipo) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const yaExiste = usuarios.find(u => u.nickname === nickname);
  if (yaExiste) {
    return res.status(409).json({ error: 'El usuario ya existe' });
  }

  const nuevoUsuario = {
    nickname,
    correo,
    foto: foto || '',            // opcional
    biografia: biografia || '',  // opcional
    contraseña,
    tipo
  };
  
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

//BAJA
/*
curl -X DELETE http://localhost:3000/usuarios/Ariel
*/
app.delete('/usuarios/:nickname', (req, res) => {
  const nickname = req.params.nickname;
  const originalLength = usuarios.length;
  usuarios = usuarios.filter(u => u.nickname !== nickname);

  if (usuarios.length < originalLength) {
    res.status(204).send();
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

//MODIFICACION
/*
curl -X PUT http://localhost:3000/usuarios/MMK \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "MMK@nuevoemail.com",
    "foto": "https://i.imgur.com/MMK-nuevo.jpg",
    "biografia": "Terminando la API...",
    "contraseña": "newdawn",
    "tipo": "admin"
  }'
*/
app.put('/usuarios/:nickname', (req, res) => {
  const nickname = req.params.nickname;
  const index = usuarios.findIndex(u => u.nickname === nickname);

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { correo, foto, biografia, contraseña, tipo } = req.body;

  if (!correo || !foto || !biografia || !contraseña || !tipo) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  usuarios[index] = { nickname, correo, foto, biografia, contraseña, tipo };
  res.json(usuarios[index]);
});

//LISTADO DE USUARIOS
/*
curl http://localhost:3000/usuarios
*/
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

//BUSCAR POR NICKNAME
/*
curl http://localhost:3000/usuarios/MMK
*/
app.get('/usuarios/:nickname', (req, res) => {
  const usuario = usuarios.find(u => u.nickname === req.params.nickname);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

///////////////////////////////////////////////////////////////////
// FIN SECCION CREATURA ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// SECCION TIPOS //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

let tipos = [
  {
    id_tipo: 1,
    nombre_tipo: "Planta",
    color: "1E8449",
    icono: "https://i.imgur.com/planta.png",
    creador: "SYSTEM"
  },
  {
    id_tipo: 2,
    nombre_tipo: "Agua",
    color: "337BFF",
    icono: "https://i.imgur.com/agua.png",
    creador: "SYSTEM"
  },
  {
    id_tipo: 3,
    nombre_tipo: "Fuego",
    color: "CB4335",
    icono: "https://i.imgur.com/fuego.png",
    creador: "SYSTEM"
  },
  {
    id_tipo: 4,
    nombre_tipo: "Normal",
    color: "337BFF",
    icono: "https://i.imgur.com/normal.png",
    creador: "SYSTEM"
  },
  {
    id_tipo: 5,
    nombre_tipo: "Volador",
    color: "BDC3C7",
    icono: "https://i.imgur.com/volador.png",
    creador: "SYSTEM"
  },
  {
    id_tipo: 15,
    nombre_tipo: "Psiquico",
    color: "DE35E6",
    icono: "https://i.imgur.com/psiquico.png",
    creador: "SYSTEM"
  },
  {
    id_tipo: 13,
    nombre_tipo: "Fantasma",
    color: "604E81",
    icono: "https://i.imgur.com/fantasma.png",
    creador: "SYSTEM"
  },
  {
    id_tipo: 19,
    nombre_tipo: "Gualberto",
    color: "797480",
    icono: "https://i.imgur.com/gualberto.png",
    creador: "Gualberto"
  },
  {
    id_tipo: 20,
    nombre_tipo: "Sinistro",
    color: "535353",
    icono: "https://i.imgur.com/sinestro.png",
    creador: "Mr.Dr.Admin"
  }
];
let creaturasConTipos = creaturas.map(creatura => {
  let tipo1 = tipos.find(tipo => tipo.id_tipo === creatura.id_tipo1);
  let tipo2 = tipos.find(tipo => tipo.id_tipo === creatura.id_tipo2);

  return {
    ...creatura,
    tipo1: tipo1 || null,
    tipo2: tipo2 || null
  };
});

function setearCreaConTipos(){
  creaturasConTipos = creaturas.map(creatura => {
    const tipo1 = tipos.find(tipo => tipo.id_tipo === creatura.id_tipo1);
    const tipo2 = tipos.find(tipo => tipo.id_tipo === creatura.id_tipo2);
  
    return {
      ...creatura,
      tipo1: tipo1 || null,
      tipo2: tipo2 || null
    };
  });
}





//ALTA
/*
curl -X POST http://localhost:3000/tipos \
  -H "Content-Type: application/json" \
  -d '{
    "id_tipo": 20,
    "nombre_tipo": "Hex",
    "color": "111111",
    "icono": "https://i.imgur.com/sombra.png",
    "creador": "MMK"
  }'
*/
app.post('/tipos', (req, res) => {
  const { id_tipo, nombre_tipo, color, icono, creador } = req.body;

  if (!id_tipo || !nombre_tipo || !color || !icono || !creador) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const existe = tipos.find(t => t.id_tipo === id_tipo);
  if (existe) {
    return res.status(409).json({ error: 'ID de tipo ya existe' });
  }

  const nuevoTipo = { id_tipo, nombre_tipo, color, icono, creador };
  tipos.push(nuevoTipo);
  res.status(201).json(nuevoTipo);
});

//BAJA
/*
curl -X DELETE http://localhost:3000/tipos/20
*/
app.delete('/tipos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const originalLength = tipos.length;
  tipos = tipos.filter(t => t.id_tipo !== id);

  if (tipos.length < originalLength) {
    res.status(204).send();
  } else {
    res.status(404).send('Tipo no encontrado');
  }
});

//MODIFICACION
/*
curl -X PUT http://localhost:3000/tipos/2 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_tipo": "Agua Pura",
    "color": "85C1E9",
    "icono": "https://i.imgur.com/aguapura.png",
    "creador": "MMK"
  }'
*/
app.put('/tipos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tipos.findIndex(t => t.id_tipo === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tipo no encontrado' });
  }

  const { nombre_tipo, color, icono, creador } = req.body;

  if (!nombre_tipo || !color || !icono || !creador) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  tipos[index] = { id_tipo: id, nombre_tipo, color, icono, creador };
  res.json(tipos[index]);
});

//LISTADO DE TIPOS
/*
curl http://localhost:3000/tipos
*/
app.get('/tipos', (req, res) => {
  res.json(tipos);
});
app.get('/tipos/creaturas', (req, res) => {
  setearCreaConTipos();
  res.json(creaturasConTipos);
});

//BUSCAR TIPOS POR CREADOR
/*
curl http://localhost:3000/tipos/creador/MMK
*/
app.get('/tipos/creador/:creador', (req, res) => {
  const creador = req.params.creador.toLowerCase();
  const resultados = tipos.filter(t => t.creador.toLowerCase() === creador);
  res.json(resultados);
});

app.get('/tipos/:id', (req, res) => {
  res.json(resultados);

});

function getTipoPorId(id){
  const resultados = tipos.filter(t => t.id_tipo === id);
  return resultados;
}




///////////////////////////////////////////////////////////////////
// FIN SECCION TIPOS //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// SECCION HABILIDADES ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

let habilidades = [
  {
    id_habilidad: 1,
    nombre_habilidad: "Llama Infernal",
    id_tipo_habilidad: 3,
    descripcion: "Una llamarada poderosa que puede quemar tanto al rival como al usuario.",
    categoria_habilidad: "Especial",
    potencia: 120,
    creador: "MMK"
  },
  {
    id_habilidad: 2,
    nombre_habilidad: "Maremoto",
    id_tipo_habilidad: 2,
    descripcion: "Terremoto de Agua, daña a toda otra creatura en el campo.",
    categoria_habilidad: "Fisico",
    potencia: 100,
    creador: "MMK"
  },
  {
    id_habilidad: 3,
    nombre_habilidad: "Florecer",
    id_tipo_habilidad: 1,
    descripcion: "Incrementa la velocidad, el ataque y el ataque especial de la creatura.",
    categoria_habilidad: "Estado",
    potencia: 0,
    creador: "SYSTEM"
  }
];

//ALTA
/*
curl -X POST http://localhost:3000/habilidades \
  -H "Content-Type: application/json" \
  -d '{
    "id_habilidad": 4,
    "nombre_habilidad": "Nicomove",
    "id_tipo_habilidad": 13,
    "descripcion": "El usuario desaparece, causando daño psicologico.",
    "categoria_habilidad": "Especial",
    "potencia": 20,
    "creador": "MMK"
  }'
*/
app.post('/habilidades', (req, res) => {
  const {
    id_habilidad,
    nombre_habilidad,
    id_tipo_habilidad,
    descripcion,
    categoria_habilidad,
    potencia,
    creador
  } = req.body;

  if (
    !id_habilidad || !nombre_habilidad || !id_tipo_habilidad ||
    !descripcion || !categoria_habilidad || typeof potencia !== 'number' || !creador
  ) {
    return res.status(400).json({ error: 'Datos incompletos o inválidos' });
  }

  const existe = habilidades.find(h => h.id_habilidad === id_habilidad);
  if (existe) {
    return res.status(409).json({ error: 'ID de habilidad ya existe' });
  }

  const nueva = {
    id_habilidad,
    nombre_habilidad,
    id_tipo_habilidad,
    descripcion,
    categoria_habilidad,
    potencia,
    creador
  };

  habilidades.push(nueva);
  res.status(201).json(nueva);
});

//BAJA
/*
curl -X DELETE http://localhost:3000/habilidades/4
*/
app.delete('/habilidades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const originalLength = habilidades.length;
  habilidades = habilidades.filter(h => h.id_habilidad !== id);

  if (habilidades.length < originalLength) {
    res.status(204).send();
  } else {
    res.status(404).send('Habilidad no encontrada');
  }
});

//MODIFICACION
/*
curl -X PUT http://localhost:3000/habilidades/4 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_habilidad": "Nicomove",
    "id_tipo_habilidad": 13,
    "descripcion": "El usuario desaparece, causando daño psicologico.",
    "categoria_habilidad": "Especial",
    "potencia": 13,
    "creador": "MMK"
  }'
*/
app.put('/habilidades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = habilidades.findIndex(h => h.id_habilidad === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Habilidad no encontrada' });
  }

  const {
    nombre_habilidad,
    id_tipo_habilidad,
    descripcion,
    categoria_habilidad,
    potencia,
    creador
  } = req.body;

  if (
    !nombre_habilidad || !id_tipo_habilidad || !descripcion ||
    !categoria_habilidad || typeof potencia !== 'number' || !creador
  ) {
    return res.status(400).json({ error: 'Datos incompletos o inválidos' });
  }

  habilidades[index] = {
    id_habilidad: id,
    nombre_habilidad,
    id_tipo_habilidad,
    descripcion,
    categoria_habilidad,
    potencia,
    creador
  };

  res.json(habilidades[index]);
});

//LISTADO DE HABILIDADES
/*
curl http://localhost:3000/habilidades
*/
app.get('/habilidades', (req, res) => {
  res.json(habilidades);
});

//BUSCAR HABILIDADES DE UN CREADOR
/*
curl http://localhost:3000/habilidades/creador/MMK
*/
app.get('/habilidades/creador/:creador', (req, res) => {
  const creador = req.params.creador.toLowerCase();
  const resultados = habilidades.filter(h => h.creador.toLowerCase() === creador);
  res.json(resultados);
});

//BUSCAR HABILIDADES POR TIPO
/*
curl http://localhost:3000/habilidades/tipo/1
*/
app.get('/habilidades/tipo/:id_tipo_habilidad', (req, res) => {
  const id = parseInt(req.params.id_tipo_habilidad);
  const resultados = habilidades.filter(h => h.id_tipo_habilidad === id);
  res.json(resultados);
});

///////////////////////////////////////////////////////////////////
// FIN SECCION TIPOS //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// SECCION MOVESET ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

let movesets = [
  { id_moveset: 1, id_creatura: 1, id_habilidad: 2 },
  { id_moveset: 2, id_creatura: 2, id_habilidad: 1 },
  { id_moveset: 3, id_creatura: 2, id_habilidad: 3 }
];

//ALTA
/*
curl -X POST http://localhost:3000/movesets \
  -H "Content-Type: application/json" \
  -d '{
    "id_moveset": 4,
    "id_creatura": 3,
    "id_habilidad": 1
  }'
*/
app.post('/movesets', (req, res) => {
  const { id_moveset, id_creatura, id_habilidad } = req.body;

  if (
    typeof id_moveset !== 'number' ||
    typeof id_creatura !== 'number' ||
    typeof id_habilidad !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }

  const existe = movesets.find(m => m.id_moveset === id_moveset);
  if (existe) {
    return res.status(409).json({ error: 'ID de moveset ya existe' });
  }

  const nuevoMoveset = { id_moveset, id_creatura, id_habilidad };
  movesets.push(nuevoMoveset);
  res.status(201).json(nuevoMoveset);
});

//BAJA
/*
curl -X DELETE http://localhost:3000/movesets/4
*/
app.delete('/movesets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const originalLength = movesets.length;
  movesets = movesets.filter(m => m.id_moveset !== id);

  if (movesets.length < originalLength) {
    res.status(204).send();
  } else {
    res.status(404).send('Moveset no encontrado');
  }
});

//MODIFICACION
/*
curl -X PUT http://localhost:3000/movesets/4 \
  -H "Content-Type: application/json" \
  -d '{
    "id_creatura": 3,
    "id_habilidad": 2
  }'
*/
app.put('/movesets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = movesets.findIndex(m => m.id_moveset === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Moveset no encontrado' });
  }

  const { id_creatura, id_habilidad } = req.body;

  if (typeof id_creatura !== 'number' || typeof id_habilidad !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }

  movesets[index] = { id_moveset: id, id_creatura, id_habilidad };
  res.json(movesets[index]);
});

//BUSCAR MOVESETS DE UNA CREATURA
/*
curl http://localhost:3000/movesets/creatura/2
*/
app.get('/movesets/creatura/:id_creatura', (req, res) => {
  const id = parseInt(req.params.id_creatura);
  const resultado = movesets.filter(m => m.id_creatura === id);
  res.json(resultado);
});

///////////////////////////////////////////////////////////////////
// FIN SECCION MOVESET ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// SECCION MOVESET ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

let ratings = [
  { id_rating: 1, nickname_usuario: "MMK", id_creatura: 4, estrellas: 1.5 },
  { id_rating: 2, nickname_usuario: "Gualberto", id_creatura: 4, estrellas: 4.0 },
  { id_rating: 3, nickname_usuario: "MMK", id_creatura: 1, estrellas: 5.0 }
];

//ALTA
/*
curl -X POST http://localhost:3000/ratings \
  -H "Content-Type: application/json" \
  -d '{
    "id_rating": 4,
    "nickname_usuario": "Gualberto",
    "id_creatura": 5,
    "estrellas": 5.0
  }'
*/
app.post('/ratings', (req, res) => {
  const { id_rating, nickname_usuario, id_creatura, estrellas } = req.body;

  if (
    typeof id_rating !== 'number' ||
    typeof nickname_usuario !== 'string' ||
    typeof id_creatura !== 'number' ||
    typeof estrellas !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }

  if (ratings.find(r => r.id_rating === id_rating)) {
    return res.status(409).json({ error: 'El ID de rating ya existe' });
  }

  const nuevo = { id_rating, nickname_usuario, id_creatura, estrellas };
  ratings.push(nuevo);
  res.status(201).json(nuevo);
});

//BAJA
/*
curl -X DELETE http://localhost:3000/ratings/4
*/
app.delete('/ratings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const original = ratings.length;
  ratings = ratings.filter(r => r.id_rating !== id);
  if (ratings.length < original) {
    res.status(204).send();
  } else {
    res.status(404).send('Rating no encontrado');
  }
});

//MODIFICACION
/*
curl -X PUT http://localhost:3000/ratings/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nickname_usuario": "MMK",
    "id_creatura": 1,
    "estrellas": 1.0
  }'
*/
app.put('/ratings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = ratings.findIndex(r => r.id_rating === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Rating no encontrado' });
  }

  const { nickname_usuario, id_creatura, estrellas } = req.body;

  if (
    typeof nickname_usuario !== 'string' ||
    typeof id_creatura !== 'number' ||
    typeof estrellas !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }

  ratings[index] = { id_rating: id, nickname_usuario, id_creatura, estrellas };
  res.json(ratings[index]);
});

//LISTADO DE RATINGS DE UNA CREATURA
/*
curl http://localhost:3000/ratings/creatura/4
*/
app.get('/ratings/creatura/:id_creatura', (req, res) => {
  const id = parseInt(req.params.id_creatura);
  const resultados = ratings.filter(r => r.id_creatura === id);
  res.json(resultados);
});

//PROMEDIO DE RATINGS DE UNA CREATURA
/*
curl http://localhost:3000/ratings/creatura/4/promedio
*/
app.get('/ratings/creatura/:id_creatura/promedio', (req, res) => {
  const id = parseInt(req.params.id_creatura);
  const ratingsDeCreatura = ratings.filter(r => r.id_creatura === id);

  if (ratingsDeCreatura.length === 0) {
    return res.status(404).json({ mensaje: 'No hay ratings para esta creatura' });
  }

  const promedio = (
    ratingsDeCreatura.reduce((sum, r) => sum + r.estrellas, 0) / ratingsDeCreatura.length
  ).toFixed(2);

  res.json({ id_creatura: id, promedio: parseFloat(promedio) });
});

///////////////////////////////////////////////////////////////////
// FIN SECCION MOVESET ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// SECCION EFECTIVIDADES //////////////////////////////////////////
///////////////////////////////////////////////////////////////////

let efectividades = [
  { id_efectividad: 1, atacante: "1", defensor: "3", multiplicador: 0.5 },
  { id_efectividad: 2, atacante: "1", defensor: "2", multiplicador: 2 },
  { id_efectividad: 3, atacante: "3", defensor: "1", multiplicador: 2 },
  { id_efectividad: 4, atacante: "2", defensor: "2", multiplicador: 0.5 },
  { id_efectividad: 5, atacante: "2", defensor: "1", multiplicador: 0.5 }
];

//ALTA
/*
curl -X POST http://localhost:3000/efectividades \
  -H "Content-Type: application/json" \
  -d '{
    "id_efectividad": 6,
    "atacante": 3,
    "defensor": 2,
    "multiplicador": 0.5
  }'
*/
app.post('/efectividades', (req, res) => {
  const { id_efectividad, atacante, defensor, multiplicador } = req.body;

  if (
    typeof id_efectividad !== 'number' ||
    typeof atacante !== 'number' ||
    typeof defensor !== 'number' ||
    typeof multiplicador !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }

  if (efectividades.find(e => e.id_efectividad === id_efectividad)) {
    return res.status(409).json({ error: 'ID ya existente' });
  }

  const nueva = { id_efectividad, atacante, defensor, multiplicador };
  efectividades.push(nueva);
  res.status(201).json(nueva);
});

//BAJA
/*
curl -X DELETE http://localhost:3000/efectividades/6
*/
app.delete('/efectividades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const originalLength = efectividades.length;
  efectividades = efectividades.filter(e => e.id_efectividad !== id);

  if (efectividades.length < originalLength) {
    res.status(204).send();
  } else {
    res.status(404).send('Efectividad no encontrada');
  }
});

//MODIFICACION
/*
curl -X PUT http://localhost:3000/efectividades/4 \
  -H "Content-Type: application/json" \
  -d '{
    "atacante": 2,
    "defensor": 2,
    "multiplicador": 1
  }'
*/
app.put('/efectividades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = efectividades.findIndex(e => e.id_efectividad === id);

  if (index === -1) {
    return res.status(404).json({ error: 'No existe la efectividad' });
  }

  const { atacante, defensor, multiplicador } = req.body;

  if (
    typeof atacante !== 'number' ||
    typeof defensor !== 'number' ||
    typeof multiplicador !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos o incompletos' });
  }

  efectividades[index] = { id_efectividad: id, atacante, defensor, multiplicador };
  res.json(efectividades[index]);
});

//LISTADO DE TYPE MATCHUPS NEUTROS
/*
curl http://localhost:3000/efectividades/2/neutros
*/
app.get('/efectividades/:id_tipo/neutros', (req, res) => {
  const tipo = parseInt(req.params.id_tipo);
  const resultado = efectividades.filter(e => e.defensor === tipo && e.multiplicador === 1);
  res.json(resultado);
});

//LISTADO DE TYPE MATCHUPS DEBILES
/*
curl http://localhost:3000/efectividades/2/debiles
*/
app.get('/efectividades/:id_tipo/debiles', (req, res) => {
  const tipo = parseInt(req.params.id_tipo);
  const resultado = efectividades.filter(e => e.defensor === tipo && e.multiplicador === 2);
  res.json(resultado);
});

//LISTADO DE TYPE MATCHUPS DEBILES
/*
curl http://localhost:3000/efectividades/2/resistentes
*/
app.get('/efectividades/:id_tipo/resistentes', (req, res) => {
  const tipo = parseInt(req.params.id_tipo);
  const resultado = efectividades.filter(e => e.defensor === tipo && e.multiplicador === 0.5);
  res.json(resultado);
});

//LISTADO DE TYPE MATCHUPS INMUNES
/*
curl http://localhost:3000/efectividades/2/inmunes
*/
app.get('/efectividades/:id_tipo/inmunes', (req, res) => {
  const tipo = parseInt(req.params.id_tipo);
  const resultado = efectividades.filter(e => e.defensor === tipo && e.multiplicador === 0);
  res.json(resultado);
});

///////////////////////////////////////////////////////////////////
// FIN SECCION EFECTIVIDADES //////////////////////////////////////
///////////////////////////////////////////////////////////////////