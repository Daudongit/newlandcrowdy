'use strict';
!(function (r, u) {
//   (r.Package.name = 'DashLite'), (r.Package.version = '1.1.0');
  var c = u (window),
    l = u ('body'),
    d = u (document),
    t = 'nk-menu',
    f = 'nk-header-menu',
    o = 'nk-aside',
    g = 'nk-sidebar',
    e = 'nk-sidebar-mobile',
    n = 'nk-sidebar-fat',
    i = 'nk-content-sidebar',
    p = r.Break;
  function h (e, n) {
    return Object.keys (n).forEach (function (t) {
      e[t] = n[t];
    }), e;
  }
  (r.ClassBody = function () {
    r.AddInBody (o), r.AddInBody ('nk-apps-sidebar'), r.AddInBody (
      g
    ), r.AddInBody (n);
  }), (r.ClassNavMenu = function () {
    r.BreakClass ('.' + f, p.lg, {timeOut: 0}), r.BreakClass ('.' + o, p.lg, {
      timeOut: 0,
    }), r.BreakClass ('.' + i, p.lg, {timeOut: 0}), r.BreakClass (
      '.' + g,
      p.lg,
      {timeOut: 0, classAdd: e}
    ), r.BreakClass ('.' + n, p.xl, {
      timeOut: 0,
      classAdd: e,
    }), c.on ('resize', function () {
      r.BreakClass (
        '.' + f,
        p.lg
      ), r.BreakClass ('.' + o, p.lg), r.BreakClass ('.' + i, p.lg), r.BreakClass ('.' + g, p.lg, {classAdd: e}), r.BreakClass ('.' + n, p.xl, {classAdd: e});
    });
  })
//   , (r.TGL.ddmenu = function (t, e) {
//     var n = t || '.nk-menu-toggle',
//       i = {active: 'active', self: 'nk-menu-toggle', child: 'nk-menu-sub'},
//       a = e ? h (i, e) : i;
//     u (n).on ('click', function (t) {
//       (r.Win.width < p.lg ||
//         u (this).parents ().hasClass (g) ||
//         u (this).parents ().hasClass (o)) &&
//         r.Toggle.dropMenu (u (this), a), t.preventDefault ();
//     });
//   })
// , (r.init = function () {
//     r.coms.docReady.push (r.OtherInit), r.coms.docReady.push (
//       r.Prettify
//     ), r.coms.docReady.push (r.ColorBG), r.coms.docReady.push (
//       r.ColorTXT
//     ), r.coms.docReady.push (r.Copied), r.coms.docReady.push (
//       r.Ani.init
//     ), r.coms.docReady.push (r.TGL.init), r.coms.docReady.push (
//       r.BS.init
//     ), r.coms.docReady.push (r.Validate.init), r.coms.docReady.push (
//       r.Picker.init
//     ), r.coms.docReady.push (r.Addons.Init);
//   }), r.init ();
}) ({NioApp}, jQuery);
