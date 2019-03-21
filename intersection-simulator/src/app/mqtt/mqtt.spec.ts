import { Mqtt } from './mqtt';

describe('Mqtt', () => {
  it('should create an instance', () => {
    expect(new Mqtt()).toBeTruthy();
  });
});
