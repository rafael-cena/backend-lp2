import { Router } from "express";
import ClienteCtrl from "../Controle/clienteCtrl.js";

const cCtrl = new ClienteCtrl();
const rotaUsuario = Router();

rotaUsuario.post("/", cCtrl.incluir);
rotaUsuario.put("/:id", cCtrl.alterar);
rotaUsuario.patch("/:id", cCtrl.alterar);
rotaUsuario.delete("/:id", cCtrl.excluir);
rotaUsuario.get("/:nome", cCtrl.consultar);
rotaUsuario.get("/",cCtrl.consultar);

export default rotaUsuario;