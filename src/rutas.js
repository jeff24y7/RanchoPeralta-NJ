const express = require('express');
const app = express();

app.use(require('./rutas/medicamento'));
app.use(require('./rutas/compra_medicamentos'));
/*app.use(require('./rutas/produccion'));*/
app.use(require('./rutas/personas'));
app.use(require('./rutas/compras'));
/*app.use(require('./rutas/detalle_ventas'));*/
app.use(require('./rutas/reportes'));
app.use(require('./rutas/ganado'));
app.use(require('./rutas/embrion'));
app.use(require('./rutas/vaca_prenada'));
app.use(require('./rutas/nacimientos'));
app.use(require('./rutas/esperma'));
app.use(require('./rutas/orden_trabajo'));


module.exports = app;