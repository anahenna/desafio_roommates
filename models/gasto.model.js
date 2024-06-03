import {pool} from '../database/connection.js'

const findAll = async () => {
    const query = 'SELECT * FROM gastos';
    const { rows } = await pool.query(query);
    return rows;
};

const create = async (newGasto) => {
    const query = {
        text: `
        INSERT INTO gastos (gasto_id, roommate_id, roommate_nombre, gasto_name, monto)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING*`,
        values: [
            newGasto.gasto_id,
            newGasto.roommate_id,
            newGasto.roommate_nombre,
            newGasto.gasto_name,
            newGasto.monto
        ]
    };

    const { rows } = await pool.query(query);
    return rows[0];
};


const remove = async (id) => {
    const query = {
        text: `
        DELETE FROM gastos 
        WHERE gasto_id = $1
        RETURNING*`,
        values: [id ]
    }
    const {rows} = await pool.query(query)
    return rows[0]
}

const update = async(gasto) => {
    const query = {
        text: `
        UPDATE gastos
        SET 
        roommate_nombre = $1,
        gasto_name = $2,
        monto = $3
        WHERE gasto_id = $4
        RETURNING*`,
        values: [gasto.roommate_nombre, gasto.gasto_name, gasto.monto, gasto.gasto_id ]
    }
    const {rows} = await pool.query(query)
    return rows[0]
}



export const gastoModel = {
    findAll,
    create,
    remove,
    update
};