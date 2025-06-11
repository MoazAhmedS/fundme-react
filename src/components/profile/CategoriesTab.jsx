import React, { useState, useEffect } from 'react';

const CategoriesTab = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://api.example.com/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (category) => {
    setEditingCategory(category.id);
    setCategoryName(category.name);
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`https://api.example.com/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      setCategories(categories.map(cat => 
        cat.id === id ? { ...cat, name: categoryName } : cat
      ));
      setEditingCategory(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const response = await fetch(`https://api.example.com/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-white">Categories</h3>
        <button 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-md"
          onClick={() => {
            setEditingCategory('new');
            setCategoryName('');
          }}
        >
          Add Category
        </button>
      </div>

      {/* Add/Edit Category Form */}
      {(editingCategory === 'new' || editingCategory) && (
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white mb-3"
            placeholder="Category name"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                if (editingCategory === 'new') {
                  // Handle create new category
                  const createCategory = async () => {
                    try {
                      const response = await fetch('https://api.example.com/categories', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name: categoryName }),
                      });

                      if (!response.ok) {
                        throw new Error('Failed to create category');
                      }

                      const newCategory = await response.json();
                      setCategories([...categories, newCategory]);
                      setEditingCategory(null);
                    } catch (err) {
                      setError(err.message);
                    }
                  };
                  createCategory();
                } else {
                  handleSave(editingCategory);
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setEditingCategory(null)}
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
            <div 
              key={category.id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                {editingCategory === category.id ? (
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1 text-white"
                  />
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-white">
                      {category.name}
                    </h3>
                    <p className="text-gray-400">
                      {category.projectCount || 0} projects
                    </p>
                  </>
                )}
              </div>
              
              <div className="flex space-x-2">
                {editingCategory === category.id ? (
                  <>
                    <button
                      onClick={() => handleSave(category.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(category)}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 rounded-md px-3 border border-gray-600 hover:bg-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 rounded-md px-3 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" x2="10" y1="11" y2="17"></line>
                        <line x1="14" x2="14" y1="11" y2="17"></line>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;