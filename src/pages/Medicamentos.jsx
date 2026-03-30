import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "20px",
    maxWidth: "600px",
    width: "100%",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#222",
    fontWeight: "600",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "15px",
  },
  label: {
    fontWeight: "500",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#f3f4f6",
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: "12px",
  },
  navButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
};

export default function Medicamentos() {
  const [meds, setMeds] = useState([]);
  const [nome, setNome] = useState("");
  const [fabricacao, setFabricacao] = useState("");
  const [validade, setValidade] = useState("");
  const [lote, setLote] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("meds")) || [];
    setMeds(data);
  }, []);

  const cadastrar = () => {
    if (!nome || !fabricacao || !validade || !lote || !quantidade) {
      alert("Preencha todos os campos!");
      return;
    }

    const newMed = {
      id: meds.length + 1,
      nome,
      fabricacao,
      validade,
      lote,
      quantidade: Number(quantidade),
    };

    const updated = [...meds, newMed];
    setMeds(updated);
    localStorage.setItem("meds", JSON.stringify(updated));

    setNome("");
    setFabricacao("");
    setValidade("");
    setLote("");
    setQuantidade("");
  };

  const excluir = (id) => {
    const updated = meds.filter((m) => m.id !== id);
    setMeds(updated);
    localStorage.setItem("meds", JSON.stringify(updated));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Cadastro de Medicamentos</h1>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Nome do Medicamento</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Ex: Dipirona"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label style={styles.label}>Data de Fabricação</label>
          <input
            style={styles.input}
            type="date"
            value={fabricacao}
            onChange={(e) => setFabricacao(e.target.value)}
          />

          <label style={styles.label}>Data de Validade</label>
          <input
            style={styles.input}
            type="date"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
          />

          <label style={styles.label}>Lote</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Ex: L12345"
            value={lote}
            onChange={(e) => setLote(e.target.value)}
          />

          <label style={styles.label}>Quantidade</label>
          <input
            style={styles.input}
            type="number"
            placeholder="Ex: 50"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </div>

        <button onClick={cadastrar} style={styles.button}>
          Cadastrar
        </button>
      </div>

      <div style={styles.card}>
        <h2 style={{ ...styles.title, fontSize: "22px" }}>Medicamentos Cadastrados</h2>
        {meds.length === 0 ? (
          <p>Nenhum medicamento cadastrado.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Fabricação</th>
                <th style={styles.th}>Validade</th>
                <th style={styles.th}>Lote</th>
                <th style={styles.th}>Qtd</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {meds.map((m) => (
                <tr key={m.id}>
                  <td style={styles.td}>{m.id}</td>
                  <td style={styles.td}>{m.nome}</td>
                  <td style={styles.td}>{m.fabricacao}</td>
                  <td style={styles.td}>{m.validade}</td>
                  <td style={styles.td}>{m.lote}</td>
                  <td style={styles.td}>{m.quantidade}</td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, backgroundColor: "#ef4444" }}
                      onClick={() => excluir(m.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={styles.navButtons}>
        <button style={styles.button} onClick={() => navigate("/")}>
          Dashboard
        </button>
        <button style={styles.button} onClick={() => navigate("/retirada")}>
          Retirada
        </button>
      </div>
    </div>
  );
}