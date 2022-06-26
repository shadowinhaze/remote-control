import { getMousePos as gMP } from 'robotjs';

export const getMousePos = (): string => {
  const { x, y } = gMP();

  return `${x},${y}`;
};
