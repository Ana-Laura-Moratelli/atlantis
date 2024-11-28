import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import clienteRouter from './router/cliente';
import acomodacaoRouter from './router/acomodacao';
import reservaRouter from './router/reserva'
import loginRouter from './router/login';
import bcrypt from 'bcrypt';
import db from './database'; 

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(clienteRouter);
app.use(acomodacaoRouter);
app.use(reservaRouter);
app.use('/login', loginRouter);

// Função para criar o usuário admin
async function createAdminUser() {
    const email = 'admin@admin.com';
    const plainPassword = 'admin';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const query = `INSERT IGNORE INTO usuarios (email, senha, role) VALUES (?, ?, 'admin')`;
    db.query(query, [email, hashedPassword], (err) => {
        if (err) {
            console.error('Erro ao criar usuário admin:', err);
        } else {
            console.log('Usuário admin criado ou já existente.');
        }
    });
}

createAdminUser().catch((err) => {
    console.error('Erro ao inicializar usuário admin:', err);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando - http://localhost:${PORT}`);
});
