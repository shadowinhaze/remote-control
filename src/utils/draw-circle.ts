import { getMousePos, moveMouse, mouseToggle, setMouseDelay } from 'robotjs';

export const drawCircle = (_radius: string): void => {
  const mousePos = getMousePos();
  const radius = Number(_radius);

  moveMouse(mousePos.x + radius, mousePos.y);

  mouseToggle('down');
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    // Convert polar coordinates to cartesian
    const x = mousePos.x + radius * Math.cos(i);
    const y = mousePos.y + radius * Math.sin(i);
    setMouseDelay(1);
    moveMouse(x, y);
  }

  mouseToggle('up');
};
