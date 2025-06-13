import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { axiosInstance } from '../../../Network/axiosinstance';
import CategoryCard from './CategoryCard';
import Alert from '../../alert'; // Adjust the path if needed

const CategoriesTab = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/Project/API/list/categories/');
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      await axiosInstance.post('/Project/API/createCategory/', {
        name: newCategoryName.trim(),
      });

      setNewCategoryName('');
      setIsCreating(false);
      await fetchCategories();
    } catch (err) {
      setError('Failed to create category');
    }
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-white">Categories</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Category
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4">
          <Alert message={error} onClose={() => setError(null)} type="error" />
        </div>
      )}

      {isCreating && (
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white mb-3"
            placeholder="Enter category name"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCreateCategory}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              disabled={!newCategoryName.trim()}
            >
              Save
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-400">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;
