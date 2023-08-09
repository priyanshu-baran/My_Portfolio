import { useEffect } from 'react';

export const Cursor = ({ isClicked }) => {
  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle) => {
      circle.x = 0;
      circle.y = 0;
    });
    const handleMouseMove = (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };
    const animateCircles = () => {
      let x = coords.x;
      let y = coords.y;
      circles.forEach((circle, index) => {
        circle.style.left = x - 10 + 'px';
        circle.style.top = y - 10 + 'px';
        circle.style.transform = `scale(${
          (circles.length - index) / circles.length
        })`;
        circle.x = x;
        circle.y = y;
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.2;
        y += (nextCircle.y - y) * 0.2;
      });
      requestAnimationFrame(animateCircles);
    };
    animateCircles();
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <div>
      {Array.from({ length: 35 }).map((_, index) => (
        <div
          className='circle'
          style={{
            backgroundImage: `${
              !isClicked
                ? 'linear-gradient(#F44336, #FFEB3B)'
                : 'linear-gradient(#ffffffa1, #242768)'
            }`,
          }}
          key={index}></div>
      ))}
    </div>
  );
};
