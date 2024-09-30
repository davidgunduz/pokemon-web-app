import { FC, MouseEvent, useState } from "react";

// ----------------------------------------------------------------------

type RippleProps = {
  duration?: number;
};

const Ripple: FC<RippleProps> = ({ duration = 600 }) => {
  const [ripples, setRipples] = useState<{ top: number; left: number; size: number }[]>([]);

  const createRipple = (event: MouseEvent<HTMLDivElement>) => {
    const button = event.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const x = event.clientX - button.getBoundingClientRect().left - radius;
    const y = event.clientY - button.getBoundingClientRect().top - radius;

    const newRipple = { top: y, left: x, size: diameter };
    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.slice(1));
    }, duration);
  };

  return (
    <div className="absolute inset-0" onClick={createRipple}>
      {ripples.map((ripple, index) => (
        <span
          key={index}
          className="absolute bg-sky-400 opacity-50 rounded-full pointer-events-none animate-ripple"
          style={{
            top: `${ripple.top}px`,
            left: `${ripple.left}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
          }}
        ></span>
      ))}
    </div>
  );
};

export default Ripple;
