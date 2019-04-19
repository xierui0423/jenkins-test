import BaseModule from '../../common/js/module-base';

class Accordion extends BaseModule {
  init() {
    super.init();

    this.parseElements();
  }

  parseElements() {
    this.root.each((index, el) => this.registerEvents($(el)));
  }

  registerEvents(el) {
    const els = {
      toggles: el.find('[data-js-accordion-toggle]'),
    };

    els.toggles.on('click', this.toggleContent.bind(this));
  }

  toggleContent(e) {
    const $toggle = $(e.currentTarget);
    const $content = $toggle.closest('[data-js-accordion-item]').find('[data-js-accordion-content]');

    $toggle.closest('[data-js-accordion-item]').toggleClass('accordion__item--expanded');
    this.toggleAttribute($toggle, this.aria.expanded);
    this.toggleAttribute($content.slideToggle(), this.aria.hidden);
  }
}

export default Accordion;
