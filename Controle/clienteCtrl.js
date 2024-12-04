import Cliente from "../Modelo/cliente.js";
import Usuario from "../Modelo/usuario.js";

export default class ClienteCtrl {
    incluir(req, res) {
        res.type("application/json");
        if (req.method == 'POST' && req.is("application/json")) {
            const nome = req.body.nome;
            const cpf = req.body.cpf;
            const cep = req.body.cep;
            const endereco = req.body.endereco;
            const numero = req.body.numero;
            const telefone = req.body.telefone;
            const usuario = req.body.usuario;

            if (nome && cpf && cep && numero && telefone) {
                let cliente;
                if (usuario === undefined) cliente = new Cliente("", nome, cpf, cep, endereco, numero, telefone);
                else cliente = new Cliente("", nome, cpf, cep, endereco, numero, telefone, new Usuario(usuario.id));

                cliente.incluir().then(() => {
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Cadastro realizado com sucesso!",
                        "id": cliente.id
                    });
                })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível cadastrar: " + erro.message
                        });
                    });
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados do cliente!"
                });
            }

        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    alterar(req, res) {
        res.type("application/json");
        if ((req.method == 'PATCH' || req.method == 'PUT') && req.is("application/json")) {
            const id = req.params.id;
            const nome = req.body.nome;
            const cpf = req.body.cpf;
            const cep = req.body.cep;
            const endereco = req.body.endereco;
            const numero = req.body.numero;
            const telefone = req.body.telefone;
            const usuario = req.body.usuario;
            const user = new Usuario(usuario.id);

            if (id && nome && cpf && cep && numero && telefone) {
                const cliente = new Cliente(id, nome, cpf, cep, endereco, numero, telefone, usuario);
                cliente.alterar().then(() => {
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Registro alterado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o registro: " + erro.message
                        });
                    });
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados conforme documentação da API."
                });
            }
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    excluir(req, res) {
        res.type("application/json");
        if (req.method === 'DELETE') {
            const id = req.params.id;

            if (id) {
                const cliente = new Cliente(id);
                cliente.excluir().then(() => {
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Registro excluído com sucesso!",
                    });
                })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o registro: " + erro.message
                        });
                    });
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Informe um identificador válido."
                });
            }
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    consultar(req, res) {
        res.type("application/json");

        if (req.method === 'GET') {
            let nome = req.params.nome;

            if (nome === undefined) nome = "";

            const cliente = new Cliente();
            cliente.consultar(nome).then((listaClientes) => {
                res.status(200).json(listaClientes);
            })
                .catch((erro) => {
                    res.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar registros: " + erro.message
                    });
                });
        }
        else {
            res.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }
}