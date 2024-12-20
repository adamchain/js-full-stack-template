const Pool = require('pg').Pool
const bcrypt = require('bcrypt');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'practice',
    password: 'Wallet10..',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = async (request, response) => {
    const { namefirst, namelast, email, password } = request.body;

    try {
        // Hash pw
        const hashedPassword = await bcrypt.hash(password, 10);

        // add user to db
        await pool.query(
            'INSERT INTO users ("namefirst", "namelast", email, password) VALUES ($1, $2, $3, $4)',
            [namefirst, namelast, email, hashedPassword]
        );

        response.status(201).send('User added successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE users SET namefirst = $1,, namelast = $2, email = $3 WHERE id = $4',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    pool,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}