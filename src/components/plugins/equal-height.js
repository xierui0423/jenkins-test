import BaseModule from '../../common/js/module-base';

class EqualHeight extends BaseModule {
  init() {
    // default option
    this.ops = Object.assign({
      mobileBp: 767,
    }, this.ops);

    super.init();

    $.util.registerWindowResize($.util.debounce(this.parseElements.bind(this), 250));
    this.parseElements();
  }

  parseElements() {
    this.root.each((index, el) => this.adjustHeight($(el)));
  }

  adjustHeight(el) {
    const els = {
      gridItems: el.find('[data-js-equal-height-item]'),
    };

    let height = 0;
    els.gridItems.css('height', 'auto');

    // no need to adjust height on mobile
    if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      > this.ops.mobileBp) {
      els.gridItems.each((index, item) => {
        height = Math.max(height, $(item).outerHeight());
      });

      if (height > 0) {
        els.gridItems.css('height', height);
      }
    }
  }
}

export default EqualHeight;
