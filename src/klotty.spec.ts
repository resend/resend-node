import Klotty from './klotty';

describe('Klotty', () => {
  it('throws API key error', () => {
    expect(() => new Klotty()).toThrowErrorMatchingSnapshot();
  });
});
