export default function ProductList() {
  const products = [
    { id: 1, name: 'Product 1', price: '$10' },
    { id: 2, name: 'Product 2', price: '$20' },
    { id: 3, name: 'Product 3', price: '$30' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-4">
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-lg">{product.name}</h3>
              <p>{product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
