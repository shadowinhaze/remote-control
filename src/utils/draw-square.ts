import { setMouseDelay, mouseToggle } from 'robotjs';

import { EventKey } from '../constants/event-keys';
import { MouseDelayForDrawingFigure } from '../constants/params';

import { moveMouse } from './move-mouse';

export const drawSquare = (length: string): void => {
  setMouseDelay(MouseDelayForDrawingFigure.square);
  mouseToggle('down');

  moveMouse(EventKey.commandMouseTypeMoveUp, length);
  moveMouse(EventKey.commandMouseTypeMoveRight, length);
  moveMouse(EventKey.commandMouseTypeMoveDown, length);
  moveMouse(EventKey.commandMouseTypeMoveLeft, length);

  mouseToggle('up');
};
