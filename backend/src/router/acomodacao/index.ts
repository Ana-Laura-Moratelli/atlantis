import { Router, Request, Response } from 'express';
import db from '../../database';

const router = Router();

router.get('/listar-acomodacoes', (req: Request, res: Response) => {
    const query = `SELECT id, nome, leitosSolteiro, leitosCasal, climatizacao, garagens, suites FROM acomodacoes`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao listar acomodações:', err);
            res.status(500).json({ message: 'Erro ao listar acomodações' });
            return;
        }

        res.status(200).json(results);
    });
});

export default router;
