import { useState, useEffect } from "react";
import LoveLogin from "../components/love/LoveLogin";
import LoveGallery from "../components/love/LoveGallery";

const Love = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem("love_auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        localStorage.setItem("love_auth", "true");
        setIsAuthenticated(true);
    };

    return (
        <div className="min-h-screen bg-pink-50/30">
            {isAuthenticated ? (
                <LoveGallery />
            ) : (
                <LoveLogin onLogin={handleLogin} />
            )}
        </div>
    );
};

export default Love;
