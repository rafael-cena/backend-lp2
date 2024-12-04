import Privilegio from "../Modelo/privilegio.js";
import Usuario from "../Modelo/usuario.js";

export default class UsuarioCtrl {
    incluir(req, res) {
        res.type("application/json");
        if (req.method == 'POST' && req.is("application/json")) {
            const username = req.body.username;
            const senha = req.body.senha;
            const nome = req.body.nome;
            const email = req.body.email;
            const privilegio = req.body.privilegio;

            const priv = new Privilegio(privilegio.codigo);
            priv.consultar(privilegio.codigo).then((listaPrivilegios) => {
                if (listaPrivilegios.length > 0) {
                    if (username && senha) {
                        if (nome === undefined) nome = username;

                        const usuario = new Usuario(0, username, senha, nome, email, priv);
                        usuario.incluir().then(() => {
                            res.status(200).json({
                                "status": true,
                                "mensagem": "Cadastro realizado com sucesso!",
                                "codigo": usuario.codigo
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
                        res.status(400).json(
                            {
                                "status": false,
                                "mensagem": "Informe corretamente todos os dados conforme documentação da API."
                            }
                        );
                    }
                }
                else {
                    res.status(400).json({
                        "status": false,
                        "mensagem": "O Privilegio informado é invalido."
                    });
                }
            })
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
            const id = req.params.codigo;
            const username = req.body.username;
            const senha = req.body.senha;
            const nome = req.body.nome;
            const email = req.body.email;
            const privilegio = req.body.privilegio;
            const priv = new Privilegio(privilegio.codigo);

            priv.consultar(privilegio.codigo).then((listaPrivilegios) => {
                if (listaPrivilegios.length > 0) {
                    if (id && username && senha && nome && privilegio.codigo > 0) {
                        const usuario = new Usuario(id, username, senha, nome, email, priv);
                        usuario.alterar().then(() => {
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
                        "mensagem": "O Privilegio informado é invalido."
                    });
                }
            })
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
                const usuario = new Usuario(id);
                usuario.excluir().then(() => {
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
            let id = req.params.id;
            if (isNaN(id)) id = "";

            const usuario = new Usuario();
            usuario.consultar(id).then((listaUsuarios) => {
                res.status(200).json(listaUsuarios);
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

    autLogin(req, res) {
        res.type("application/json");

        if (req.method === 'POST' && req.is("application/json")) {
            const username = req.body.username;
            const senha = req.body.senha;

            if (username && senha) {
                const usuario = new Usuario(0, username, senha);
                usuario.autLogin().then((login) => {
                    res.status(200).json({
                        "status": true,
                        "login": login,
                        "mensagem": "Senha verificada!" 
                    });
                })
                .catch((erro) => {
                    res.status(400).json({
                        "status": false,
                        "mensagem": "Erro: ", erro
                    });
                })
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Informe todos os dados."
                })
            }
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            })
        }
    }
}