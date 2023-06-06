//CST.
const database = require('./../config/basedatos');

const obtenerTodo = async (req, res) => {

    const db = await database();
    const sql = `SELECT * FROM usuario`;
    const [rows] =  await db.query(sql);

    const resultado = {
        ok: true,
        data: rows
    }
    res.json(resultado);
}

const obtenerUnoSolo = async (req, res) => {
    //obtener el id por la url
    const { id } = req.params;
    const db = await database();
    const sql = `SELECT * FROM usuario WHERE id_usuario = ${id}`;
    const [row] = await db.query(sql);

    const resultado = {
        ok: true,
        data: row
    }
    if (resultado === '') {
        return res.status(403).json({
            "msj": "error",
            "error": "No Existe informacion"
        });
    }

    res.json(resultado);
}

const agregarUsuario = async (req, res) => {
    // console.log(req.body);
    const { nombre, apellido, usuario, password, activo } = req.body;

    if (nombre === '') {
        return res.status(403).json({
            "msj": "error",
            "error": "favor agregar nombre"
        });
    }
    if (apellido === '') {
        return res.status(403).json({
            "msj": "error",
            "error": "favor agregar apellido"
        });
    }
    if (usuario === '') {
        return res.status(403).json({
            "msj": "error",
            "error": "favor agregar Nombre Usuario"
        });
    }
    if (password === '') {
        return res.status(403).json({
            "msj": "error",
            "error": "favor agregar una contraseña"
        });
    }

    if (!activo) {
        return res.status(403).json({
            "msj": "error",
            "error": "el usuario no esta activo"
        });
    }

    const db = await database();
    const sql = `INSERT INTO usuario(nombre, apellido,usuario,password,activo)
                VALUES('${nombre}', '${apellido}', '${usuario}', '${password}', ${activo})`;
    const [result] = await db.query(sql);

    if (result.insertId) {
        return res.json({
            "msj": "Usuario Agregado Correctamente",
        });
    }

    res.json({
        "msj": "Usuario No Agregado",
    });
}

const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, usuario, password, activo } = req.body;

    const db = await database();
    const sql = `UPDATE usuario SET
                    nombre = '${nombre}',
                    apellido = '${apellido}',
                    usuario = '${usuario}',
                    password = '${password}',
                    activo = ${activo}
                WHERE id_usuario = ${id}`;
    const [result] = await db.query(sql);

    console.log(result);

    res.json({
        "msj": "usuario modificado",
    });
}

const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    const db = await database();
    const sql = `DELETE FROM usuario
                WHERE id_usuario = ${id}`;
    const [result] = await db.query(sql);

    if(result.affectedRows){
        return res.json({
            "msj": "usuario eliminado"
        });
    }

    res.json({
        "msj": "usuario no eliminado"
    });   
}

module.exports = {
    obtenerTodo,
    obtenerUnoSolo,
    agregarUsuario,
    editarUsuario,
    eliminarUsuario
}