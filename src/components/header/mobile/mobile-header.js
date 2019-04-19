import BaseModule from '../../../common/js/module-base';

class MobileHeader extends BaseModule {
  init() {
    super.init();

    Object.assign(this.els, {
      menuToggle: this.root.find('[data-js-mobile-menu-toggle]'),
      menu: this.root.find('[data-js-mobile-menu]'),
      subMenuToggles: this.root.find('[data-js-mobile-sub-menu-toggle]'),
      lastLink: this.root.find('[data-js-mobile-menu] a').last(),
    });

    this.events();
  }

  events() {
    this.els.menuToggle.on('click', (e) => {
      this.toggleMenu(e);
    });

    this.els.subMenuToggles.on('click', (e) => {
      this.toggleSubMenu(e);
    });

    this.root.on('keydown', (e) => {
      if (this.isEsc(e) && this.els.menuToggle.hasClass('mobile-header__toggle--expanded')) {
        this.toggleMenu(e);
        this.els.menuToggle.focus();
      }
    });

    this.els.menuToggle.on('keydown', (e) => {
      if (this.isBackTab(e)) {
        this.els.lastLink.focus();
        e.preventDefault();
      }
    });
    this.els.lastLink.on('keydown', (e) => {
      if (this.isTab(e) && !this.isBackTab(e)) {
        this.els.menuToggle.focus();
        e.preventDefault();
      }
    });
  }

  toggleMenu() {
    this.toggleAttribute(this.els.menuToggle.toggleClass('mobile-header__toggle--expanded'), this.aria.expanded);
    this.toggleAttribute(this.els.menu.toggle(), this.aria.hidden);
  }

  toggleSubMenu(e) {
    const $toggle = $(e.currentTarget);
    const $subMenu = $toggle.closest('[data-js-mobile-menu-item]').find('[data-js-mobile-sub-menu]');

    this.toggleAttribute($toggle.toggleClass('mobile-nav__sub-menu-toggle--expanded'), this.aria.expanded);
    this.toggleAttribute($subMenu.toggle(), this.aria.hidden);

    e.stopPropagation();
    e.preventDefault();
  }
}

export default MobileHeader;
