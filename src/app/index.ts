/* eslint-disable class-methods-use-this */
import { EventEmitter } from 'events';
import { Duplex } from 'stream';

import { createWebSocketStream, WebSocketServer } from 'ws';

import { EventKey } from '../constants/event-keys';
import 'dotenv/config';
import { ReservePort } from '../constants/params';

import { COMMANDS } from './commands';

export class App {
  private emitter = new EventEmitter();

  private wss = new WebSocketServer({
    port: Number(process.env.WSS_PORT) || ReservePort.wssPort,
  });

  private stream: Duplex | undefined = undefined;

  private usedMasks: Set<string> = new Set();

  private listenCommands(): void {
    this.stream.on('data', (data) => {
      const [commandRaw, ...params] = <string[]>data.toString().split(' ');

      const [commandBase, commandType] = this.getPartsFromMask(commandRaw);

      this.emitter.emit(
        this.getCommandMask(commandBase as EventKey, commandType as EventKey),
        ...params,
      );
    });
  }

  private getPartsFromMask(command: string): string[] {
    return command.split('_');
  }

  private getCommandMask(base: EventKey, type: EventKey): string {
    return `${base}_${type}`;
  }

  private addCommandListener(
    mask: string,
    handler: (...args: string[]) => void | string | Promise<string>,
  ): void {
    if (this.usedMasks.has(mask)) return;

    const [commandBase, commandType] = this.getPartsFromMask(mask);

    switch (commandBase) {
      case EventKey.commandMouseBase: {
        if (commandType === EventKey.commandMouseTypePos) {
          this.emitter.on(mask, () => {
            this.stream.write(`${mask} ${handler()}\0`);
          });
        } else {
          this.emitter.on(mask, (...args: string[]) => {
            handler(commandType, ...args);
            this.stream.write(`${mask}\0`);
          });
        }
        break;
      }
      case EventKey.commandPrntBase: {
        this.emitter.on(mask, () => {
          const answer = handler();

          if (typeof answer === 'object' && typeof answer.then === 'function') {
            answer.then((img: string) => {
              this.stream.write(`${mask} ${img}\0`);
            });
          }
        });
        break;
      }
      default: {
        this.emitter.on(mask, (...args: string[]) => {
          handler(...args);
          this.stream.write(`${mask}\0`);
        });
        break;
      }
    }

    this.usedMasks.add(mask);
  }

  private parseCommands(): void {
    COMMANDS.forEach(({ baseName, typeName, func }) => {
      this.addCommandListener(this.getCommandMask(baseName, typeName), func);
    });
  }

  startConnection(): void {
    this.wss.on('connection', (ws) => {
      this.stream = createWebSocketStream(ws, {
        encoding: 'utf-8',
        decodeStrings: false,
      });

      this.parseCommands();
      this.listenCommands();
    });

    process.on('SIGINT', () => {
      process.stdout.write('Close websocket\n');
      this.wss.close();
      process.exit(0);
    });
  }
}
