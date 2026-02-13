import React, { useEffect, useState } from 'react';
import { guestbookApi } from './api';
import { Trash2, Edit3, Send, User, MessageSquare } from 'lucide-react'; 

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
      setEntries(res.data || []);
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
  const handleUpdate = async (id, currentMessage) => {
    const newMessage = prompt("Edit your message:", currentMessage);
    if (newMessage && newMessage !== currentMessage) {
      await guestbookApi.update(id, { message: newMessage });
      fetchEntries();
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px', padding: '20px', backgroundColor: '#e4abc7', borderRadius: '12px' }}>
        <h1>My Personal Profile and GuestBook</h1>
        <p>WEBPROG React, Nest.js supabase app Individual </p>
      </header>

      <main style={{ border: '1px solid #cf22b8', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
         Guestbook Message
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          <input
            placeholder="Please Input Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cf22b8' }}
          />
          <textarea
            placeholder="Please Leave a message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cf22b8', minHeight: '100px' }}
          />
          <button type="submit" style={{ padding: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#f7b0d7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
            <Send size={18} /> Post Message
          </button>
        </form>

        <div style={{ marginTop: '40px' }}>
          <h3>Recent Messages</h3>
          {loading ? <p>Loading messages...</p> : entries.map((entry) => (
            <div key={entry.id} style={{ borderBottom: '1px solid #cf22b8', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <strong style={{ fontSize: '1.1rem' }}>{entry.name}</strong>
                <p style={{ margin: '5px 0', color: '#555' }}>{entry.message}</p>
                <small style={{ color: '#e79ac7' }}>{new Date(entry.created_at).toLocaleDateString()}</small>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleUpdate(entry.id, entry.message)} style={{ color: '#cf22b8', border: 'none', background: 'none', cursor: 'pointer', padding: '5px' }}>
                  <Edit3 size={20} />
                </button>
                <button onClick={() => handleDelete(entry.id)} style={{ color: '#e29bcd', border: 'none', background: 'none', cursor: 'pointer', padding: '5px' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;