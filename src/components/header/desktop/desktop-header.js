import BaseModule from '../../../common/js/module-base';

class DesktopHeader extends BaseModule {
  static getSubMenu(e) {
    return $(e.currentTarget).closest('[data-js-menu-item]').find('[data-js-sub-menu]');
  }

  static navTo($menuItem, direction) {
    const $siblingMenu = $menuItem.parent().siblings();


    let $moveToItem = $menuItem[direction]();
    if (!$moveToItem.length) {
      if ($siblingMenu.length) {
        $moveToItem = $siblingMenu.children(direction === 'next' ? ':first' : ':last');
      } else {
        $moveToItem = $menuItem.siblings(direction === 'next' ? ':first' : ':last');
      }
    }
    $moveToItem.find('>a').focus();
  }

  init() {
    super.init();

    Object.assign(this.els, {
      menuItems: this.root.find('[data-js-menu] > [data-js-menu-item]'),
      subMenus: this.root.find('[data-js-sub-menu]'),
      firstMenuLink: this.root.find('[data-js-menu-item]:first > a'),
      lastMenuLink: this.root.find('[data-js-menu-item]:last > a'),
    });

    this.events();

    this.prevTop = 0;
    this.navCollapseTop = 100;
    $.util.registerGlobalScroll(this.toggleNavScrollCollapse.bind(this));
    this.toggleNavScrollCollapse();
  }

  events() {
    this.els.menuItems.on('mouseenter', (e) => {
      const $subMenu = DesktopHeader.getSubMenu(e);
      this.closeMenu();
      this.openMenu($subMenu);
    });

    this.els.menuItems.on('mouseleave', (e) => {
      const $subMenu = DesktopHeader.getSubMenu(e);

      this.closeMenu($subMenu);
    });

    this.els.menuItems.find('>a').on('focus', (e) => {
      const $subMenu = DesktopHeader.getSubMenu(e);
      this.closeMenu();
      this.openMenu($subMenu);
    });

    this.els.menuItems.on('keydown', (e) => {
      if (this.isEsc(e)) {
        this.closeMenu();
        return false;
      }
      const $active = $(document.activeElement);
      const $subMenu = DesktopHeader.getSubMenu(e);
      const $currentItem = $(e.currentTarget);

      if ($subMenu.length) {
        if (this.isUp(e)) {
          if (!$currentItem.find('> a').is($active)) {
            DesktopHeader.navTo($active.parent(), 'prev');
          }
        }
        if (this.isDown(e)) {
          if ($currentItem.find('> a').is($active)) {
            $subMenu.find('[data-js-menu-item] > a').eq(0).focus();
          } else {
            DesktopHeader.navTo($active.parent(), 'next');
          }
        }

        if (this.isBackTab(e)) {
          if (this.els.firstMenuLink.is($active)) {
            this.closeMenu();
          }
        }

        if (this.isTab(e)) {
          if (this.els.lastMenuLink.is($active)) {
            this.closeMenu();
          }
        }
      }
      if (this.isLeft(e)) {
        DesktopHeader.navTo($currentItem, 'prev');
      }

      if (this.isRight(e)) {
        DesktopHeader.navTo($currentItem, 'next');
      }

      if (this.isUp(e) || this.isDown(e)) {
        return false;
      }
      return true;
    });
  }

  openMenu($menu = this.els.subMenus) {
    $menu.css('display', 'table');
    $menu.attr(this.aria.hidden, false);
    $menu.closest('[data-js-menu-item]').find('> a').attr(this.aria.expanded, true);
  }

  closeMenu($menu = this.els.subMenus) {
    $menu.hide();
    $menu.attr(this.aria.hidden, true);
    $menu.closest('[data-js-menu-item]').find('> a').attr(this.aria.expanded, false);
  }

  toggleNavScrollCollapse() {
    if ($.util.getViewportWidth() > 1024) {
      if (this.prevTop < this.navCollapseTop && $(document).scrollTop() >= this.navCollapseTop) {
        this.root.css('margin-top', '-45px');
      } else if (this.prevTop > this.navCollapseTop
        && $(document).scrollTop() <= this.navCollapseTop) {
        this.root.css('margin-top', 0);
      }

      this.prevTop = $(document).scrollTop();
    }
  }
}

export default DesktopHeader;
