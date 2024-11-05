import { useState } from 'react';
import { ghanaRegions } from './RegionsDeata';

const RegionCitySelect = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedCity('');
    setSelectedDistrict('');
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict('');
  };

  const currentRegion = ghanaRegions.find(region => region.name === selectedRegion);
  const currentCity = currentRegion?.cities.find(city => city.name === selectedCity);

  return (
    <div className="space-y-4">
      {/* Region Select */}
      <div className="flex flex-col">
        <label htmlFor="region" className="mb-2 text-sm font-medium text-gray-700">
          Select Region
        </label>
        <select
          id="region"
          value={selectedRegion}
          onChange={handleRegionChange}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
      {selectedRegion && (
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-2 text-sm font-medium text-gray-700">
            Select City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={handleCityChange}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

      {/* District Select (only for cities with districts) */}
      {selectedCity && currentCity?.districts && (
        <div className="flex flex-col">
          <label htmlFor="district" className="mb-2 text-sm font-medium text-gray-700">
            Select District
          </label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select a district</option>
            {currentCity.districts.map(district => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Selected Location Display */}
      {selectedRegion && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700">Selected Location:</h3>
          <p className="text-gray-600">
            {selectedRegion}
            {selectedCity && ` → ${selectedCity}`}
            {selectedDistrict && ` → ${selectedDistrict}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default RegionCitySelect;