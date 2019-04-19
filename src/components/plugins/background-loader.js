/*
  Loads backgrounds via JS. (Useful for CMS type sites which need to control background images.)
  Usage: div(data-js-bg-loader='$url', data-js-bg-loader-mobile='$url2')
*/
import BaseModule from '../../common/js/module-base';

class BgLoader extends BaseModule {
  init() {
    // default option
    this.ops = Object.assign({
      mobileBp: 414,
    }, this.ops);

    super.init();

    $.util.registerWindowResize($.util.debounce(this.parseElements.bind(this)));
    this.parseElements();
  }

  parseElements() {
    this.root.each((index, el) => this.setBackground($(el)));
  }


  setBackground(el) {
    const getBackground = key => el.data(key);
    let bg;

    if ($.util.getViewportWidth() <= this.ops.mobileBp) {
      bg = getBackground('jsBgLoaderMobile');
    }

    if (!bg) {
      bg = getBackground('jsBgLoader');
    }

    if (bg) {
      el.css({
        'background-image': `url("${bg}")`,
      });
    }
  }
}

export default BgLoader;
