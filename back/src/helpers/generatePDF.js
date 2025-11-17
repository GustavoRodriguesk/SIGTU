import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import fs from "fs";
import os from "os";
import path from "path";

// Cria o PDF
const doc = new jsPDF();

doc.text("Lista de Alunos", 10, 10);

autoTable(doc, {
  head: [["Aluno", "Linha", "Faculdade"]],
  body: [
    ["João Silva", "Linha 12", "PUC"],
    ["Maria Souza", "Linha 04", "UFPR"],
  ],
});

// Caminho para a pasta Documents do usuário
const documentsPath = path.join(os.homedir(), "Documents", "alunos.pdf");

// Salva o PDF usando Node.js
fs.writeFileSync(documentsPath, doc.output());
console.log("PDF salvo em:", documentsPath);
