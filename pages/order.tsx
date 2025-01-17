import { useAuth } from '@/app/core/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UseFetch from '@/app/core/Fetch';
import { Order } from '@/app/types/order';

export default function Orders() {
  const { user } = useAuth();
  const router = useRouter();
  const { getData, error } = UseFetch();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [fulfilled, setFulfilled] = useState<Order[] | null>(null);
  const [activeTab, setActiveTab] = useState('PENDING');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/signin');
    }
  }, [user, router]);

  useEffect(() => {
    const getOrder = async () => {
      const res = await getData(`users/${user?.phone}/orders`);
      if (!error) setOrders(res);
    };
    const getFulfilledOrders = async () => {
      const res = await getData(`admin/orders/fulfilled`);

      if (!error) setFulfilled(res?.filter((item: { user: string | undefined; }) => item.user === user?.phone));
      console.log(fulfilled);
      
    };
    getOrder();
    getFulfilledOrders();
  }, [getData, user?.phone, error]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const renderOrders = (orders: Order[] | null) => (
    orders?.map(order => (
      <li key={order.orderId} className="mb-4">
        <div className="p-4 bg-white text-black shadow rounded-lg flex justify-between items-center">
          <div>
            <h3 className="text-lg">{order.item}</h3>
            <p>Price: {order.price}</p>
            <p>Quantity: {order.quantity}</p>
          </div>
          <button
            className="p-1 bg-green-200 flex justify-end"
            onClick={() => handleViewOrder(order)}
          >
            View Order
          </button>
        </div>
      </li>
    ))
  );

  const toaster = setTimeout(() => (<>Your Order has been placed. You will be contacted soon</>), 1000);
  

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Your Orders</h2>
      <div className="tabs flex space-x-4 border-b mb-4">
        <button
          className={`tab pb-2 ${activeTab === 'PENDING' ? 'text-blue-600 font-bold border-b-2 border-blue-600' : ''}`}
          onClick={() => setActiveTab('PENDING')}
        >
          Pending
        </button>
        <button
          className={`tab pb-2 ${activeTab === 'COMPLETED' ? 'text-blue-600 font-bold border-b-2 border-blue-600' : ''}`}
          onClick={() => setActiveTab('COMPLETED')}
        >
          Fulfilled
        </button>
      </div>

      <ul>
        {activeTab === 'PENDING' && renderOrders(orders)}
        {activeTab === 'COMPLETED' && renderOrders(fulfilled)}
      </ul>

      {selectedOrder && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-start">
              {/* <img
                src={selectedOrder.image}
                alt={selectedOrder.item}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              /> */}
              <div>
                <h3 className="text-lg font-bold mb-2">{selectedOrder.item}</h3>
                <p className="text-gray-700 mb-1"><strong>Price:</strong> {selectedOrder.price}</p>
                <p className="text-gray-700 mb-1"><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                <p className="text-gray-700 mb-1"><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                <p className="text-gray-700 mb-1"><strong>Order Status:</strong> {selectedOrder.orderStatus}</p>
              </div>
            </div>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              onClick={closeOrderDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}