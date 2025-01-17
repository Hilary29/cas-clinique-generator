import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const connectDB = async () => {
  return await mysql.createConnection({
    host: "localhost", // Remplace par l'hôte de ta base de données
    user: "root", // Remplace par ton utilisateur MySQL
    password: "", // Remplace par ton mot de passe MySQL
    database: "your_database", // Remplace par ton nom de base de données
  });
};

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Vérifier si l'email est déjà utilisé
    const connection = await connectDB();
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((rows as any).length > 0) {
      return new Response("Email already registered", { status: 400 });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données
    await connection.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    await connection.end();
    return new Response("User registered successfully", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred. Please try again.", { status: 500 });
  }
}
