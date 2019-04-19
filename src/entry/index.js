import '@babel/polyfill';
import 'jquery';

// Css bundle
import './index.scss';

// Common JS module / helpers
import '../common/js/init';
import '../common/js/helpers/debounce';
import '../common/js/helpers/register-global-events';
import '../common/js/helpers/viewport-size';
import '../common/js/helpers/cookie';

// Global JS modules


// Component JS modules:
import '../components';

window.$ = $;
