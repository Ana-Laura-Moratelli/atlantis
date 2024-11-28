import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import db from '../../database';

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'admin';

router.post('/', (req: Request, res: Response) => {
    const { email, senha } = req.body;

    const query = `SELECT * FROM usuarios WHERE email = ?`;
    db.query<RowDataPacket[]>(query, [email], async (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            res.status(500).json({ message: 'Erro interno no servidor' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ message: 'Credenciais inválidas' });
            return;
        }

        const user = results[0]; 
        const validPassword = await bcrypt.compare(senha, user.senha);

        if (!validPassword) {
            res.status(401).json({ message: 'Credenciais inválidas' });
            return;
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login bem-sucedido', token });
    });
});

export default router;
