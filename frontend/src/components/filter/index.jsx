import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/productsSlice';

const Filter = ({ type }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [selectedValue, setSelectedValue] = useState('Todos');
  const dispatch = useDispatch();
  const brands = useSelector(state => state.products.filterBrandOptions);
  const models = useSelector(state => state.products.filterModelOptions);

  useEffect(() => {
    if (type === 'brand') {
      setFilterOptions(brands);
      setFilterName('Marca');
    } else if (type === 'model') {
      setFilterOptions(models);
      setFilterName('Modelo');
    }
  }, [type, brands, models]);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (value) => {
    if (value === 'all') {
      dispatch(setFilter({ type, value: null }));
      setSelectedValue('Todos');
    } else {
      dispatch(setFilter({ type, value }));
      setSelectedValue(value);
    }
    setDropdownVisible(false);
  };


  return (
    <div className="relative flex items-center justify-center p-4">
      <button
        id="dropdownDefault"
        onClick={toggleDropdown}
        className="font-bold text-gray-700 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="button">
        {filterName}: {selectedValue}
        <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      {isDropdownVisible && (
        <div
          id="dropdown"
          className="absolute top-full z-10 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 mt-2"
          style={{ maxHeight: '200px', overflowY: 'auto' }}
        >

          <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
            <li className="cursor-pointer" onClick={() => handleSelect('all')}>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                Limpar filtro
              </span>
            </li>
            {filterOptions.map((option, index) => (
              <li key={index} className="cursor-pointer" onClick={() => handleSelect(option)}>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {option}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Filter };

