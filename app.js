const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware para analizar el cuerpo de las peticiones
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración del motor de plantillas
app.set('view engine', 'ejs');

// Archivos estáticos (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la Base de Datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456', 
    database: 'node_crud',
    port: 3306
});

// Conexión a la DB
db.connect(err => {
    if (err) {
        console.error('Error conectando a la BD:', err);
    } else {
        console.log('Conexión exitosa a la Base de Datos');
    }
});

// --- RUTAS ---

// 1. Mostrar lista de usuarios (READ)
app.get('/', (req, res) => {
    const consulta = 'SELECT * FROM users';
    db.query(consulta, (err, results) => {
        if (err) {
            console.error(err);
            res.send('Error al recuperar datos');
        } else {
            res.render('index', { users: results });
        }
    });
});

// 2. Agregar usuario (CREATE)
app.post('/add', (req, res) => {
    const { name, email } = req.body;
    const consulta = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(consulta, [name, email], (err) => {
        if (err) {
            console.error(err);
            res.send('Error al agregar usuario');
        } else {
            res.redirect('/');
        }
    });
});

// 3. Formulario de Edición (READ SINGLE)
// Corregido: antes tenías '/get/:id', ahora coincide con la vista '/edit/:id'
app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const consulta = 'SELECT * FROM users WHERE id = ?';
    db.query(consulta, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.send('Error al buscar usuario');
        } else {
            res.render('edit', { user: results[0] });
        }
    });
});

// 4. Actualizar usuario (UPDATE)
app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const consulta = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(consulta, [name, email, id], (err) => {
        if (err) {
            console.log(err);
            res.send('Error al actualizar');
        } else {
            res.redirect('/');
        }
    });
});

// 5. Eliminar usuario (DELETE) - Estaba incompleto
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const consulta = 'DELETE FROM users WHERE id = ?';
    db.query(consulta, [id], (err) => {
        if (err) {
            console.error(err);
            res.send('Error al eliminar');
        } else {
            res.redirect('/');
        }
    });
});

// Servidor
const port = 3009;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${port}`);
});