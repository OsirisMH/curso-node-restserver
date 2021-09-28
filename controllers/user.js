const { response, request } = require('express');

const User = require('../models/User');


const getUser = (req = request, res = response) => {
    const { q, nombre, apikey, page = '1' } = req.query;

    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        apikey,
        page
    })
};

const postUser = async(req, res = response) => {

    const body = req.body;
    const user = new User( body );

    await user.save();

    res.json({
        msg: "post API - Controlador",
        user
    });
};

const putUser = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: "put API - Controlador",
        id
    })
};

const patchUser = (req, res = response) => {
    res.json({
        msg: "patch API - Controlador"
    })
};

const deleteUser = (req, res = response) => {
    res.json({
        msg: "delete API - Controlador"
    })
};

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}