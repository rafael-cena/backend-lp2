
import Privilegio from "../Modelo/privilegio.js";

export default class PrivilegioCtrl{

    gravar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method == 'POST' && requisicao.is("application/json")){
            const descricao  = requisicao.body.descricao;
            if (descricao)
            {
                const privilegio = new Privilegio(0,descricao);
                privilegio.gravar()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"privilegio adicionado com sucesso!",
                        "codigo": privilegio.codigo
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível incluir o privilegio: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de um privilegio conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }

    }

    editar(requisicao, resposta){
        resposta.type("application/json");
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")){
            const codigo     = requisicao.params.codigo;
            const descricao  = requisicao.body.descricao;
            
            if (codigo > 0 && descricao)
            {
                const privilegio = new Privilegio(codigo,descricao);
                privilegio.editar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"privilegio alterado com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível alterar o privilegio: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de um privilegio conforme documentação da API."
                    }
                );
            }
        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method == 'DELETE'){
            const codigo = requisicao.params.codigo;
            if (codigo > 0)
            {
                const privilegio = new Privilegio(codigo);
                privilegio.excluir()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"privilegio excluído com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível excluir o privilegio: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe um código válido de um privilegio conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method=="GET"){
            let codigo = requisicao.params.codigo;
            if (isNaN(codigo)){
                codigo = "";
            }

            const privilegio = new Privilegio();
            privilegio.consultar(codigo)
            .then((listaPrivilegios) =>{
                resposta.status(200).json(listaPrivilegios);
            })
            .catch((erro) => {
                resposta.status(500).json(
                    {
                        "status":false,
                        "mensagem":"Erro ao consultar privilegios: "+erro.message    
                    }
                );
            });

        }
        else
        {
            resposta.status(400).json(
                {
                    "status":false,
                    "mensagem":"Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }
}