/**
 * Custom event class to pass around values
 */
export default class ChangeEvent {
  constructor(value, props = {}) {
    Object.assign(this, props);

    this.type = 'change';
    this.value = value;
    this.timeStamp = Date.now();
  }

  /**
   * Returns the same path as a default event
   * @return    {Object}
   */
  get target() {
    return {
      value: this.value
    };
  }
}
