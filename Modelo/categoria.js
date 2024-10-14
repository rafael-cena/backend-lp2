import CategoriaDAO from "../Persistencia/categoriaDAO.js";

export default class Categoria {
    #codigo;
    #descricao;

    get codigo () {
        return this.#codigo;
    }
    set codigo (nc) {
        this.#codigo = nc;
    }

    get descricao () {
        return this.#descricao;
    }
    set descricao (nd) {
        this.#descricao = nd;
    }

    constructor (codigo, descricao) {
        this.#codigo = codigo;
        this.#descricao = descricao;
    }

    toJSON(){
        return {
            "codigo":this.#codigo,
            "descricao":this.#descricao
        };
    }

    async gravar () {
        const catDAO = new CategoriaDAO();
        await catDAO.gravar(this);
    }

    async editar () {
        const catDAO = new CategoriaDAO();
        await catDAO.editar(this);
    }

    async excluir () {
        const catDAO = new CategoriaDAO();
        await catDAO.excluir(this);
    }

    async consultar () {
        const catDAO = new CategoriaDAO();
        return await catDAO.consultar();
    }
}