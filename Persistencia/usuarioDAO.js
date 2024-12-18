import Privilegio from "../Modelo/privilegio.js";
import Usuario from "../Modelo/usuario.js";
import conectar from "./Conexao.js";
import bcrypt from 'bcrypt';

const saltRounds = 10;

export default class UsuarioDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS usuario(
                    id INT NOT NULL AUTO_INCREMENT,
                    username VARCHAR(100) NOT NULL,
                    senha VARCHAR(255) NOT NULL,
                    nome VARCHAR(100),
                    email VARCHAR(255),
                    privilegio INT NOT NULL,

                    CONSTRAINT pk_usuario PRIMARY KEY(id),
                    CONSTRAINT fk_privilegio FOREIGN KEY(privilegio) REFERENCES privilegio (codigo)
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const senha = await bcrypt.hash(usuario.senha, saltRounds);
            const sql = `
                INSERT INTO usuario (username, senha, nome, email, privilegio)
                VALUES (?, ?, ?, ?, ?)
            `;
            let parametros = [
                usuario.username,
                senha,
                usuario.nome,
                usuario.email,
                usuario.privilegio.codigo
            ];

            const resultado = await conexao.execute(sql, parametros);
            usuario.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE id = ?`;
            let parametros = [usuario.id];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const senha = await bcrypt.hash(usuario.senha, saltRounds);
            const sql = `UPDATE usuario SET username=?, senha=?, nome=?, email=?, privilegio=?
                WHERE id = ?
            `;
            let parametros = [
                usuario.username,
                senha,
                usuario.nome,
                usuario.email,
                usuario.privilegio.codigo,
                usuario.id
            ];
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        const sql = `SELECT * FROM usuario u
                INNER JOIN privilegio p ON p.codigo = u.privilegio
                ORDER BY u.username`;
        const [linhas, campos] = await conexao.execute(sql);
        let listaUsuarios = [];
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
            listaUsuarios.push(usuario);
        }
        await conexao.release();
        return listaUsuarios;
    }

    async autLogin(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = "SELECT * FROM usuario WHERE username = ?";
            const parametros = [usuario.username];
            const [linhas, campos] = await conexao.execute(sql, parametros);
            if (linhas.length === 0) return false;
            const senhaHash = linhas[0].senha;
            await conexao.release();
            return await bcrypt.compare(usuario.senha, senhaHash);
        }
    }
}