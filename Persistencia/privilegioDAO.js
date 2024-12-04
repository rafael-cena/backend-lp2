import Privilegio from "../Modelo/privilegio.js";
import conectar from "./Conexao.js";

export default class PrivilegioDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS privilegio (
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

    async gravar(privilegio) {
        if (privilegio instanceof Privilegio) {
            const conexao = await conectar();
            const sql = `INSERT INTO privilegio(descricao)
            values(?)`;
            let parametros = [privilegio.descricao];
            const resultado = await conexao.execute(sql, parametros);
            privilegio.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async editar(privilegio) {
        if (privilegio instanceof Privilegio) {
            const conexao = await conectar();
            const sql = `UPDATE privilegio SET descricao=? WHERE codigo=?`;
            let parametros = [privilegio.descricao, privilegio.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(privilegio) {
        if (privilegio instanceof Privilegio) {
            const conexao = await conectar();
            const sql = `DELETE FROM privilegio WHERE codigo = ?`;
            let parametros = [privilegio.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        let sql="";
        let parametros=[];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM privilegio WHERE descricao LIKE ? ORDER BY descricao`;
            parametros.push('%'+termo+'%');
        }
        else {
            sql = `SELECT * FROM privilegio WHERE codigo = ? ORDER BY descricao`;
            parametros.push(termo);
        }
        const conexao = await conectar();
        
        const [registros, campos] = await conexao.query(sql, parametros);
        let listaPrivilegios = [];
        for (const registro of registros) {
            const privilegio = new Privilegio(
                registro['codigo'],
                registro['descricao']
            );
            listaPrivilegios.push(privilegio);
        }
        await conexao.release();
        return listaPrivilegios;
    }
}