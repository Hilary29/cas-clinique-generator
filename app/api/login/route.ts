import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const connectDB = async () => {
  return await mysql.createConnection({
    host: "localhost", // Remplace par l'hôte de ta base de données
    user: "root", // Remplace par ton utilisateur MySQL
    password: "", // Remplace par ton mot de passe MySQL
    database: "your_database", // Remplace par le nom de ta base de données
  });
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response("Email and password are required", { status: 400 });
    }

    const connection = await connectDB();
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((rows as any).length === 0) {
      return new Response("Invalid credentials", { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (rows as any)[0];

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response("Invalid credentials", { status: 401 });
    }

    // Création du token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET || "secret_key", // Utilise une clé secrète dans un fichier .env
      { expiresIn: "1h" } // Le token expire dans 1 heure
    );

    await connection.end();
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);
    return new Response("An error occurred. Please try again.", { status: 500 });
  }
}
