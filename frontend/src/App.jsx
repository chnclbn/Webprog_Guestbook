import React, { useEffect, useState } from 'react';
import { guestbookApi } from './api';
import { Trash2, Edit3, Send } from 'lucide-react';

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await guestbookApi.getAll();
      setEntries(res.data);
    } catch (err) {
      console.error("Failed to fetch", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    await guestbookApi.create(form);
    setForm({ name: '', message: '' });
    fetchEntries();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this entry?")) {
      await guestbookApi.delete(id);
      fetchEntries();
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>My Personal Profile</h1>
        <p>Full Stack Project: NestJS + React + Supabase</p>
      </header>

      <main id="guestbook" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
        <h2>Guestbook</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ padding: '10px' }}
          />
          <textarea
            placeholder="Leave a message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            style={{ padding: '10px', minHeight: '80px' }}
          />
          <button type="submit" style={{ padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Send size={18} /> Post Message
          </button>
        </form>

        <div style={{ marginTop: '30px' }}>
          {loading ? <p>Loading messages...</p> : entries.map((entry) => (
            <div key={entry.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{entry.name}</strong>
                <p>{entry.message}</p>
              </div>
              <button onClick={() => handleDelete(entry.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;