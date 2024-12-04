import Cliente from "../Modelo/cliente.js";
import Privilegio from "../Modelo/privilegio.js";
import Usuario from "../Modelo/usuario.js";
import conectar from "./Conexao.js";

export default class ClienteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS cliente(
                    cli_id VARCHAR(36) NOT NULL DEFAULT (UUID()),
                    cli_nome VARCHAR(255) NOT NULL,
                    cpf VARCHAR(14) NOT NULL UNIQUE,
                    cep VARCHAR(11) NOT NULL,
                    endereco VARCHAR(255),
                    numero INT NOT NULL,
                    telefone VARCHAR(14),
                    usuario INT,

                    CONSTRAINT pk_cliente PRIMARY KEY(cli_id),
                    CONSTRAINT fk_usuario FOREIGN KEY (usuario) REFERENCES usuario (id)
                    )
            `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO cliente (cli_nome, cpf, cep, endereco, numero, telefone, usuario)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            let parametros = [];
            parametros = [
                cliente.nome,
                cliente.cpf,
                cliente.cep,
                cliente.endereco,
                cliente.numero,
                cliente.telefone
            ];
            if (cliente.usuario instanceof Usuario)
                parametros.push(cliente.usuario.id)
            else parametros.push(null);

            const resultado = await conexao.execute(sql, parametros);
            cliente.id = resultado[0].insertId;
            await conexao.release();
        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cli_id = ?`;
            let parametros = [cliente.id];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `UPDATE cliente SET cli_nome=?, cpf=?, cep=?, endereco=?, numero=?, telefone=?, usuario=?
                WHERE cli_id = ?
            `;
            let parametros = [
                cliente.nome,
                cliente.cpf,
                cliente.cep,
                cliente.endereco,
                cliente.numero,
                cliente.telefone,
                cliente.usuario.id,
                cliente.id
            ];
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        const sql = `SELECT * FROM cliente c
            LEFT JOIN usuario u ON c.usuario = u.id
            LEFT JOIN privilegio p ON u.privilegio = p.codigo
            WHERE c.cli_nome LIKE ?`;
        const parametros = [`%${termo}%`];
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const linha of linhas) {
            const privilegio = new Privilegio(linha['codigo'], linha['descricao']);
            const usuario = new Usuario(
                linha['id'],
                linha['username'],
                linha['senha'],
                linha['nome'],
                linha['email'],
                privilegio
            );
            const cliente = new Cliente(
                linha['cli_id'],
                linha['cli_nome'],
                linha['cpf'],
                linha['cep'],
                linha['endereco'],
                linha['numero'],
                linha['telefone'],
                usuario
            )
            listaClientes.push(cliente);
        }
        await conexao.release();
        return listaClientes;
    }
}