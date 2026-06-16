const { pool } = require('../db/connection')
const bcrypt = require('bcrypt')

class AlumnoService {
    async getAll(incluirBajas) {
        let sql = `SELECT u.*, r.rol FROM usuario u INNER JOIN rol r ON u.rol = r.id WHERE u.rol = 3`
        if (!incluirBajas) sql += ' AND u.fecha_baja IS NULL'
        const [rows] = await pool.query(sql)
        return rows
    }

    async getById(id) {
        const sql = `SELECT u.*, r.rol FROM usuario u INNER JOIN rol r ON u.rol = r.id WHERE u.id = ? AND u.rol = 3`
        const [rows] = await pool.query(sql, [id])
        if (rows.length === 0) {
            const error = new Error('Alumno no encontrado')
            error.status = 404
            throw error
        }
        return rows[0]
    }

    async create(body) {
        const hash = await bcrypt.hash(body.password, 10)
        const sql = `INSERT INTO usuario (nombre, mail, usuario, password, rol, fecha_alta, usuario_alta)
                     VALUES (?, ?, ?, ?, 3, NOW(), ?)`
        const [result] = await pool.query(sql, [
            body.nombre, body.mail, body.usuario, hash,
            body.usuario_alta || null
        ])
        return { id: result.insertId, nombre: body.nombre, mail: body.mail, usuario: body.usuario, rol: 3 }
    }

    async update(id, body) {
        const fields = []
        const values = []
        if (body.nombre) { fields.push('nombre = ?'); values.push(body.nombre) }
        if (body.mail) { fields.push('mail = ?'); values.push(body.mail) }
        if (body.usuario) { fields.push('usuario = ?'); values.push(body.usuario) }
        if (body.password) {
            const hash = await bcrypt.hash(body.password, 10)
            fields.push('password = ?'); values.push(hash)
        }
        if (body.rol) { fields.push('rol = 3'); values.push(body.rol) }
        if (fields.length === 0) {
            const error = new Error('No hay campos para actualizar')
            error.status = 400
            throw error
        }
        fields.push('fecha_modificacion = NOW()')
        fields.push('usuario_modificacion = ?')
        values.push(body.usuario_modificacion || null)
        values.push(id)
        const sql = `UPDATE usuario SET ${fields.join(', ')} WHERE id = ? AND fecha_baja IS NULL`
        const [result] = await pool.query(sql, values)
        if (result.affectedRows === 0) {
            const error = new Error('Usuario no encontrado')
            error.status = 404
            throw error
        }
        return { message: 'Usuario actualizado', id }
    }

    async softDelete(id) {
        const sql = `UPDATE usuario SET fecha_baja = NOW(), usuario_baja = ? WHERE id = ? AND rol = 3 AND fecha_baja IS NULL`
        const [result] = await pool.query(sql, [null, id])
        if (result.affectedRows === 0) {
            const error = new Error('Usuario no encontrado')
            error.status = 404
            throw error
        }
        return { message: 'Baja logica exitosa', id }
    }
}

module.exports = AlumnoService
