import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: 400,
    margin: "80px auto",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
  logoutBtn: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #2563eb",
    backgroundColor: "white",
    color: "#2563eb",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
};

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userLogado");
    if (user) setLogado(true);
  }, []);

  const login = () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    // Login simulado: aceita qualquer email/senha que não estejam vazios
    localStorage.setItem("userLogado", JSON.stringify({ email }));
    setLogado(true);
    setError("");
    navigate("/medicamentos"); // redireciona após login
  };

  const logout = () => {
    localStorage.removeItem("userLogado");
    setLogado(false);
    setEmail("");
    setSenha("");
    navigate("/");
  };

  if (logado) {
    return (
      <div style={styles.container}>
        <h2>Bem-vindo(a), {JSON.parse(localStorage.getItem("userLogado")).email}</h2>
        <button onClick={logout} style={styles.logoutBtn}>
          Sair
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <div style={styles.error}>{error}</div>}
      <input
        style={styles.input}
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={login} style={styles.button}>
        Entrar
      </button>
    </div>
  );
}