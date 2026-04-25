import { useEffect, useState } from 'react';
import { getItems } from './api';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      return res.data;
    } catch (err) {
      console.error('Failed to fetch items', err);
      return [];
    }
  };

  const refreshItems = async () => {
    const data = await fetchItems();
    setItems(data);
  };

  useEffect(() => {
    let isMounted = true;

    fetchItems().then((data) => {
      if (isMounted) {
        setItems(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Item Manager</h1>
      <ItemForm onItemAdded={refreshItems} />
      <ItemList items={items} onRefresh={refreshItems} />
    </div>
  );
}
export default App;