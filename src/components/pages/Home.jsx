import React, { useEffect, useState } from 'react';
import Navbar from '../NavigationComponents/Navbar';
import Footer from '../NavigationComponents/Footer';
import Hero from './HomeComp/Hero';
import ProjectSlider from './HomeComp/ProjectSliders';
import { Award } from "lucide-react";
import { axiosInstance } from '../../Network/axiosinstance'; // adjust path as needed
import Loader from '../ui/loader/Loader'; // adjust path as needed
const Index = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/Project/API/projects/top/')
            .then(res => {
                setProjects(res.data);
                setLoading(false);
                console.log("Top projects fetched successfully:", res.data);
            })
            .catch(err => {
                console.error("Failed to fetch top projects:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <Hero />

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <Loader size={40} color="white" />
                </div>
            ) : (
                <ProjectSlider
                    title="⭐ Top Rated Projects"
                    subtitle="Discover the most successful and highly-rated projects that are making a real impact"
                    projects={projects}
                />
            )}

            <Footer />
        </div>
    );
};

export default Index;
