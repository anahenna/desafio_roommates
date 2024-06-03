
import {pool} from '../database/connection.js'

const findAll = async () => {
    const query = 'SELECT * FROM roommates'
    const {rows} = await pool.query(query)
    return rows
}

const create = async (newRoommate) => {
    const query = {
        text: `
        INSERT INTO roommates
        (id, nombre)
        VALUES($1, $2)
        RETURNING *
        `,
        values: [newRoommate.id, newRoommate.name]
    };
    const { rows } = await pool.query(query);
    return rows[0];
};



export const roommateModel = {
    findAll,
    create
}