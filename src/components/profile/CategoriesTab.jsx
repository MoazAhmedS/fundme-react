import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { Link } from 'react-router-dom';

const CategoriesTab = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://api.example.com/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        console.log('Fetched categories:', data); // Debug log
        setCategories(data);
      } catch (err) {
        console.error('Fetch error:', err); // Debug log
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      console.log('Creating category:', newCategoryName); // Debug log
      const response = await fetch('https://api.example.com/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategoryName })
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const newCategory = await response.json();
      console.log('Created category:', newCategory); // Debug log
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      setIsCreating(false);
    } catch (err) {
      console.error('Create error:', err); // Debug log
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h3 className="text-2xl font-semibold text-white mb-4">Categories</h3>
        <p className="text-gray-400">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h3 className="text-2xl font-semibold text-white mb-4">Categories</h3>
        <p className="text-gray-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
      {/* Debug container - will help identify layout issues */}
      <div className="debug-container border border-red-500 p-1 mb-2">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-white">Categories</h3>
          <div className="flex space-x-2">
            <Link
              to="/projects/create"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Create Project
            </Link>
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Create Category
            </button>
          </div>
        </div>
      </div>

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

      {categories.length === 0 ? (
        <p className="text-gray-400">No categories found.</p>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <CategoryCard 
              category={category}
              key={category.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;