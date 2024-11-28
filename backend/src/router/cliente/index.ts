import { Router, Request, Response } from 'express';
import db from '../../database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';


const router = Router();

router.post('/cadastrar-titular', (req: Request, res: Response) => {
    const { nome, nomeSocial, dataNascimento, telefones, endereco, documentos } = req.body;

    db.beginTransaction((err) => {
        if (err) {
            console.error('Erro ao iniciar transação:', err);
            res.status(500).json({ message: 'Erro no servidor' });
            return;
        }

        if (documentos && documentos.length > 0) {
            const documentosDuplicados: string[] = [];
            let documentosProcessados = 0;

            documentos.forEach((documento: { numero: string; tipo: string; dataExpedicao: string }) => {
                const verificaDocumentoQuery = `
                    SELECT id FROM documento WHERE numero = ? AND tipo = ?
                `;
                db.query<RowDataPacket[]>(verificaDocumentoQuery, [documento.numero, documento.tipo], (err, results) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Erro ao verificar documento:', err);
                            res.status(500).json({ message: 'Erro ao verificar documento' });
                        });
                    }

                    if (results.length > 0) {
                        documentosDuplicados.push(`Tipo: ${documento.tipo}, Número: ${documento.numero}`);
                    }

                    documentosProcessados++;

                    if (documentosProcessados === documentos.length) {
                        if (documentosDuplicados.length > 0) {
                            return db.rollback(() => {
                                res.status(400).json({
                                    message: 'Não é possível cadastrar. Documentos duplicados encontrados.',
                                    documentosDuplicados,
                                });
                            });
                        }

                        inserirCliente();
                    }
                });
            });
        } else {
            inserirCliente();
        }

        function inserirCliente() {
            const clienteQuery = `
                INSERT INTO cliente (nome, nomeSocial, dataNascimento, dataCadastro, tipo, titularId)
                VALUES (?, ?, ?, NOW(), 'T', NULL)
            `;

            db.query<ResultSetHeader>(clienteQuery, [nome, nomeSocial, dataNascimento], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Erro ao inserir cliente:', err);
                        res.status(500).json({ message: 'Erro ao cadastrar titular' });
                    });
                }

                const clienteId = result.insertId;

                if (telefones && telefones.length > 0) {
                    telefones.forEach((telefone: { ddd: string; numero: string }) => {
                        const telefoneQuery = `INSERT INTO telefone (clienteId, ddd, numero) VALUES (?, ?, ?)`;
                        db.query(telefoneQuery, [clienteId, telefone.ddd, telefone.numero], (err) => {
                            if (err) console.error('Erro ao inserir telefone:', err);
                        });
                    });
                }

                if (endereco) {
                    const enderecoQuery = `
                        INSERT INTO endereco (clienteId, rua, bairro, cidade, estado, pais, codigoPostal)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    `;
                    db.query(enderecoQuery, [clienteId, endereco.rua, endereco.bairro, endereco.cidade, endereco.estado, endereco.pais, endereco.codigoPostal], (err) => {
                        if (err) console.error('Erro ao inserir endereço:', err);
                    });
                }

                if (documentos && documentos.length > 0) {
                    documentos.forEach((documento: { numero: string; tipo: string; dataExpedicao: string }) => {
                        const documentoQuery = `
                            INSERT INTO documento (clienteId, numero, tipo, dataExpedicao)
                            VALUES (?, ?, ?, ?)
                        `;
                        db.query(documentoQuery, [clienteId, documento.numero, documento.tipo, documento.dataExpedicao], (err) => {
                            if (err) console.error('Erro ao inserir documento:', err);
                        });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Erro ao commitar transação:', err);
                            res.status(500).json({ message: 'Erro ao cadastrar titular' });
                        });
                    }

                    res.status(200).json({ message: 'Titular cadastrado com sucesso' });
                });
            });
        }
    });
});

router.post('/cadastrar-dependente', (req: Request, res: Response) => {
    const { titularId, nome, nomeSocial, dataNascimento, telefones, endereco, documentos } = req.body;

    db.beginTransaction((err) => {
        if (err) {
            console.error('Erro ao iniciar transação:', err);
            res.status(500).json({ message: 'Erro no servidor' });
            return;
        }

        if (documentos && documentos.length > 0) {
            const documentosDuplicados: string[] = [];
            let documentosProcessados = 0;

            documentos.forEach((documento: { numero: string; tipo: string; dataExpedicao: string }) => {
                const verificaDocumentoQuery = `
                    SELECT id FROM documento WHERE numero = ? AND tipo = ?
                `;
                db.query<RowDataPacket[]>(verificaDocumentoQuery, [documento.numero, documento.tipo], (err, results) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Erro ao verificar documento:', err);
                            res.status(500).json({ message: 'Erro ao verificar documento' });
                        });
                    }

                    if (results.length > 0) {
                        documentosDuplicados.push(`Tipo: ${documento.tipo}, Número: ${documento.numero}`);
                    }

                    documentosProcessados++;

                    if (documentosProcessados === documentos.length) {
                        if (documentosDuplicados.length > 0) {
                            return db.rollback(() => {
                                res.status(400).json({
                                    message: 'Não é possível cadastrar. Documentos duplicados encontrados.',
                                    documentosDuplicados,
                                });
                            });
                        }

                        inserirDependente();
                    }
                });
            });
        } else {
            inserirDependente();
        }

        function inserirDependente() {
            const clienteQuery = `
                INSERT INTO cliente (nome, nomeSocial, dataNascimento, dataCadastro, tipo, titularId)
                VALUES (?, ?, ?, NOW(), 'D', ?)
            `;

            db.query<ResultSetHeader>(clienteQuery, [nome, nomeSocial, dataNascimento, titularId], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Erro ao inserir dependente:', err);
                        res.status(500).json({ message: 'Erro ao cadastrar dependente' });
                    });
                }

                const clienteId = result.insertId;

                if (telefones && telefones.length > 0) {
                    telefones.forEach((telefone: { ddd: string; numero: string }) => {
                        const telefoneQuery = `INSERT INTO telefone (clienteId, ddd, numero) VALUES (?, ?, ?)`;
                        db.query(telefoneQuery, [clienteId, telefone.ddd, telefone.numero], (err) => {
                            if (err) console.error('Erro ao inserir telefone:', err);
                        });
                    });
                }

                if (endereco) {
                    const enderecoQuery = `
                        INSERT INTO endereco (clienteId, rua, bairro, cidade, estado, pais, codigoPostal)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    `;
                    db.query(enderecoQuery, [clienteId, endereco.rua, endereco.bairro, endereco.cidade, endereco.estado, endereco.pais, endereco.codigoPostal], (err) => {
                        if (err) console.error('Erro ao inserir endereço:', err);
                    });
                }

                if (documentos && documentos.length > 0) {
                    documentos.forEach((documento: { numero: string; tipo: string; dataExpedicao: string }) => {
                        const documentoQuery = `
                            INSERT INTO documento (clienteId, numero, tipo, dataExpedicao)
                            VALUES (?, ?, ?, ?)
                        `;
                        db.query(documentoQuery, [clienteId, documento.numero, documento.tipo, documento.dataExpedicao], (err) => {
                            if (err) console.error('Erro ao inserir documento:', err);
                        });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Erro ao commitar transação:', err);
                            res.status(500).json({ message: 'Erro ao cadastrar dependente' });
                        });
                    }

                    res.status(200).json({ message: 'Dependente cadastrado com sucesso' });
                });
            });
        }
    });
});


router.get('/listar-titulares', (req: Request, res: Response) => {
    const listQuery = `SELECT id, nome FROM cliente WHERE tipo = 'T'`;
    db.query(listQuery, (err, results) => {
        if (err) {
            console.error('Erro ao listar titulares:', err);
            res.status(500).json({ message: 'Erro ao listar titulares' });
            return;
        }
        res.status(200).json(results);
    });
});

router.get('/listar-dependentes', (req: Request, res: Response) => {
    const listQuery = `SELECT id, nome FROM cliente WHERE tipo = 'D'`;
    db.query(listQuery, (err, results) => {
        if (err) {
            console.error('Erro ao listar dependentes:', err);
            res.status(500).json({ message: 'Erro ao listar dependentes' });
            return;
        }
        res.status(200).json(results);
    });
});

router.get('/listar-titular/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    const clienteQuery = `
    SELECT id, nome, nomeSocial, dataNascimento
    FROM cliente
    WHERE id = ?`;

    const telefonesQuery = `
        SELECT ddd, numero
        FROM telefone
        WHERE clienteId = ?`;

    const enderecoQuery = `
        SELECT rua, bairro, cidade, estado, pais, codigoPostal
        FROM endereco
        WHERE clienteId = ?`;

    const documentosQuery = `
        SELECT numero, tipo, dataExpedicao
        FROM documento
        WHERE clienteId = ?`;

    db.query<RowDataPacket[]>(clienteQuery, [id], (err, clienteResults) => {
        if (err) {
            console.error('Erro ao obter cliente:', err);
            res.status(500).json({ message: 'Erro ao obter cliente' });
            return;
        }

        if (clienteResults.length === 0) {
            res.status(404).json({ message: 'Titular não encontrado' });
            return;
        }

        const cliente = clienteResults[0];

        db.query<RowDataPacket[]>(telefonesQuery, [id], (err, telefonesResults) => {
            if (err) {
                console.error('Erro ao obter telefones:', err);
                res.status(500).json({ message: 'Erro ao obter telefones' });
                return;
            }

            db.query<RowDataPacket[]>(enderecoQuery, [id], (err, enderecoResults) => {
                if (err) {
                    console.error('Erro ao obter endereço:', err);
                    res.status(500).json({ message: 'Erro ao obter endereço' });
                    return;
                }

                db.query<RowDataPacket[]>(documentosQuery, [id], (err, documentosResults) => {
                    if (err) {
                        console.error('Erro ao obter documentos:', err);
                        res.status(500).json({ message: 'Erro ao obter documentos' });
                        return;
                    }

                    res.status(200).json({
                        ...cliente,
                        telefones: telefonesResults,
                        endereco: enderecoResults[0] || null,
                        documentos: documentosResults
                    });
                });
            });
        });
    });
});

router.put('/atualizar-cliente/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, nomeSocial, dataNascimento, telefones, endereco, documentos } = req.body;

    const updateClienteQuery = `UPDATE cliente SET nome = ?, nomeSocial = ?, dataNascimento = ? WHERE id = ?`;
    const formattedDataNascimento = dataNascimento ? new Date(dataNascimento).toISOString().split('T')[0] : null;

    if (documentos && documentos.length > 0) {
        const documentosDuplicados: string[] = [];
        let documentosProcessados = 0;

        documentos.forEach((documento: { numero: string; tipo: string }) => {
            const verificaDocumentoQuery = `
                SELECT id FROM documento WHERE numero = ? AND tipo = ? AND clienteId != ?
            `;
            db.query<RowDataPacket[]>(verificaDocumentoQuery, [documento.numero, documento.tipo, id], (err, results) => {
                if (err) {
                    console.error('Erro ao verificar documento:', err);
                    return res.status(500).json({ message: 'Erro ao verificar documentos' });
                }

                if (results.length > 0) {
                    documentosDuplicados.push(`Tipo: ${documento.tipo}, Número: ${documento.numero}`);
                }

                documentosProcessados++;

                if (documentosProcessados === documentos.length) {
                    if (documentosDuplicados.length > 0) {
                        return res.status(400).json({
                            message: 'Documentos duplicados encontrados',
                            documentosDuplicados,
                        });
                    }

                    atualizarCliente();
                }
            });
        });
    } else {
        atualizarCliente();
    }

    function atualizarCliente() {
        db.query<ResultSetHeader>(updateClienteQuery, [nome, nomeSocial, formattedDataNascimento, id], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar cliente:', err);
                res.status(500).json({ message: 'Erro ao atualizar titular' });
                return;
            }

            const updateEnderecoQuery = `
                UPDATE endereco
                SET rua = ?, bairro = ?, cidade = ?, estado = ?, pais = ?, codigoPostal = ?
                WHERE clienteId = ?
            `;
            db.query<ResultSetHeader>(
                updateEnderecoQuery,
                [endereco.rua, endereco.bairro, endereco.cidade, endereco.estado, endereco.pais, endereco.codigoPostal, id],
                (err, result) => {
                    if (err) {
                        console.error('Erro ao atualizar endereço:', err);
                        res.status(500).json({ message: 'Erro ao atualizar endereço' });
                        return;
                    }

                    if (result.affectedRows === 0) {
                        const insertEnderecoQuery = `
                            INSERT INTO endereco (clienteId, rua, bairro, cidade, estado, pais, codigoPostal)
                            VALUES (?, ?, ?, ?, ?, ?, ?)
                        `;
                        db.query(insertEnderecoQuery, [id, endereco.rua, endereco.bairro, endereco.cidade, endereco.estado, endereco.pais, endereco.codigoPostal], (err) => {
                            if (err) {
                                console.error('Erro ao inserir endereço:', err);
                                res.status(500).json({ message: 'Erro ao inserir endereço' });
                                return;
                            }
                            updateTelefonesEDocumentos();
                        });
                    } else {
                        updateTelefonesEDocumentos();
                    }
                }
            );

            function updateTelefonesEDocumentos() {
                const deleteTelefonesQuery = `DELETE FROM telefone WHERE clienteId = ?`;
                db.query(deleteTelefonesQuery, [id], (err) => {
                    if (err) {
                        console.error('Erro ao excluir telefones:', err);
                        res.status(500).json({ message: 'Erro ao atualizar telefones' });
                        return;
                    }

                    const insertTelefonePromises = telefones.map((telefone: { ddd: string; numero: string }) => {
                        return new Promise<void>((resolve, reject) => {
                            const telefoneQuery = `INSERT INTO telefone (clienteId, ddd, numero) VALUES (?, ?, ?)`;
                            db.query(telefoneQuery, [id, telefone.ddd, telefone.numero], (err) => {
                                if (err) {
                                    console.error('Erro ao inserir telefone:', err);
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                        });
                    });

                    Promise.all(insertTelefonePromises)
                        .then(() => {
                            const deleteDocumentosQuery = `DELETE FROM documento WHERE clienteId = ?`;
                            db.query(deleteDocumentosQuery, [id], (err) => {
                                if (err) {
                                    console.error('Erro ao excluir documentos:', err);
                                    res.status(500).json({ message: 'Erro ao atualizar documentos' });
                                    return;
                                }

                                const insertDocumentoPromises = documentos.map((documento: { numero: string; tipo: string; dataExpedicao: string }) => {
                                    return new Promise<void>((resolve, reject) => {
                                        const formattedDataExpedicao = documento.dataExpedicao
                                            ? new Date(documento.dataExpedicao).toISOString().split('T')[0]
                                            : null;

                                        const documentoQuery = `INSERT INTO documento (clienteId, numero, tipo, dataExpedicao) VALUES (?, ?, ?, ?)`;
                                        db.query(documentoQuery, [id, documento.numero, documento.tipo, formattedDataExpedicao], (err) => {
                                            if (err) {
                                                console.error('Erro ao inserir documento:', err);
                                                reject(err);
                                            } else {
                                                resolve();
                                            }
                                        });
                                    });
                                });

                                Promise.all(insertDocumentoPromises)
                                    .then(() => {
                                        res.status(200).json({ message: 'Cliente atualizado com sucesso' });
                                    })
                                    .catch((err) => {
                                        console.error('Erro ao inserir documentos:', err);
                                        res.status(500).json({ message: 'Erro ao atualizar documentos' });
                                    });
                            });
                        })
                        .catch((err) => {
                            console.error('Erro ao inserir telefones:', err);
                            res.status(500).json({ message: 'Erro ao atualizar telefones' });
                        });
                });
            }
        });
    }
});


router.delete('/excluir-titular/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    db.beginTransaction((err) => {
        if (err) {
            console.error('Erro ao iniciar transação:', err);
            res.status(500).json({ message: 'Erro ao excluir titular' });
            return;
        }

        const selectDependentesQuery = `SELECT id FROM cliente WHERE titularId = ?`;
        db.query<RowDataPacket[]>(selectDependentesQuery, [id], (err, dependentesResults) => {
            if (err) {
                return db.rollback(() => {
                    console.error('Erro ao selecionar dependentes:', err);
                    res.status(500).json({ message: 'Erro ao excluir dependentes' });
                });
            }

            const dependentesIds = dependentesResults.map((row) => row.id);
            const allIds = [id, ...dependentesIds];

            const checkReservasQuery = `SELECT COUNT(*) AS reservaCount FROM reservas WHERE clienteId IN (?)`;
            db.query<RowDataPacket[]>(checkReservasQuery, [allIds], (err, reservaResults) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Erro ao verificar reservas:', err);
                        res.status(500).json({ message: 'Erro ao verificar reservas' });
                    });
                }

                const reservaCount = reservaResults[0]?.reservaCount || 0;

                if (reservaCount > 0) {
                    return db.rollback(() => {
                        res.status(400).json({
                            message: 'Não é possível excluir o titular com reservas associadas',
                        });
                    });
                }

                const excluirDadosDependentes = (callback: () => void) => {
                    if (dependentesIds.length === 0) {
                        return callback();
                    }

                    const deleteEnderecosDependentesQuery = `DELETE FROM endereco WHERE clienteId IN (?)`;
                    db.query(deleteEnderecosDependentesQuery, [dependentesIds], (err) => {
                        if (err) {
                            return db.rollback(() => {
                                console.error('Erro ao excluir endereços dos dependentes:', err);
                                res.status(500).json({ message: 'Erro ao excluir endereços dos dependentes' });
                            });
                        }

                        const deleteTelefonesDependentesQuery = `DELETE FROM telefone WHERE clienteId IN (?)`;
                        db.query(deleteTelefonesDependentesQuery, [dependentesIds], (err) => {
                            if (err) {
                                return db.rollback(() => {
                                    console.error('Erro ao excluir telefones dos dependentes:', err);
                                    res.status(500).json({ message: 'Erro ao excluir telefones dos dependentes' });
                                });
                            }

                            const deleteDocumentosDependentesQuery = `DELETE FROM documento WHERE clienteId IN (?)`;
                            db.query(deleteDocumentosDependentesQuery, [dependentesIds], (err) => {
                                if (err) {
                                    return db.rollback(() => {
                                        console.error('Erro ao excluir documentos dos dependentes:', err);
                                        res.status(500).json({ message: 'Erro ao excluir documentos dos dependentes' });
                                    });
                                }

                                const deleteDependentesQuery = `DELETE FROM cliente WHERE id IN (?)`;
                                db.query(deleteDependentesQuery, [dependentesIds], (err) => {
                                    if (err) {
                                        return db.rollback(() => {
                                            console.error('Erro ao excluir dependentes:', err);
                                            res.status(500).json({ message: 'Erro ao excluir dependentes' });
                                        });
                                    }

                                    callback();
                                });
                            });
                        });
                    });
                };

                excluirDadosDependentes(() => {
                    const deleteEnderecoQuery = `DELETE FROM endereco WHERE clienteId = ?`;
                    db.query(deleteEnderecoQuery, [id], (err) => {
                        if (err) {
                            return db.rollback(() => {
                                console.error('Erro ao excluir endereço do titular:', err);
                                res.status(500).json({ message: 'Erro ao excluir endereço' });
                            });
                        }

                        const deleteTelefonesQuery = `DELETE FROM telefone WHERE clienteId = ?`;
                        db.query(deleteTelefonesQuery, [id], (err) => {
                            if (err) {
                                return db.rollback(() => {
                                    console.error('Erro ao excluir telefones do titular:', err);
                                    res.status(500).json({ message: 'Erro ao excluir telefones' });
                                });
                            }

                            const deleteDocumentosQuery = `DELETE FROM documento WHERE clienteId = ?`;
                            db.query(deleteDocumentosQuery, [id], (err) => {
                                if (err) {
                                    return db.rollback(() => {
                                        console.error('Erro ao excluir documentos do titular:', err);
                                        res.status(500).json({ message: 'Erro ao excluir documentos' });
                                    });
                                }

                                const deleteClienteQuery = `DELETE FROM cliente WHERE id = ?`;
                                db.query(deleteClienteQuery, [id], (err) => {
                                    if (err) {
                                        return db.rollback(() => {
                                            console.error('Erro ao excluir titular:', err);
                                            res.status(500).json({ message: 'Erro ao excluir titular' });
                                        });
                                    }

                                    db.commit((err) => {
                                        if (err) {
                                            return db.rollback(() => {
                                                console.error('Erro ao commitar transação:', err);
                                                res.status(500).json({ message: 'Erro ao excluir titular' });
                                            });
                                        }

                                        res.status(200).json({ message: 'Titular e dependentes excluídos com sucesso' });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});


router.delete('/excluir-dependente/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    db.beginTransaction((err) => {
        if (err) {
            console.error('Erro ao iniciar transação:', err);
            res.status(500).json({ message: 'Erro ao excluir dependente' });
            return;
        }

        const checkReservasQuery = `SELECT COUNT(*) AS reservaCount FROM reservas WHERE clienteId = ?`;
        db.query<RowDataPacket[]>(checkReservasQuery, [id], (err, reservaResults) => {
            if (err) {
                return db.rollback(() => {
                    console.error('Erro ao verificar reservas:', err);
                    res.status(500).json({ message: 'Erro ao verificar reservas' });
                });
            }

            const reservaCount = reservaResults[0]?.reservaCount || 0;

            if (reservaCount > 0) {
                return db.rollback(() => {
                    res.status(400).json({
                        message: 'Não é possível excluir o dependente com reservas associadas',
                    });
                });
            }

            const deleteTelefonesQuery = `DELETE FROM telefone WHERE clienteId = ?`;
            db.query(deleteTelefonesQuery, [id], (err) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Erro ao excluir telefones do dependente:', err);
                        res.status(500).json({ message: 'Erro ao excluir telefones' });
                    });
                }

                const deleteDocumentosQuery = `DELETE FROM documento WHERE clienteId = ?`;
                db.query(deleteDocumentosQuery, [id], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Erro ao excluir documentos do dependente:', err);
                            res.status(500).json({ message: 'Erro ao excluir documentos' });
                        });
                    }

                    const deleteClienteQuery = `DELETE FROM cliente WHERE id = ?`;
                    db.query(deleteClienteQuery, [id], (err) => {
                        if (err) {
                            return db.rollback(() => {
                                console.error('Erro ao excluir dependente:', err);
                                res.status(500).json({ message: 'Erro ao excluir dependente' });
                            });
                        }

                        db.commit((err) => {
                            if (err) {
                                return db.rollback(() => {
                                    console.error('Erro ao commitar transação:', err);
                                    res.status(500).json({ message: 'Erro ao excluir dependente' });
                                });
                            }

                            res.status(200).json({ message: 'Dependente excluído com sucesso' });
                        });
                    });
                });
            });
        });
    });
});


// Listagens
router.get('/listar-titulares-com-dependentes', (req: Request, res: Response) => {
    const query = `
        SELECT t.id AS titularId, t.nome AS titularNome, d.id AS dependenteId, d.nome AS dependenteNome
        FROM cliente t
        LEFT JOIN cliente d ON d.titularId = t.id AND d.tipo = 'D'
        WHERE t.tipo = 'T'
        ORDER BY t.nome, d.nome;
    `;

    db.query<RowDataPacket[]>(query, (err, results) => {
        if (err) {
            console.error('Erro ao listar titulares e dependentes:', err);
            res.status(500).json({ message: 'Erro ao listar titulares e dependentes' });
            return;
        }

        res.status(200).json(results);
    });
});

router.get('/listar-dependentes-com-titulares', (req: Request, res: Response) => {
    const query = `
        SELECT d.id AS dependenteId, d.nome AS dependenteNome, t.id AS titularId, t.nome AS titularNome
        FROM cliente d
        LEFT JOIN cliente t ON d.titularId = t.id
        WHERE d.tipo = 'D'
        ORDER BY d.nome;
    `;

    db.query<RowDataPacket[]>(query, (err, results) => {
        if (err) {
            console.error('Erro ao listar dependentes e titulares:', err);
            res.status(500).json({ message: 'Erro ao listar dependentes e titulares' });
            return;
        }

        res.status(200).json(results);
    });
});
export default router;
