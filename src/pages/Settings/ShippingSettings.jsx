import  { useState, useEffect } from 'react';
import MainButton from '../../components/UIElements/MainButton';
import { $api } from '../../client';

const ShippingSettings = () => {
  const [price, setPrice] = useState('');
  
  useEffect(() => {
    // Fetch the current fixed shipping price when the component mounts
    const fetchCurrentPrice = async () => {
      try {
        const response = await $api.get('/wp-json/custom-shipping/v1/get-fixed-price')
        setPrice(response.data.price);
      } catch (error) {
        console.error('Error fetching the current price:', error);
      }
    };
    fetchCurrentPrice();
  }, []);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const saveEditHandler = async () => {
    try {
      const response = await $api.post('/wp-json/custom-shipping/v1/set-fixed-price',{
        'price':price
      });

      if (!response.ok) {
        throw new Error('Failed to update the shipping price');
      }

      const result = await response.json();
      console.log('Shipping price updated successfully:', result);
    } catch (error) {
      console.error('Error updating the shipping price:', error);
    }
  };

  return (
    <div>
      <div className="shadow-md rounded-md p-4 pb-8 mb-14">
        <div>
          <h2 className="text-lg font-semibold">إعدادات الشحن</h2>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            سعر الشحن الثابت
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <MainButton ClickHandler={saveEditHandler} text="حفظ التغييرات" />
      </div>
    </div>
  );
};

export default ShippingSettings;
