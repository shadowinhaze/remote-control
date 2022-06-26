import { getMousePos, moveMouse as mm } from 'robotjs';

import { EventKey, MouseMoveDirections } from '../constants/event-keys';

export const moveMouse = (
  direction: MouseMoveDirections,
  _range: string,
): void => {
  const { x, y } = getMousePos();
  const range = Number(_range);

  let deltaX = 0;
  let deltaY = 0;

  switch (direction) {
    case EventKey.commandMouseTypeMoveLeft:
      deltaX = range * -1;
      break;
    case EventKey.commandMouseTypeMoveRight:
      deltaX = range;
      break;
    case EventKey.commandMouseTypeMoveUp:
      deltaY = range * -1;
      break;
    case EventKey.commandMouseTypeMoveDown:
      deltaY = range;
      break;
    default:
      deltaX = 0;
      deltaY = 0;
      break;
  }

  mm(x + deltaX, y + deltaY);
};
