import readline from 'node:readline'
import { log } from '../../src/util';
import {
  expect,
  describe,
  it,
  jest
} from '@jest/globals'
describe('Log suite test', () => {

  readline.cursorTo = jest.fn().mockImplementation()
  process.stdout.write = jest.fn().mockImplementation()
  afterAll(() => jest.clearAllMocks())
  it('write input ', () => {
    const msg = 'test'
    log(msg)
    expect(readline.cursorTo).toBeCalledWith(process.stdout, 0)
    expect(process.stdout.write).toBeCalledWith(msg)
  });
});