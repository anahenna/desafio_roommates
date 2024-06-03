import {handleErrorsDatabase} from "../database/errors.database.js"
import { v4 as uuidv4 } from 'uuid'
import {getRandomUser} from '../utils/random.user.js'
import {roommateModel} from '../models/roommate.model.js'


const getRoommates = async(req, res) => {
    try{
        const roommates = await roommateModel.findAll()
        return res.json(roommates)
    }catch(error){
        const {code, msg} = handleErrorsDatabase(error)
        return res.status(code).json({ok: false, msg })
    }
}

const addRoommate = async (req, res) => {
    try {
        const randomUser = await getRandomUser();
        const newRoommate = {
            id: uuidv4(),
            name: randomUser.name.first
        };
        const createdRoommate = await roommateModel.create(newRoommate);
        return res.status(201).json(createdRoommate);
    } catch (error) {
        const { code, msg } = handleErrorsDatabase(error);
        return res.status(code).json({ ok: false, msg });
    }
};



export const roommateController = {
    getRoommates,
    addRoommate
}