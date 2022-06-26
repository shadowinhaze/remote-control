import { setMouseDelay, mouseToggle } from 'robotjs';

import { EventKey } from '../constants/event-keys';

import { moveMouse } from './move-mouse';

const MOUSE_DELAY_FOR_DRAWING_RECTANGLE = 200;

export const drawRectangle = (width: string, height: string): void => {
  setMouseDelay(MOUSE_DELAY_FOR_DRAWING_RECTANGLE);
  mouseToggle('down');

  moveMouse(EventKey.commandMouseTypeMoveUp, height);
  moveMouse(EventKey.commandMouseTypeMoveRight, width);
  moveMouse(EventKey.commandMouseTypeMoveDown, height);
  moveMouse(EventKey.commandMouseTypeMoveLeft, width);

  mouseToggle('up');
};
