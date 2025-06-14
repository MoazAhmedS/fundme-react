import React, { useEffect, useState } from 'react';
import Navbar from '../NavigationComponents/Navbar';
import Footer from '../NavigationComponents/Footer';
import Hero from './HomeComp/Hero';
import ProjectSlider from './HomeComp/ProjectSliders';
import { Award } from "lucide-react";
import { axiosInstance } from '../../Network/axiosinstance'; // adjust path as needed
import Loader from '../ui/loader/Loader'; // adjust path as needed
import { CategoriesSection } from './HomeComp/CategoriesSection';
import CallToJoin from './HomeComp/JoinUS';
const Index = () => {
    document.title = "Home";
    const [loadingTop, setLoadingTop] = useState(true);
    const [loadingLatest, setLoadingLatest] = useState(true);
    const [loadingFeatured, setLoadingFeatured] = useState(true);

    const [projects, setTopProjects] = useState([]);
    const [latestProjects, setLatestProjects] = useState([]);
    const [featuredProjects, setFeaturedProjects] = useState([]);

    useEffect(() => {
        axiosInstance.get('/Project/API/projects/top/')
            .then(res => setTopProjects(res.data))
            .catch(err => console.error("Top projects error:", err))
            .finally(() => setLoadingTop(false));

        axiosInstance.get('/Project/API/latest-projects/')
            .then(res => setLatestProjects(res.data))
            .catch(err => console.error("Latest projects error:", err))
            .finally(() => setLoadingLatest(false));

        axiosInstance.get('/Project/API/featured/latest/')
            .then(res => setFeaturedProjects(res.data))
            .catch(err => console.error("Featured projects error:", err))
            .finally(() => setLoadingFeatured(false));
    }, []);



    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Hero />

            {loadingTop ? (
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

            {loadingLatest ? (
                <div className="flex justify-center items-center py-10">
                    <Loader size={40} color="white" />
                </div>
            ) : (
                <div className="bg-gray-800/30">
                    <ProjectSlider
                        title="⏱️ Latest Projects"
                        subtitle="Fresh ideas and innovative projects just launched. Be among the first to support them!"
                        projects={latestProjects}
                    />
                </div>

            )}

            {loadingFeatured ? (
                <div className="flex justify-center items-center py-10">
                    <Loader size={40} color="white" />
                </div>
            ) : (
                <ProjectSlider
                    title="🥇 Featured Projects"
                    subtitle="Hand-picked exceptional projects by our team. These initiatives show extraordinary potential for impact."
                    projects={featuredProjects}
                />
            )}


            <CategoriesSection/>
            <CallToJoin />
        </div>
    );
};

export default Index;
