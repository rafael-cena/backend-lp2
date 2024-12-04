import Fornecedor from "../Modelo/fornecedor.js";
import Produto from "../Modelo/produto.js";

export default class FornecedorCtrl {
    gravar(requisicao, resposta) {
        resposta.type("application/josn");
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome;
            const cnpj = requisicao.body.cnpj;
            const cep = requisicao.body.cep;
            const endereco = requisicao.body.endereco;
            const numero = requisicao.body.numero;
            const telefone = requisicao.body.telefone;
            const produto = requisicao.body.produto;

            const prod = new Produto(produto.codigo);
            prod.consultar(prod.codigo).then((list) => {
                if (list.length > 0) {
                    if (nome && cnpj && cep && endereco && numero && telefone) {
                        const fornecedor = new Fornecedor(0, nome, cnpj, cep, endereco, numero, telefone, prod);
                        fornecedor.incluir().then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Fornecedor adicionado com sucesso!",
                                "id": fornecedor.id
                            });
                        })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Não foi possível incluir o fornecedor: " + erro.message
                                });
                            });
                    }
                    else {
                        resposta.status(400).json({
                            "status": false,
                            "mensagem": "Informe corretamente todos os dados conforme documentação da API."
                        });
                    }
                }
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "O produto informado não existe!"
                    });
                }
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar a categoria: " + erro.message
                });
            })
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisicao inválida! Consulte a documentação da API."
            });
        }
    }

    editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method == 'PATCH' || requisicao.method == 'PUT') && requisicao.is("application/json")) {
            const id = requisicao.params.id;
            const nome = req.body.nome;
            const cnpj = req.body.cnpj;
            const cep = req.body.cep;
            const endereco = req.body.endereco;
            const numero = req.body.numero;
            const telefone = req.body.telefone;
            const produto = req.body.produto;

            const prod = new Produto(produto.codigo);
            prod.consultar(prod.codigo).then((list) => {
                if (list.length > 0) {
                    if (nome && cnpj && cep && endereco && numero && telefone) {
                        const fornecedor = new Fornecedor(id, nome, cnpj, cep, endereco, numero, telefone, prod);
                        fornecedor.alterar().then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Fornecedor alterado com sucesso!"
                            });
                        })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Não foi possível alterar o fornecedor: " + erro.message
                                });
                            });
                    }
                    else {
                        resposta.status(400).json(
                            {
                                "status": false,
                                "mensagem": "Informe corretamente todos os dados conforme documentação da API."
                            }
                        );
                    }
                }
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "O produto informado não existe!"
                    });
                }
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar o produto: " + erro.message
                });
            })
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'DELETE') {
            const id = requisicao.params.id;
            if (id > 0) {
                const fornecedor = new Fornecedor(id);
                fornecedor.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor excluído com sucesso!",
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o fornecedor: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um fornecedor conforme documentação da API."
                    }
                );
            }

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "GET") {
            let codigo = requisicao.params.codigo;
            if (isNaN(codigo)) {
                codigo = "";
            }
            
            const fornecedor = new Fornecedor();
            fornecedor.consultar(codigo)
                .then((listaFornecedores) => {
                    resposta.status(200).json(listaFornecedores);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar fornecedores: " + erro.message
                    });
                });

        }
        else {
            resposta.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }
}