import { useState } from 'react';
import { ghanaRegions } from './RegionsDeata';

interface AddressProps {
  userAdd: { region: string, city: string } | null | undefined;
  updateAddress: (address: {}) => Promise<void>;
}

const Address = ({ userAdd, updateAddress }: AddressProps) => {
  const [address, setAddress] = useState({ region: '', city: '', district: '' });
  const [isEditingAddress, setEditingAddress] = useState(false);

  const handleAddress = () => {
    const { region, city, district } = address;
    setEditingAddress(!isEditingAddress);

    if (region == '' || city == '') {
      console.warn("Both Region and City must be selected.");
      return;
    }
    updateAddress(address);
  };

  const currentRegion = ghanaRegions.find(region => region.name === address?.region);
  // const currentCity = currentRegion?.cities.find(city => city.name === address?.city);

  return (
    <>
        <h3 className="text-lg font-semibold mb-4">Address</h3>
        <div className="space-y-4">
          {isEditingAddress && (
            <div>
              {/* Region Select */}
              <div className="flex flex-col">
                <label htmlFor="region" className="mb-2 text-sm font-medium text-white">
                  Select Region
                </label>
                <select
                  id="region"
                  value={address?.region}
                  onChange={(e) => setAddress((prev) => ({ ...prev, region: e.target.value }))}
                  className="block w-full rounded-md border text-gray-700 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a region</option>
                  {ghanaRegions.map(region => (
                    <option key={region.name} value={region.name}>
                      {region.name} Region
                    </option>
                  ))}
                </select>
              </div>

              {/* City Select */}
              {address?.region && (
                <div className="flex flex-col">
                  <label htmlFor="city" className="mb-2 text-sm font-medium text-white">
                    Select City
                  </label>
                  <select
                    id="city"
                    value={address?.city}
                    onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                    className="block w-full rounded-md border text-gray-700 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select a city</option>
                    {currentRegion?.cities.map(city => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* District Select (only for cities with districts)
            {address?.city && currentCity?.districts && (
              <div className="flex flex-col">
                <label htmlFor="district" className="mb-2 text-sm font-medium text-white">
                  Select District
                </label>
                <select
                  id="district"
                  value={address?.district}
                  onChange={(e) => setAddress((prev) => ({ ...prev, district: e.target.value }))}
                  className="block w-full rounded-md border text-gray-700 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a district</option>
                  {currentCity.districts.map(district => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            )} */}
            </div>
          )}

          {/* {error ? <h2>Add Address</h2> : */}
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700"><strong>Region</strong> : {address?.region}</h3>
            <h3 className="text-sm font-medium text-gray-700"><strong>City</strong> : {address?.city}</h3>
          </div>
          <button
            onClick={() => handleAddress()}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition duration-200"
          >
            {isEditingAddress ? 'Save' : 'Edit'} Address
          </button>
        </div>
    </>
  );
};

export default Address;