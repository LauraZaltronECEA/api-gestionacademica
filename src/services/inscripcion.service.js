const { pool } = require('../db/connection')

class InscripcionService {
    async create(body, user) {
        const idAlumno = (user && user.admin === 1) ? body.id_alumno : user.id
        const sql = `INSERT INTO inscripcion (id_alumno, id_materia, fecha_alta, usuario_alta)
                     VALUES (?, ?, NOW(), ?)`
        const [result] = await pool.query(sql, [
            idAlumno, body.id_materia, body.usuario_alta || null
        ])
        return { id: result.insertId, id_alumno: idAlumno, id_materia: body.id_materia }
    }

    async getInscripciones(alumnoId, incluirBajas) {
        let sql = `SELECT i.id_alumno, i.id_materia, m.*, c.nombre_carrera FROM materia m
                   INNER JOIN inscripcion i ON m.id = i.id_materia
                   INNER JOIN carreras c ON m.carrera = c.id`
        const params = []
        if (alumnoId) {
            sql += ' WHERE i.id_alumno = ?'
            params.push(alumnoId)
        }
        if (!incluirBajas) {
            sql += alumnoId ? ' AND' : ' WHERE'
            sql += ' i.fecha_baja IS NULL AND m.fecha_baja IS NULL'
        }
        const [rows] = await pool.query(sql, params)
        return rows
    }

    async getAlumnosByMateria(materiaId, incluirBajas) {
        let sql = `SELECT u.id, u.nombre, u.mail, u.usuario FROM usuario u
                   INNER JOIN inscripcion i ON u.id = i.id_alumno
                   WHERE i.id_materia = ? AND u.rol = 3`
        if (!incluirBajas) sql += ' AND i.fecha_baja IS NULL AND u.fecha_baja IS NULL'
        const [rows] = await pool.query(sql, [materiaId])
        return rows
    }

    async softDelete(id, user) {
        let sql = `UPDATE inscripcion SET fecha_baja = NOW(), usuario_baja = ? WHERE id = ? AND fecha_baja IS NULL`
        const params = [null, id]
        if (user && user.admin !== 1) {
            sql += ' AND id_alumno = ?'
            params.push(user.id)
        }
        const [result] = await pool.query(sql, params)
        if (result.affectedRows === 0) {
            const error = new Error('Inscripcion no encontrada')
            error.status = 404
            throw error
        }
        return { message: 'Baja logica exitosa', id }
    }
}

module.exports = InscripcionService
