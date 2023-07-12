const db = require('../db');

const getUsers = (request, response) => {
    db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getUserById = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const results = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return response.status(200).json(results.rows);
    } catch (error) {
        return response.status(500).json({ error: 'Database query error.' });
    }
};

const createUser = (request, response) => {
    const { username, email, password_hash, first_name, last_name, address } = request.body

    db.query('INSERT INTO users (username, email, password_hash, first_name, last_name, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [username, email, password_hash, first_name, last_name, address], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`)
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

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('DELETE FROM users WEHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Success. User deleted with id: ${id}`);
    })
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};