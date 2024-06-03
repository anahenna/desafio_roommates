import { handleErrorsDatabase } from "../database/errors.database.js";
import { v4 as uuidv4 } from 'uuid';
import { gastoModel } from '../models/gasto.model.js';

const getGastos = async (req, res) => {
    try {
        const gastos = await gastoModel.findAll();
        return res.json(gastos);
    } catch (error) {
        const { code, msg } = handleErrorsDatabase(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const addGasto = async (req, res) => {
    try {
        const { roommate_id, roommate_nombre, gasto_name, monto } = req.body;
        const newGasto = {
            gasto_id: uuidv4(),
            roommate_id,
            roommate_nombre,
            gasto_name,
            monto
        };
        const createdGasto = await gastoModel.create(newGasto);
        return res.status(201).json(createdGasto);
    } catch (error) {
        const { code, msg } = handleErrorsDatabase(error);
        return res.status(code).json({ ok: false, msg }); 
    }
};


const removeGasto =  async(req, res) => {
    try{
        const {id} = req.params
        const book = await gastoModel.remove(id)
        return res.json(book)
    }catch(error){
        const {code, msg} = handleErrorsDatabase(error)
        return res.status(code).json({ok: false, msg })
    }
}

const updateGasto =  async(req, res) => {
    try{
        const {gasto_id} = req.params
        const {roommate_nombre, gasto_name, monto} = req.body
        const gasto ={
            gasto_id, roommate_nombre, gasto_name, monto
        }
        const updateGasto = await gastoModel.update(gasto)
        return res.json(gasto)
    }catch(error){
        const {code, msg} = handleErrorsDatabase(error)
        return res.status(code).json({ok: false, msg })
    }
}


export const gastoController = {
    getGastos,
    addGasto,
    removeGasto,
    updateGasto
};
