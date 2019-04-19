class BaseModule {
  constructor(element, options = {}) {
    this.els = {};
    this.ops = options;
    this.root = $(element);

    this.init();
  }

  static keycode(e) {
    return e.which;
  }

  init() {
    this.keys = {
      esc: 27,
      down: 40,
      up: 38,
      left: 37,
      right: 39,
      o: 79,
      space: 32,
      tab: 9,
      enter: 13,
    };

    this.aria = {
      label: 'aria-label',
      controls: 'aria-controls',
      described: 'aria-describedby',
      labelled: 'aria-labelledby',
      popup: 'aria-haspopup',
      expanded: 'aria-expanded',
      hidden: 'aria-hidden',
      tabindex: 'tabindex',
      selected: 'aria-selected',
      invalid: 'aria-invalid',
      pressed: 'aria-pressed',
      checked: 'aria-checked',
      owns: 'aria-owns',
      required: 'aria-required',
      current: 'aria-current',
    };
  }

  isRight(e) {
    return BaseModule.keycode(e) === this.keys.right;
  }

  isLeft(e) {
    return BaseModule.keycode(e) === this.keys.left;
  }

  isUp(e) {
    return BaseModule.keycode(e) === this.keys.up;
  }

  isDown(e) {
    return BaseModule.keycode(e) === this.keys.down;
  }

  isEnter(e) {
    return BaseModule.keycode(e) === this.keys.enter;
  }

  isSpace(e) {
    return BaseModule.keycode(e) === this.keys.space;
  }

  isTab(e) {
    return BaseModule.keycode(e) === this.keys.tab;
  }

  isBackTab(e) {
    return e.shiftKey && this.isTab(e);
  }

  isEsc(e) {
    return BaseModule.keycode(e) === this.keys.esc;
  }

  isEnterOrSpace(e) {
    return BaseModule.isEnter(e) || this.isSpace(e);
  }

  isDesktop() {
    return $(window).width > 1024;
  }

  toggleAttribute(element, attributeName) {
    element.attr(attributeName, element.attr(attributeName) !== 'true');
  }

  fixAccessibility() {
    this.root.find('.slick-dots button').removeAttr(this.aria.tabindex);
    this.root.find('.slick-dots li').removeAttr('role');
    this.root.find('.slick-slide').removeAttr('aria-describedby');
  }
}

export default BaseModule;
