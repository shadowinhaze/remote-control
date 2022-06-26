import { setMouseDelay, mouseToggle } from 'robotjs';

import { EventKey } from '../constants/event-keys';
import { MouseDelayForDrawingFigure } from '../constants/params';

import { moveMouse } from './move-mouse';

export const drawRectangle = (width: string, height: string): void => {
  setMouseDelay(MouseDelayForDrawingFigure.rectangle);
  mouseToggle('down');

  moveMouse(EventKey.commandMouseTypeMoveUp, height);
  moveMouse(EventKey.commandMouseTypeMoveRight, width);
  moveMouse(EventKey.commandMouseTypeMoveDown, height);
  moveMouse(EventKey.commandMouseTypeMoveLeft, width);

  mouseToggle('up');
};
