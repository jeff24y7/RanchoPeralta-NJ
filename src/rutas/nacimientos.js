const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//VER TODAS LOS NACIMIENTOS
router.get('/nacimientos', (req,res)=>{
    mysqlConnection.query('SELECT * FROM MG_NACIMIENTO', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


//REGISTRAR UN NUEVO NACIMIENTO
router.post('/registrar-nacimiento', (req,res)=>{
    const {NUM_ARETE,
        NOM_GANADO,
        CLR_GANADO,
        COD_ESTADO,
        COD_LUGAR,
        PES_ACTUAL,
        FIE_GANADO,
         RAZ_GANADO,
        SEX_GANADO,
        COD_VACA_PRENADA,
    FEC_NACIMIENTO} = req.body;
    const query=`CALL INS_NACIMIENTO(?,?,?,?,?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [NUM_ARETE,
        NOM_GANADO,
        CLR_GANADO,
        COD_ESTADO,
        COD_LUGAR,
        PES_ACTUAL,
        FIE_GANADO,
         RAZ_GANADO,
        SEX_GANADO,
        COD_VACA_PRENADA,
        FEC_NACIMIENTO], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Nacimiento Registrado'});
            }else{
                console.log(err);
            }
        });
});

module.exports = router;