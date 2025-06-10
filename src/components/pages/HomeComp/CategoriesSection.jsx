import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../Network/axiosinstance";
import { CategoryCard } from "./CategCard";
import { Grid3x3 } from "lucide-react";
import Loader  from "../../ui/loader/Loader";

export const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/Project/API/list/categories/")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Failed to fetch categories", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Grid3x3 className="h-8 w-8 text-green-400 mr-2" />
            <h2 className="text-4xl font-bold text-white">Browse Categories</h2>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore projects across different categories and find causes that matter to you
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};