const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Para servir HTML, JS, CSS

// Endpoint para guardar productos
app.post('/guardar', (req, res) => {
  const productos = req.body.productos;
  if(!productos) return res.status(400).send({error:'No hay productos'});
  
  fs.writeFile('productos.json', JSON.stringify({productos}, null, 2), err => {
    if(err) return res.status(500).send({error:'Error al guardar'});
    res.send({ok:true, mensaje:'Productos guardados correctamente'});
  });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
