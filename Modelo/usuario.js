import UsuarioDAO from "../Persistencia/usuarioDAO.js";
import Privilegio from "./privilegio.js";

export default class Usuario {
    #id;
    #username;
    #senha;
    #nome;
    #email;
    #privilegio;

    get id() {
        return this.#id;
    }
    set id(novo) {
        this.#id = novo;
    }

    get username() {
        return this.#username;
    }
    set username(novo) {
        this.#username = novo;
    }

    get senha() {
        return this.#senha;
    }
    set senha(novo) {
        this.#senha = novo;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novo) {
        this.#nome = novo;
    }

    get email() {
        return this.#email;
    }
    set email(novo) {
        this.#email = novo;
    }

    get privilegio() {
        return this.#privilegio;
    }
    set privilegio(novo) {
        if (novo instanceof Privilegio)
            this.#privilegio = novo;
    }

    constructor(id = 0, username = '', senha = '', nome = '', email = '', privilegio = {}) {
        this.#id = id;
        this.#username = username;
        this.#senha = senha;
        this.#nome = nome;
        this.#email = email;
        this.#privilegio = privilegio;
    }

    toJSON() {
        return {
            "id": this.#id,
            "username": this.#username,
            "senha": this.#senha,
            "nome": this.#nome,
            "email": this.#email,
            "privilegio": this.#privilegio
        }
    }

    async incluir() {
        const userDAO = new UsuarioDAO();
        await userDAO.incluir(this);
    }
    
    async excluir() {
        const userDAO = new UsuarioDAO();
        await userDAO.excluir(this);
    }
    
    async alterar() {
        const userDAO = new UsuarioDAO();
        await userDAO.alterar(this);
    }
    
    async consultar(termo) {
        const userDAO = new UsuarioDAO();
        return await userDAO.consultar(termo);
    }

    async autLogin() {
        const userDAO = new UsuarioDAO();
        return await userDAO.autLogin(this);
    }
}