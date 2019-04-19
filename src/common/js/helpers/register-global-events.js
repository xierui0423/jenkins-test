$.util.registerWindowResize = (() => {
  const resizeHandlers = [];

  $.util.triggerResize = () => {
    resizeHandlers.forEach((handler) => {
      handler();
    });
  };

  return (callback) => {
    resizeHandlers.push(callback);
    if (resizeHandlers.length === 1) {
      $(window).on('resize', (e) => {
        resizeHandlers.forEach((handler) => {
          handler(e);
        });
      });
    }
  };
})();


$.util.registerGlobalScroll = (() => {
  const globalScrollHandlers = [];
  return (callback) => {
    globalScrollHandlers.push(callback);
    if (globalScrollHandlers.length === 1) {
      $(document).on('scroll', (e) => {
        globalScrollHandlers.forEach((handler) => {
          handler(e);
        });
      });
    }
  };
})();

$.util.registerGlobalClick = (() => {
  const globalClickHandlers = [];
  return (callback) => {
    globalClickHandlers.push(callback);
    if (globalClickHandlers.length === 1) {
      $('html').on('click', (e) => {
        globalClickHandlers.forEach((handler) => {
          handler(e);
        });
      });
    }
  };
})();
