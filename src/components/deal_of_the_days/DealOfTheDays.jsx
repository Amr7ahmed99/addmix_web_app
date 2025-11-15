import { useState, useEffect } from 'react';
import './DealOfTheDays.scss';
import Slider from '../general/slider/Slider';

const DealOfTheDays = ({products}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 0,
    minutes: 43,
    seconds: 28
  });

  const [, setItemsPerSlide] = useState(4);


  // Handle responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setItemsPerSlide(1); // 1 item on mobile
      } else if (width < 768) {
        setItemsPerSlide(2); // 2 items on small tablets
      } else if (width < 992) {
        setItemsPerSlide(3); // 3 items on tablets
      } else {
        setItemsPerSlide(4); // 4 items on desktop
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  const headerSectionContent = () => {
    return (
      // Header Section
      <div className="deal-header mb-4">
        <div className="deal-info text-start">
          <h2 className="deal-title">Deal Of The Days</h2>
          <p className="deal-subtitle">Deal Of The Day: Unbelievable Savings Await!</p>
        </div>
        
        {/* Countdown Timer */}
        <div className="countdown-timer">
          <div className="timer-block">
            <span className="timer-number">{formatTime(timeLeft.days)}</span>
            <span className="timer-label">Days</span>
          </div>
          <div className="timer-separator">:</div>
          <div className="timer-block">
            <span className="timer-number">{formatTime(timeLeft.hours)}</span>
            <span className="timer-label">Hours</span>
          </div>
          <div className="timer-separator">:</div>
          <div className="timer-block">
            <span className="timer-number">{formatTime(timeLeft.minutes)}</span>
            <span className="timer-label">Mins</span>
          </div>
          <div className="timer-separator">:</div>
          <div className="timer-block">
            <span className="timer-number">{formatTime(timeLeft.seconds)}</span>
            <span className="timer-label">Sec</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="deal-of-days-container">
      <Slider
        headerSectionContent={headerSectionContent()}
        products={products}
      />
    </section>
  );
};

export default DealOfTheDays;

