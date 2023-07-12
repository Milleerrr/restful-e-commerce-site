const db = require('../db');

const getCartById = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const results = await db.query('SELECT * FROM carts WHERE id = $1', [id]);
        return response.status(200).json(results.rows);
    } catch (error) {
        return response.status(500).json({ error: 'Database query error.' });
    }
};

const createCart = (request, response) => {
    const { id, user_id } = request.body

    db.query('INSERT INTO users (id, user_id) VALUES ($1, $2) RETURNING *',
        [id, user_id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Cart created with ID: ${results.rows[0].id}`)
        })
};

const createCartById = (request, response) => {
    const { id, user_id } = request.body

    db.query('INSERT INTO users (id, user_id) VALUES ($1, $2) WHERE id = $1',
        [id, user_id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Cart created with ID: ${results.rows[0].id}`)
        })
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { username, email, password_hash, first_name, last_name, address } = request.body

    db.query('UPDATE users SET username = $1, email = $2, password_hash = $3, first_name = $4, last_name = $5, address = $6) WHERE id = $7',
        [username, email, password_hash, first_name, last_name, address, id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        })
};

module.exports = {
    getCartById,
    createCart,
    createCartById
};