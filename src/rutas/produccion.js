const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


// PRODUCCION VISTA DE LECHE
router.get('/produccion', (req,res)=>{
  mysqlConnection.query('SELECT * FROM PRODUCCION', (err,rows,fields)=>{
      if(!err){
          res.json(rows);
      }else{
          console.log(err);
      }
  });
});

// INSERT PRODUCCION DE LECHE
router.post('/insertarleche', (req, res) => {
  const {
    COD_REGISTRO_GANADO,
    FEC_ORDEÑO,
    DIA_LACTANCIA,
    PRD_LITROS ,
    OBS_REGISTRO,} = req.body;
  const query = `call INS_PRODUCCION_LECHE(?,?,?,?,?);
  `;
  mysqlConnection.query(query, [COD_REGISTRO_GANADO,FEC_ORDEÑO,DIA_LACTANCIA,PRD_LITROS ,OBS_REGISTRO], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Registro guardado'});
    } else {
      console.log(err);
    }
  });
});

// GET An PRODUCCION
router.get('/:COD_REGISTRO_LECHE', (req, res) => {
  const { COD_REGISTRO_LECHE } = req.params; 
  mysqlConnection.query('SELECT * FROM PR_PRODUCCION_LECHE WHERE COD_REGISTRO_LECHE = ?', [COD_REGISTRO_LECHE], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});
// ACTUALIZAR PRODUCCION DE LECHE
router.put('/actualizar-produccion-leche', (req, res) => {
  const {
    COD_REGISTRO_LECHE,
    COD_REGISTRO_GANADO,
    FEC_ORDEÑO,
    DIA_LACTANCIA,
    PRD_LITROS ,
    OBS_REGISTRO} = req.body;
 
  const query =`
  call UPDATE_PRODUCCION_LECHE(?,?,?,?,?,?)`;
  mysqlConnection.query(query, [COD_REGISTRO_LECHE,
    COD_REGISTRO_GANADO,
    FEC_ORDEÑO,
    DIA_LACTANCIA,
    PRD_LITROS ,
    OBS_REGISTRO], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Registro actualizado'});
    } else {
      console.log(err);
    }
  });
});


// DELETE EN PRODUCCION DE LECHE 
router.delete('/:COD_REGISTRO_LECHE', (req, res) => {
  const { COD_REGISTRO_LECHE } = req.params;
  mysqlConnection.query('DELETE FROM PR_PRODUCCION_LECHE WHERE COD_REGISTRO_LECHE = ?', [COD_REGISTRO_LECHE], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Registro eliminado'});
    } else {
      console.log(err);
    }
  });
});


module.exports = router;
