/**
 * Test lib/ChangeEvent object
 */

describe('ChangeEvent', () => {
  let ChangeEvent;

  beforeEach(() => {
    ChangeEvent = require('../lib/ChangeEvent').default;
  });

  // Render without error
  it('should return a value', () => {
    let value = 'testing value';
    let event = new ChangeEvent(value);

    expect(event).toBeDefined();
    expect(event.value).toEqual('testing value');
    expect(event.target.value).toEqual('testing value');
  });

  it('should return the current time', () => {
    let date = Date.now();
    let event = new ChangeEvent('testing time');
    let {timeStamp} = event;

    expect(event).toBeDefined();
    expect(String(timeStamp).split('')).toHaveLength(13);
    expect(timeStamp).toBeGreaterThanOrEqual(date);
  });
});
