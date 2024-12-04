import PrivilegioDAO from "../Persistencia/privilegioDAO.js";

export default class Privilegio {
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
        const pDAO = new PrivilegioDAO();
        await pDAO.gravar(this);
    }

    async editar () {
        const pDAO = new PrivilegioDAO();
        await pDAO.editar(this);
    }

    async excluir () {
        const pDAO = new PrivilegioDAO();
        await pDAO.excluir(this);
    }

    async consultar (termo) {
        const pDAO = new PrivilegioDAO();
        return await pDAO.consultar(termo);
    }
}