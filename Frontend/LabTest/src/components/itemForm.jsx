import { useState } from 'react';
import { createItem } from '../api';


export default function ItemForm({ onItemAdded }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createItem({ name, description, price: Number(price) });
            setName('');
            setDescription('');
            setPrice('');
            onItemAdded();
        } catch (err) {
            console.error('Failed to create item', err);
        }
    };
    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h2>Add New Item</h2>
        <div>
        <input
            placeholder="Item name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
        />
        </div>
        <div>
        <input
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
        />
        </div>

        <div>
        <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            min="0"
            step="0.01"
            required
        />
        </div>

        <button type="submit">Add Item</button>
        </form>
    );
    }