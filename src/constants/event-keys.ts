export enum EventKey {
  commandMouseBase = 'mouse',
  commandDrawBase = 'draw',
  commandPrntBase = 'prnt',

  commandDrawTypeCirc = 'circle',
  commandDrawTypeRect = 'rectangle',
  commandDrawTypeSqr = 'square',

  commandMouseTypePos = 'position',
  commandMouseTypeMoveUp = 'up',
  commandMouseTypeMoveDown = 'down',
  commandMouseTypeMoveLeft = 'left',
  commandMouseTypeMoveRight = 'right',

  commandPrntTypeScr = 'scrn',
}

export type MouseMoveDirections =
  | EventKey.commandMouseTypeMoveUp
  | EventKey.commandMouseTypeMoveDown
  | EventKey.commandMouseTypeMoveLeft
  | EventKey.commandMouseTypeMoveRight;
