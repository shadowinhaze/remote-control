import * as Jimp from 'jimp';
import { Bitmap, getMousePos, screen } from 'robotjs';

import { ScreenShotSize } from '../constants/params';

// from issue https://github.com/octalmage/robotjs/issues/13#issuecomment-348055347
const processCapturedImg = (robotScreenPic: Bitmap): Promise<Jimp> =>
  new Promise((resolve, reject) => {
    try {
      const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
      /* eslint-disable  @typescript-eslint/no-magic-numbers */
      let pos = 0;
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        /* eslint-disable no-plusplus */
        image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
        /* eslint-enable no-plusplus */
      });
      /* eslint-enable  @typescript-eslint/no-magic-numbers */
      resolve(image);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

export const printScreen = async (): Promise<string> => {
  const { x, y } = getMousePos();

  const capturedImg = screen.capture(
    x,
    y,
    ScreenShotSize.width,
    ScreenShotSize.height,
  );

  const processedImg = await processCapturedImg(capturedImg);

  const base64 = await processedImg.getBase64Async(Jimp.MIME_PNG);

  return base64.split(',')[1];
};
