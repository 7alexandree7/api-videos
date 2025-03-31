import postgres from "postgres";
import "dotenv/config";

// Verifica se DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL não está definida no ambiente.");
}

// Cria a conexão SQL com SSL ativado
export const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });


