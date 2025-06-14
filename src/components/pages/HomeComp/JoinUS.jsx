// CallToAction.tsx
import React from "react";
import { Rocket, Users, Target, ArrowRight } from "lucide-react";
import GradientButton from "../../GradientButton";
import { useNavigate } from 'react-router-dom';
import { CTSCard } from "./CTSCard";

const CallToJoin = () => {
    const navigate = useNavigate();
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/50 via-gray-900 to-blue-900/50">
            <div className="max-w-7xl mx-auto">
                {/* Main CTA */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold text-white mb-6">
                        Ready to Make a Difference?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        Join thousands of innovators and supporters who are shaping the future.
                        Whether you're funding the next big idea or creating one yourself, your journey starts here.
                    </p>
                    <div className="flex justify-center">

                        <GradientButton className="!w-fit group" onClick={() => navigate("/login")}>
                            <span className="flex items-center">
                                <Rocket className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />

                                Start Funding Now
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </GradientButton>
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <CTSCard
                        icon={Target}
                        title="For Project Creators"
                        description="Turn your innovative ideas into reality. Get the funding and support you need to bring your vision to life."
                        items={[
                            "Zero platform fees for 30 days",
                            "Expert marketing support",
                            "Global audience reach",
                            "Flexible funding options"
                        ]}
                        fcolor="from-purple-600"
                        tcolor="to-blue-600"
                        hovColor="hover:border-purple-600"
                    />

                    <CTSCard
                        icon={Users}
                        title="For Backers"
                        description="Support groundbreaking projects and be part of innovation. Get exclusive rewards and early access."
                        items={[
                            "Exclusive project updates",
                            "Early bird rewards",
                            "Community access",
                            "Impact tracking"
                        ]}
                        fcolor="from-blue-600"
                        tcolor="to-purple-600"
                        hovColor="hover:border-blue-600"
                    />

                    <CTSCard
                        icon={Rocket}
                        title="Success Stories"
                        description="Join the success stories of projects that have changed industries and improved lives worldwide."
                        items={[
                            "95% project success rate",
                            "$2.5M+ total funded",
                            "25K+ happy backers",
                            "Global impact network"
                        ]}
                        fcolor="from-green-600"
                        tcolor="to-blue-600"
                        hovColor="hover:border-green-600"
                    />
                </div>
            </div>
        </section>
    );
};

export default CallToJoin;
