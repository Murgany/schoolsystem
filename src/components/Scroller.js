import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 scrolls back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 300 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setIsVisible({scrollToTop: true});
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          variant="light"
          className="center-text main-text-color main"
          style={{ borderRadius: "50%", width: "50px",
           backgroundColor: '#dcecf3'
          }}>
            <i className="bi bi-arrow-up" id='icons'></i>
        </Button>
      )}
      </>
  );
}
