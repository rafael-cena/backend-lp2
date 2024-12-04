import ClienteDAO from "../Persistencia/clienteDAO.js";
import Usuario from "./usuario.js";

export default class Cliente {
    #id;
    #nome;
    #cpf;
    #cep;
    #endereco;
    #numero;
    #telefone;
    #usuario;

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

    get cpf() {
        return this.#cpf;
    }
    set cpf(novo) {
        this.#cpf = novo;
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

    get usuario() {
        return this.#usuario;
    }
    set usuario(novo) {
        if (novo instanceof Usuario)
            this.#usuario = novo;
    }

    constructor(id="", nome="", cpf="", cep="", endereco="", numero=0, telefone="", usuario={}) {
        this.#id=id;
        this.#nome=nome;
        this.#cpf=cpf;
        this.#cep=cep;
        this.#endereco=endereco;
        this.#numero=numero;
        this.#telefone=telefone;
        this.#usuario=usuario;
    }

    toJSON() {
        return {
            "id": this.#id,
            "nome": this.#nome,
            "cpf": this.#cpf,
            "cep": this.#cep,
            "endereco": this.#endereco,
            "numero": this.#numero,
            "telefone": this.#telefone,
            "usuario": this.#usuario
        }
    }

    async incluir() {
        const cliDAO = new ClienteDAO();
        await cliDAO.incluir(this);
    }
    
    async excluir() {
        const cliDAO = new ClienteDAO();
        await cliDAO.excluir(this);
    }
    
    async alterar() {
        const cliDAO = new ClienteDAO();
        await cliDAO.alterar(this);
    }
    
    async consultar(termo) {
        const cliDAO = new ClienteDAO();
        return await cliDAO.consultar(termo);
    }
}