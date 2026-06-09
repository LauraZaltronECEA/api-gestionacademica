const { pool } = require('../db/connection')

class InscripcionService {
    async create(body) {
        const sql = `INSERT INTO inscripcion (id_alumno, id_materia, fecha_alta, usuario_alta)
                     VALUES (?, ?, NOW(), ?)`
        const [result] = await pool.query(sql, [
            body.id_alumno, body.id_materia, body.usuario_alta || null
        ])
        return { id: result.insertId, id_alumno: body.id_alumno, id_materia: body.id_materia }
    }

    async getMateriasByAlumno(alumnoId, incluirBajas) {
        let sql = `SELECT m.*, c.nombre_carrera FROM materia m
                   INNER JOIN inscripcion i ON m.id = i.id_materia
                   INNER JOIN carreras c ON m.carrera = c.id
                   WHERE i.id_alumno = ?`
        if (!incluirBajas) sql += ' AND i.fecha_baja IS NULL AND m.fecha_baja IS NULL'
        const [rows] = await pool.query(sql, [alumnoId])
        return rows
    }

    async getAlumnosByMateria(materiaId, incluirBajas) {
        let sql = `SELECT u.*, r.rol FROM usuario u
                   INNER JOIN inscripcion i ON u.id = i.id_alumno
                   INNER JOIN rol r ON u.rol = r.id
                   WHERE i.id_materia = ? AND r.rol = 'Alumno'`
        if (!incluirBajas) sql += ' AND i.fecha_baja IS NULL AND u.fecha_baja IS NULL'
        const [rows] = await pool.query(sql, [materiaId])
        return rows
    }

    async softDelete(id) {
        const sql = `UPDATE inscripcion SET fecha_baja = NOW(), usuario_baja = ? WHERE id = ? AND fecha_baja IS NULL`
        const [result] = await pool.query(sql, [null, id])
        if (result.affectedRows === 0) {
            const error = new Error('Inscripcion no encontrada')
            error.status = 404
            throw error
        }
        return { message: 'Baja logica exitosa', id }
    }
}

module.exports = InscripcionService
