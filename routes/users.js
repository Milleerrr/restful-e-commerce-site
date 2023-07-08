const db = require('../db');

const getUsers = (request, response) => {
    db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    console.log(`Id is set to: ${id}`);

    db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('2');
            throw error;
        }
        response.status(200).json(results.rows);
        console.log('3');
    });

    console.log('End of request');
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

module.exports = {
    getUsers,
    getUserById,
    createUser,
};