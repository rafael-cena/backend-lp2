import Categoria from "../Modelo/categoria.js";
import conectar from "./Conexao.js";

export default class CategoriaDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS categoria (
                    codigo INT NOT NULL AUTO_INCREMENT,
                    descricao VARCHAR(50) NOT NULL,
                    CONSTRAINT pk_codigo PRIMARY KEY(codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const sql = `INSERT INTO categoria(descricao)
            values(?)`;
            let parametros = [categoria.descricao];
            const resultado = await conexao.execute(sql, parametros);
            categoria.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async editar(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const sql = `UPDATE categoria SET descricao=? WHERE codigo=?`;
            let parametros = [categoria.descricao, categoria.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const sql = `DELETE FROM categoria WHERE codigo = ?`;
            let parametros = [categoria.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = `SELECT * FROM categoria ORDER BY descricao`;
        const [registros, campos] = await conexao.query(sql);
        let listaCategorias = [];
        for (const registro of registros) {
            const categoria = new Categoria(
                registro['codigo'],
                registro['descricao']
            );
            listaCategorias.push(categoria);
        }
        return listaCategorias;
    }
}