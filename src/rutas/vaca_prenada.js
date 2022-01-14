const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');
//VER TODAS LAS VACAS PREÑADAS
router.get('/vaca_prenada', (req,res)=>{
    mysqlConnection.query('SELECT * FROM MG_VACA_PRENADA', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//REGISTRAR UNA VACA PREÑADA
router.post('/registrar-vaca-prenada', (req,res)=>{
    const {COD_TRANS_EMBRION,
        COD_TRANS_ESPERMA,
        COD_MONTA,
        FEC_PARIR,
        OBS_VACAP,
        IND_PRENADA} = req.body;
    const query=`CALL INS_VACA_PRENADA(?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_TRANS_EMBRION,
        COD_TRANS_ESPERMA,
        COD_MONTA,
        FEC_PARIR,
        OBS_VACAP,
        IND_PRENADA], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Vaca preñada registrada'});
            }else{
                console.log(err);
            }
        });
});

//ACTUALIZAR UNA VACA PREÑADA
router.put('/actualizar-vaca-prenada', (req,res)=>{
    const {COD_VACA_PRENADA,
        IND_PRENADA} = req.body;
    const query=`CALL UPD_VACA_PRENADA(?,?);
    `;
    mysqlConnection.query(query, [COD_VACA_PRENADA,
        IND_PRENADA], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Vaca preñada actualizada'});
            }else{
                console.log(err);
            }
        });
});






module.exports = router;