import ADAHidden from './plugins/ada-hidden';
import EqualHeight from './plugins/equal-height';
import BgLoader from './plugins/background-loader';
import Accordion from './accordion/accordion';
import Header from './header/header';

new ADAHidden('[data-js-ada-hidden]');
new EqualHeight('[data-js-equal-height]');
new BgLoader('[data-js-bg-loader]');
new Accordion('[data-js-accordion]');
new Header();
