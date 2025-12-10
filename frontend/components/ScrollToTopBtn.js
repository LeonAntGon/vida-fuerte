import { useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { useEffect } from "react";
export default function ScrollToTopBtn() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    // add scroll event listener when component mounts
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return <>
    <button className={`scrollToTop ${isVisible ? 'show' : 'hide'}`} onClick={scrollToTop}>
        <FaArrowUp/>
    </button>
    </>

}