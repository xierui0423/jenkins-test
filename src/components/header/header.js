import DesktopHeader from './desktop/desktop-header';
import MobileHeader from './mobile/mobile-header';

class Header {
  constructor() {
    new DesktopHeader('[data-js-desktop-header]');
    new MobileHeader('[data-js-mobile-header]');
  }
}

export default Header;
