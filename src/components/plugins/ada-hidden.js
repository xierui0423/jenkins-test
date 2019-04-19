import BaseModule from '../../common/js/module-base';

class ADAHidden extends BaseModule {
  init() {
    super.init();

    $.util.registerWindowResize($.util.debounce(this.parseElements.bind(this)));
    this.parseElements();
  }

  parseElements() {
    this.root.each((index, el) => this.toggleVisibility($(el)));
  }

  toggleVisibility(el) {
    const setHidden = hidden => el.attr(this.aria.hidden, hidden);

    const width = $.util.getViewportWidth();
    const asc = el.data('asc');
    const size = Number(el.data('js-ada-hidden'));

    if (asc) {
      if (width >= size) {
        return setHidden(true);
      }
      return setHidden(false);
    }
    if (width <= size) {
      return setHidden(true);
    }
    return setHidden(false);
  }
}

export default ADAHidden;
