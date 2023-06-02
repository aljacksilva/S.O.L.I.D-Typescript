import { Message } from './messages';

const creatSut = () => {
  return new Message();
};

describe('Persistency', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return undefined', () => {
    // System under test
    const sut = creatSut();

    expect(sut.sendMessage('test')).toBeUndefined();
  });

  it('should call console.log once', () => {
    const sut = creatSut();
    const consoleSpy = jest.spyOn(console, 'log');

    sut.sendMessage('test');

    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should call console.log with "Message sent:" and msg', () => {
    const sut = creatSut();
    const consoleSpy = jest.spyOn(console, 'log');

    sut.sendMessage('test');

    expect(consoleSpy).toHaveBeenCalledWith('Message sent:', 'test');
  });
});
