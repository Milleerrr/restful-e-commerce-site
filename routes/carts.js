const db = require('../db');

const getCartById = (request, response) => {
    const id = parseInt(request.params.id);

    let timeoutHandler = setTimeout(() => {
        console.log('Query taking too long, timeout');
        response.status(500).json({ error: 'Query taking too long, timeout.' });
    }, 5000); // adjust timeout as needed

    db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        clearTimeout(timeoutHandler); // remove the timeout handler
        if (error) {
            response.status(500).json({ error: 'Database query error.' });
            throw error;
        }
        response.status(200).json(results.rows);
    });
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