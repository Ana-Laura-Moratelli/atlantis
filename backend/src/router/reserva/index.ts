import { Router, Request, Response } from 'express';
import db from '../../database';
import { ResultSetHeader } from 'mysql2';


const router = Router();

router.post('/cadastrar-reserva', (req: Request, res: Response) => {
    const { clienteId, acomodacaoId } = req.body;

    const reservaQuery = `
        INSERT INTO reservas (clienteId, acomodacaoId, dataReserva)
        VALUES (?, ?, NOW())
    `;

    db.query<ResultSetHeader>(reservaQuery, [clienteId, acomodacaoId], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar reserva:', err);
            res.status(500).json({ message: 'Erro ao cadastrar reserva' });
            return;
        }

        res.status(200).json({ message: 'Reserva cadastrada com sucesso' });
    });
});

router.get('/listar-reservas', (req: Request, res: Response) => {
    const reservasQuery = `
        SELECT
            r.id,
            c.nome AS cliente,
            a.nome AS acomodacao,
            a.leitosSolteiro,
            a.leitosCasal,
            a.climatizacao,
            a.garagens,
            a.suites,
            r.dataReserva
        FROM reservas r
        JOIN cliente c ON r.clienteId = c.id
        JOIN acomodacoes a ON r.acomodacaoId = a.id
    `;

    db.query(reservasQuery, (err, results) => {
        if (err) {
            console.error('Erro ao listar reservas:', err);
            res.status(500).json({ message: 'Erro ao listar reservas' });
            return;
        }

        res.status(200).json(results);
    });
});

router.delete('/excluir-reserva/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteReservaQuery = `DELETE FROM reservas WHERE id = ?`;

    db.query(deleteReservaQuery, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir reserva:', err);
            res.status(500).json({ message: 'Erro ao excluir reserva' });
            return;
        }

        res.status(200).json({ message: 'Reserva excluída com sucesso' });
    });
});


export default router;
