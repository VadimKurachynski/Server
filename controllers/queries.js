const pool=require('../config/dbPg');

const getQuestionAllName = (req, res) => {
    let tema='themesAllName';
    pool.query(`SELECT * FROM ${tema}`, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getQuestionAll = (req, res) => {
    console.log(req.query.numberTheme)
    let theme=`theme${req.query.numberTheme}`;
    pool.query(`SELECT * FROM ${theme}`, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}



module.exports = {
    getQuestionAll,
    getQuestionAllName,
}
