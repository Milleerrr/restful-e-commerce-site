import { query } from '../db/index';

const getUsers = async () => {
    const res = await query('SELECT * FROM users');
    return res.rows;
};
