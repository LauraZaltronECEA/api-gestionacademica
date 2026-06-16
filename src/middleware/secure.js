const { decode } = require('../utils/jwt')

function attachUser(req) {
    if (!req.headers.authorization) return false
    const data = decode(req.headers.authorization)
    if (data) {
        req.user = data
        req.body.idUsuario = data.id
        return true
    }
    return false
}

function checkAdmin() {
    return (req, res, next) => {
        if (attachUser(req) && req.user.admin === 1) {
            return next()
        }
        const error = new Error("Privilegios insuficientes")
        error.status = 401
        next(error)
    }
}

function checkAuth() {
    return (req, res, next) => {
        if (attachUser(req)) {
            return next()
        }
        const error = new Error("Token requerido")
        error.status = 401
        next(error)
    }
}

function checkSelfOrAdmin() {
    return (req, res, next) => {
        if (attachUser(req) && (req.user.admin === 1 || String(req.user.id) === String(req.params.id))) {
            return next()
        }
        const error = new Error("Privilegios insuficientes")
        error.status = 401
        next(error)
    }
}

function checkAdminOrCoordinator() {
    return (req, res, next) => {
        if (attachUser(req) && (req.user.admin === 1 || req.user.admin === 2)) {
            return next()
        }
        const error = new Error("Privilegios insuficientes")
        error.status = 401
        next(error)
    }
}

module.exports = { checkAdmin, checkAuth, checkSelfOrAdmin, checkAdminOrCoordinator }