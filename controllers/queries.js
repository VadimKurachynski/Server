
const pool=require('../config/dbPg');

// const getQuestion = (req, res) => {
//     const id = parseInt(req.params.id)
//     pool.query('SELECT * FROM tema111 WHERE nomvoprosa = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         res.status(200).json(results.rows)
//     })
// }

const getQuestion = (req, res) => {
   // const id = parseInt(req.params.id)
   //  console.log(req.query.t)
   //  console.log(req.query.nv)
    let tema =req.query.t;
    const nv =req.query.nv;

    pool.query(`SELECT * FROM ${tema} WHERE nomvoprosa = $1`, [nv], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const postQuestion = (req, res) => {
    const {tema, nv} = req.body
    console.log(req.body);
    console.log(tema,nv);
    // res.status(200).json(req.body)
    pool.query(`SELECT * FROM ${tema} WHERE nomvoprosa = $1`, [nv], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })

}

const postAmountCount = (req, res) => {
    const {tema} = req.body
    pool.query(`SELECT count(*) FROM ${tema}`, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }
//
// const getUserById = (request, response) => {
//     const id = parseInt(request.params.id)
//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }
//
// const createUser = (request, response) => {
//     const {name, email} = request.body
//     pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send('User added with ID: ${results.insertId}`)
//     })
// }
//
// const updateUser = (request, response) => {
//     const id = parseInt(request.params.id)
//     const {name, email} = request.body
//
//     pool.query(
//         'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//         [name, email, id],
//         (error, results) => {
//             if (error) {
//                 throw error
//             }
//             response.status(200).send(`User modified with ID: ${id}`)
//         }
//     )
// }
//
// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
//
//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(`User deleted with ID: ${id}`)
//     })
// }

module.exports = {
    // getUsers,
    // getUserById,
    // createUser,
    // updateUser,
    // deleteUser,
    getQuestion,
    postQuestion,
    postAmountCount,
}
