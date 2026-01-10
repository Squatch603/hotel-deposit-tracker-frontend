import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export default function App() {
  const [deposits, setDeposits] = useState([])
  const [form, setForm] = useState({
    hotel_name: '',
    city: '',
    check_in: '',
    check_out: '',
    deposit_amount: '',
    release_days: ''
  })

  useEffect(() => {
    fetch(API_URL + '/deposits/')
      .then(res => res.json())
      .then(setDeposits)
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    await fetch(API_URL + '/deposits/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        deposit_amount: Number(form.deposit_amount),
        release_days: Number(form.release_days)
      })
    })
    setForm({ hotel_name:'', city:'', check_in:'', check_out:'', deposit_amount:'', release_days:'' })
    const data = await fetch(API_URL + '/deposits/').then(r => r.json())
    setDeposits(data)
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Hotel Deposit Tracker</h1>

      <form onSubmit={submit} style={{ marginBottom: 30 }}>
        <input placeholder="Hotel name" value={form.hotel_name} onChange={e=>setForm({...form, hotel_name:e.target.value})} required /><br/>
        <input placeholder="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} /><br/>
        <input type="date" value={form.check_in} onChange={e=>setForm({...form, check_in:e.target.value})} required /><br/>
        <input type="date" value={form.check_out} onChange={e=>setForm({...form, check_out:e.target.value})} required /><br/>
        <input placeholder="Deposit amount" value={form.deposit_amount} onChange={e=>setForm({...form, deposit_amount:e.target.value})} required /><br/>
        <input placeholder="Release days" value={form.release_days} onChange={e=>setForm({...form, release_days:e.target.value})} required /><br/>
        <button type="submit">Add Deposit</button>
      </form>

      <h2>Tracked Deposits</h2>
      <ul>
        {deposits.map(d => (
          <li key={d.id}>
            {d.hotel_name} – ${d.deposit_amount} – {d.status}
          </li>
        ))}
      </ul>
    </div>
  )
}
