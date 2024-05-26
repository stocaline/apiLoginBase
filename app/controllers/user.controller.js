const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
require('dotenv').config();
const secretKey = process.env.SECRETKEY;

exports.getUsers = (req, res) => {

    const sql = "SELECT id, username, created_at FROM user";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send("Erro de servidor");
        }

        if (result.length === 0) {
            return res.status(404).send("Nenhum Usuário foi encontrado!")
        }

        res.status(200).send(result)
    })
}

exports.signup = (req, res) => {
    const { username, password } = req.body;

    const checkUserSQL = "SELECT * FROM user WHERE username = ?";
    db.query(checkUserSQL, [username], (err, result) => {
        if (err) {
            return res.status(500).send("Erro ao checar se o usuário já existe.");
        }

        if (result.length > 0) {
            return res.status(400).send("Usuário já existe")
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const sql = "INSERT INTO user (username, password) VALUES (?,?)";
        db.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).send("Erro ao registrar usuário");
            }
            res.status(201).send("Usuário cadastrado!");
        })
    })
}

exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM user WHERE username = ?";
    db.query(sql, [username], (err, result) => {
        if (err) {
            return res.status(500).send("Erro de servidor");
        }

        if (result.length === 0) {
            return res.status(404).send("Usuário não foi encontrado!")
        }

        const user = result[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if(!passwordIsValid){
            return res.status(401).send({auth: false, token: null});
        }

        const token = jwt.sign({id: user.id}, secretKey, { expiresIn:  "24h"})

        res.status(200).send({auth: true, token: token})
    })
}
