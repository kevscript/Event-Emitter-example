class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, cb) {
    if (!this.events[event]) {
      console.log(
        `on : ${event} doesn't exists yet, creating it and pushing cb`
      );
      this.events[event] = [cb];
    } else {
      console.log(`on : ${event} exists, pushing cb`);
      this.events[event].push(cb);
    }
  }

  trigger(event, ...rest) {
    if (this.events[event]) {
      console.log(`trigger : executing all callbacks attached to ${event}`);
      this.events[event].forEach((cb) => cb.call(null, ...rest));
    }
  }
}

class Sizes extends EventEmitter {
  constructor() {
    super();

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    window.addEventListener('resize', (e) => this.resize(e));
  }

  resize(e) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    console.log('sizes : resize');
    this.trigger('resize', e);
  }
}

class Experience {
  constructor() {
    this.sizes = new Sizes();
    this.sizes.on('resize', (e) => this.onResize(e));
  }

  onResize(e) {
    console.log('experience : resize', e);
  }
}

export { EventEmitter, Sizes, Experience };
