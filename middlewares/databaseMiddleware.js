const { createPool } = require('mysql2/promise');

const pool = createPool({
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE,
        port: process.env.DB_PORT || 3306,
        connectionLimit: process.env.LIMIT || 10
});

const registConnection = async (req,res,next)=>{
    try {
        res.locals.conn = await pool.getConnection(async conn => conn);
        next();
    }
    catch(err) {
        console.log(err);
        next(err);
    }
}

module.exports = registConnection