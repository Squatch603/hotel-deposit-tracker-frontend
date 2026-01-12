import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [deposits, setDeposits] = useState([]);
  const [form, setForm] = useState({
    hotel_name: "",
    city: "",
    check_in: "",
    check_out: "",
    deposit_amount: "",
    release_days: ""
  });

  // 🔹 LOAD deposits from backend
  useEffect(() => {
    fetch(`${API_URL}/deposits/`)
      .then(res => res.json())
      .then(data => setDeposits(data))
      .catch(err => console.error("Failed to load deposits:", err));
  }, []);

  // 🔹 Handle form submit
  const addDeposit = async () => {
    await fetch(`${API_URL}/deposits/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        deposit_amount: Number(form.deposit_amount),
        release_days: Number(form.release_days)
      })
    });

    // Reload list after save
    const res = await fetch(`${API_URL}/deposits/`);
    setDeposits(await res.json());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hotel Deposit Tracker</h1>

      <input placeholder="Hotel name"
        onChange={e => setForm({ ...form, hotel_name: e.target.value })} />
      <input placeholder="City"
        onChange={e => setForm({ ...form, city: e.target.value })} />
      <input type="date"
        onChange={e => setForm({ ...form, check_in: e.target.value })} />
      <input type="date"
        onChange={e => setForm({ ...form, check_out: e.target.value })} />
      <input placeholder="Deposit amount"
        onChange={e => setForm({ ...form, deposit_amount: e.target.value })} />
      <input placeholder="Release days"
        onChange={e => setForm({ ...form, release_days: e.target.value })} />

      <button onClick={addDeposit}>Add Deposit</button>

      <h2>Tracked Deposits</h2>

      {deposits.map(d => (
        <div key={d.id} style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
          <strong>{d.hotel_name}</strong> — {d.city}<br />
          Deposit: ${d.deposit_amount}<br />
          Status: {d.status}
        </div>
      ))}
    </div>
  );
}

export default App;
