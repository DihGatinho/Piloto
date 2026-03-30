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
  select: {
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
  infoBox: {
    backgroundColor: "#f3f4f6",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "15px",
  },
  navButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  message: {
    marginBottom: "15px",
    fontWeight: "500",
  },
};

export default function Retirada() {
  const [meds, setMeds] = useState([]);
  const [nome, setNome] = useState("");
  const [selectedMed, setSelectedMed] = useState(null);
  const [selectedLote, setSelectedLote] = useState("");
  const [quantidadeRetirar, setQuantidadeRetirar] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("meds")) || [];
    setMeds(data);
  }, []);

  // Atualiza informações ao digitar o nome
  useEffect(() => {
    const med = meds.find((m) => m.nome.toLowerCase() === nome.toLowerCase());
    if (med) {
      setSelectedMed(med);
      setSelectedLote(med.lote);
      setQuantidadeRetirar("");
      setMessage("");
    } else {
      setSelectedMed(null);
      setSelectedLote("");
    }
  }, [nome, meds]);

  const retirar = () => {
    if (!selectedMed || !selectedLote || !quantidadeRetirar) {
      setMessage("Preencha todos os campos corretamente!");
      return;
    }

    if (quantidadeRetirar > selectedMed.quantidade) {
      setMessage("Quantidade insuficiente em estoque!");
      return;
    }

    const updatedMeds = meds.map((m) => {
      if (m.id === selectedMed.id) {
        return { ...m, quantidade: m.quantidade - Number(quantidadeRetirar) };
      }
      return m;
    });

    setMeds(updatedMeds);
    localStorage.setItem("meds", JSON.stringify(updatedMeds));

    setMessage(`Retirada de ${quantidadeRetirar} unidade(s) realizada com sucesso!`);
    setQuantidadeRetirar("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Retirada de Medicamentos</h1>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Nome do Medicamento</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Digite o nome do medicamento"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        {selectedMed && (
          <div style={styles.infoBox}>
            <p><strong>Nome:</strong> {selectedMed.nome}</p>
            <p><strong>Fabricação:</strong> {selectedMed.fabricacao}</p>
            <p><strong>Validade:</strong> {selectedMed.validade}</p>
            <p><strong>Lote:</strong> {selectedMed.lote}</p>
            <p><strong>Quantidade disponível:</strong> {selectedMed.quantidade}</p>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Lote</label>
              <select
                style={styles.select}
                value={selectedLote}
                onChange={(e) => setSelectedLote(e.target.value)}
              >
                <option value={selectedMed.lote}>{selectedMed.lote}</option>
                {/* Aqui poderia adicionar mais lotes se existissem */}
              </select>

              <label style={styles.label}>Quantidade a retirar</label>
              <input
                style={styles.input}
                type="number"
                min="1"
                max={selectedMed.quantidade}
                value={quantidadeRetirar}
                onChange={(e) => setQuantidadeRetirar(e.target.value)}
              />

              <button style={styles.button} onClick={retirar}>
                Retirar
              </button>
            </div>

            {message && <p style={styles.message}>{message}</p>}
          </div>
        )}
      </div>

      <div style={styles.navButtons}>
        <button style={styles.button} onClick={() => navigate("/")}>
          Dashboard
        </button>
        <button style={styles.button} onClick={() => navigate("/medicamentos")}>
          Medicamentos
        </button>
      </div>
    </div>
  );
}