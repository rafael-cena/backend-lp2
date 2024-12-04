import { Router } from "express";
import FornecedorCtrl from "../Controle/fornecedorCtrl.js";

const fCtrl = new FornecedorCtrl();
const rotaFornecedor = Router();

rotaFornecedor.post("/", fCtrl.gravar);
rotaFornecedor.put("/:id", fCtrl.editar);
rotaFornecedor.patch("/:id", fCtrl.editar);
rotaFornecedor.delete("/:id", fCtrl.excluir);
rotaFornecedor.get("/:codigo", fCtrl.consultar);
rotaFornecedor.get("/",fCtrl.consultar);

export default rotaFornecedor;