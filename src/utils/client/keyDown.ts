import { KeyCodes } from './dom';

const keyDown = (key: KeyCodes) => (cb) => (e: KeyboardEvent) => {
  if (e.key === key) {
    e.preventDefault();
    cb(e);
  }
};

export const keyDownSpace = keyDown(KeyCodes.Space);

export const keyDownEnter = keyDown(KeyCodes.Enter);

export const keyDownEscape = keyDown(KeyCodes.Esc);

export const keyDownTab = keyDown(KeyCodes.Tab);

export default keyDown;
