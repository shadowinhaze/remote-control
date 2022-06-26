import { EventKey } from '../constants/event-keys';
import {
  drawCircle,
  drawSquare,
  drawRectangle,
  printScreen,
  getMousePos,
  moveMouse,
} from '../utils';

export const COMMANDS = [
  {
    baseName: EventKey.commandMouseBase,
    typeName: EventKey.commandMouseTypePos,
    func: getMousePos,
  },
  {
    baseName: EventKey.commandMouseBase,
    typeName: EventKey.commandMouseTypeMoveUp,
    func: moveMouse,
  },
  {
    baseName: EventKey.commandMouseBase,
    typeName: EventKey.commandMouseTypeMoveDown,
    func: moveMouse,
  },
  {
    baseName: EventKey.commandMouseBase,
    typeName: EventKey.commandMouseTypeMoveLeft,
    func: moveMouse,
  },
  {
    baseName: EventKey.commandMouseBase,
    typeName: EventKey.commandMouseTypeMoveRight,
    func: moveMouse,
  },
  {
    baseName: EventKey.commandDrawBase,
    typeName: EventKey.commandDrawTypeCirc,
    func: drawCircle,
  },
  {
    baseName: EventKey.commandDrawBase,
    typeName: EventKey.commandDrawTypeSqr,
    func: drawSquare,
  },
  {
    baseName: EventKey.commandDrawBase,
    typeName: EventKey.commandDrawTypeRect,
    func: drawRectangle,
  },
  {
    baseName: EventKey.commandPrntBase,
    typeName: EventKey.commandPrntTypeScr,
    func: printScreen,
  },
];
