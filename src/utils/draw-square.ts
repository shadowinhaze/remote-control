import { setMouseDelay, mouseToggle } from 'robotjs';

import { EventKey } from '../constants/event-keys';

import { moveMouse } from './move-mouse';

const MOUSE_DELAY_FOR_DRAWING_SQUARE = 200;

export const drawSquare = (length: string): void => {
  setMouseDelay(MOUSE_DELAY_FOR_DRAWING_SQUARE);
  mouseToggle('down');

  moveMouse(EventKey.commandMouseTypeMoveUp, length);
  moveMouse(EventKey.commandMouseTypeMoveRight, length);
  moveMouse(EventKey.commandMouseTypeMoveDown, length);
  moveMouse(EventKey.commandMouseTypeMoveLeft, length);

  mouseToggle('up');
};
