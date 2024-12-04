import { Router } from "express";
import UsuarioCtrl from "../Controle/usuarioCtrl.js";

const uCtrl = new UsuarioCtrl();
const rotaUsuario = Router();

rotaUsuario.post("/", uCtrl.gravar);
rotaUsuario.put("/:codigo", uCtrl.editar);
rotaUsuario.patch("/:codigo", uCtrl.editar);
rotaUsuario.delete("/:codigo", uCtrl.excluir);
rotaUsuario.get("/:codigo", uCtrl.consultar);
rotaUsuario.get("/",uCtrl.consultar);
rotaUsuario.post('/verificarSenha', uCtrl.autLogin);

export default rotaUsuario;