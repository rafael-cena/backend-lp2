import Produto from "./produto.js";
import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    #id;
    #nome;
    #cnpj;
    #cep;
    #endereco;
    #numero;
    #telefone;
    #produto;

    get id() {
        return this.#id;
    }
    set id(novo) {
        this.#id = novo;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novo) {
        this.#nome = novo;
    }

    get cnpj() {
        return this.#cnpj;
    }
    set cnpj(novo) {
        this.#cnpj = novo;
    }

    get cep() {
        return this.#cep;
    }
    set cep(novo) {
        this.#cep = novo;
    }

    get endereco() {
        return this.#endereco;
    }
    set endereco(novo) {
        this.#endereco = novo;
    }

    get numero() {
        return this.#numero;
    }
    set numero(novo) {
        this.#numero = novo;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(novo) {
        this.#telefone = novo;
    }

    get produto() {
        return this.#produto;
    }
    set produto(novo) {
        if (novo instanceof Produto)
            this.#produto = novo;
    }

    constructor(id = 0, nome = "", cnpj = "", cep = "", endereco = "", numero = 0, telefone = "", produto = {}) {
        this.#id = id;
        this.#nome = nome;
        this.#cnpj = cnpj;
        this.#cep = cep;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#telefone = telefone;
        this.#produto = produto;
    }

    toJSON() {
        return {
            "id": this.#id,
            "nome": this.#nome,
            "cnpj": this.#cnpj,
            "cep": this.#cep,
            "endereco": this.#endereco,
            "numero": this.#numero,
            "telefone": this.#telefone,
            "produto": this.#produto
        }
    }

    async incluir() {
        const fornDAO = new FornecedorDAO();
        await fornDAO.incluir(this);
    }

    async consultar(termo) {
        const fornDAO = new FornecedorDAO();
        return await fornDAO.consultar(termo);
    }

    async excluir() {
        const fornDAO = new FornecedorDAO();
        await fornDAO.excluir(this);
    }

    async alterar() {
        const fornDAO = new FornecedorDAO();
        await fornDAO.alterar(this);
    }
}