import Categoria from "../Modelo/categoria.js";
import Produto from "../Modelo/produto.js";
import Fornecedor from "../Modelo/fornecedor.js";
import conectar from "./Conexao.js";

export default class FornecedorDAO {
    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); 
            const sql = `
            CREATE TABLE IF NOT EXISTS fornecedor(
                forn_id INT NOT NULL AUTO_INCREMENT,
                forn_nome VARCHAR(255) NOT NULL,
                cnpj VARCHAR(15) NOT NULL UNIQUE,
                forn_cep VARCHAR(11) NOT NULL,
                forn_endereco VARCHAR(255) NOT NULL,
                forn_numero INT NOT NULL,
                forn_telefone VARCHAR(14) NOT NULL,
                produto INT NOT NULL,

                CONSTRAINT pk_forn PRIMARY KEY(forn_id),
                CONSTRAINT fk_prod FOREIGN KEY(produto) REFERENCES produto(prod_codigo)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `INSERT INTO fornecedor(forn_nome, cnpj, forn_cep, forn_endereco, forn_numero, forn_telefone, produto)
                values(?, ?, ?, ?, ?, ?, ?)
            `;
            let parametros = [
                fornecedor.nome, 
                fornecedor.cnpj, fornecedor.cep, 
                fornecedor.endereco, 
                fornecedor.numero, 
                fornecedor.telefone, 
                fornecedor.produto.codigo
            ];
            const resultado = await conexao.execute(sql, parametros);
            fornecedor.id = resultado[0].insertId;
            await conexao.release();
        }
    }
    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `UPDATE fornecedor SET forn_nome=?, cnpj=?, forn_cep=?, forn_endereco=?, forn_numero=?, forn_telefone=?, produto=?
                WHERE forn_id = ?
            `;
            let parametros = [
                fornecedor.nome, 
                fornecedor.cnpj, fornecedor.cep, 
                fornecedor.endereco, 
                fornecedor.numero, 
                fornecedor.telefone, 
                fornecedor.produto.codigo,
                fornecedor.id
            ];
            await conexao.execute(sql, parametros);
            await conexao.release(); 
        }
    }
    async consultar(termo) {        
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM fornecedor f 
                   INNER JOIN produto p ON f.produto = p.prod_codigo
                   INNER JOIN categoria c ON p.fk_codigo_cat = c.codigo
                   WHERE forn_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM fornecedor f 
                   INNER JOIN produto p ON f.produto = p.prod_codigo
                   INNER JOIN categoria c ON p.fk_codigo_cat = c.codigo
                   WHERE forn_id = ?`;
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaFornecedores = [];
        for (const linha of linhas) {
            const categoria = new Categoria(linha['codigo'], linha['descricao']);
            const produto = new Produto(
                linha['prod_codigo'],
                linha['prod_descricao'],
                linha['prod_precoCusto'],
                linha['prod_precoVenda'],
                linha['prod_qtdEstoque'],
                linha['prod_urlImagem'],
                linha['prod_dataValidade'],
                categoria
            );
            const fornecedor = new Fornecedor(
                linha['forn_id'],
                linha['forn_nome'],
                linha['cnpj'],
                linha['forn_cep'],
                linha['forn_endereco'],
                linha['forn_numero'],
                linha['forn_telefone'],
                produto
            )
            listaFornecedores.push(fornecedor);
        }
        await conexao.release();
        return listaFornecedores;
    }
    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `DELETE FROM fornecedor WHERE forn_id = ?`;
            let parametros = [
                fornecedor.id
            ]; 
            await conexao.execute(sql, parametros);
            await conexao.release(); 
        }
    }
}