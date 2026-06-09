const {pool} = require('../db/connection')

class MateriaService{
    async get(incluirBajas){
        let sql = `SELECT m.*, c.nombre_carrera FROM materia m INNER JOIN carreras c ON m.carrera = c.id`
        if (!incluirBajas) sql += ' WHERE m.fecha_baja IS NULL'
        const [rows] = await pool.query(sql)
        return rows
    }

    async getById(id) {
        const sql = `SELECT m.*, c.nombre_carrera FROM materia m INNER JOIN carreras c ON m.carrera = c.id WHERE m.id = ?`
        const [rows] = await pool.query(sql, [id])
        if (rows.length === 0) {
            const error = new Error('Materia no encontrada')
            error.status = 404
            throw error
        }
        return rows[0]
    }

    async create(body) {
        const sql = `INSERT INTO materia (nombre_materia, carrera, fecha_alta, usuario_alta)
                     VALUES (?, ?, NOW(), ?)`
        const [result] = await pool.query(sql, [
            body.nombre_materia, body.carrera, body.usuario_alta || null
        ])
        return { id: result.insertId, nombre_materia: body.nombre_materia, carrera: body.carrera }
    }

    async update(id, body) {
        const fields = []
        const values = []
        if (body.nombre_materia) { fields.push('nombre_materia = ?'); values.push(body.nombre_materia) }
        if (body.carrera) { fields.push('carrera = ?'); values.push(body.carrera) }
        if (fields.length === 0) {
            const error = new Error('No hay campos para actualizar')
            error.status = 400
            throw error
        }
        fields.push('fecha_modificacion = NOW()')
        fields.push('usuario_modificacion = ?')
        values.push(body.usuario_modificacion || null)
        values.push(id)
        const sql = `UPDATE materia SET ${fields.join(', ')} WHERE id = ? AND fecha_baja IS NULL`
        const [result] = await pool.query(sql, values)
        if (result.affectedRows === 0) {
            const error = new Error('Materia no encontrada')
            error.status = 404
            throw error
        }
        return { message: 'Materia actualizada', id }
    }

    async softDelete(id) {
        const sql = `UPDATE materia SET fecha_baja = NOW(), usuario_baja = ? WHERE id = ? AND fecha_baja IS NULL`
        const [result] = await pool.query(sql, [null, id])
        if (result.affectedRows === 0) {
            const error = new Error('Materia no encontrada')
            error.status = 404
            throw error
        }
        return { message: 'Baja logica exitosa', id }
    }
}