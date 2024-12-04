import { Router } from "express";
import PrivilegioCtrl from "../Controle/privilegioCtrl.js";

const pCtrl = new PrivilegioCtrl();
const rotaPrivilegio = Router();

rotaPrivilegio.post("/", pCtrl.gravar);
rotaPrivilegio.put("/:codigo", pCtrl.editar);
rotaPrivilegio.patch("/:codigo", pCtrl.editar);
rotaPrivilegio.delete("/:codigo", pCtrl.excluir);
rotaPrivilegio.get("/:codigo", pCtrl.consultar);
rotaPrivilegio.get("/",pCtrl.consultar);

export default rotaPrivilegio;