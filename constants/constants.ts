export const COOKIE_EXPIRATION = 1000 * 60 * 60 * 24 * 30; // 30 days

export const ASIDE_ROUTES = [
  { name: "Home", path: "/admin" },
  { name: "Expenses", path: "/admin/expenses" },
  { name: "Categories", path: "/admin/categories" },
];

export const themeScript = `
  (function() {
    function updateTheme() {
      var d = document.documentElement;
      var c = d.classList;
      c.remove('light', 'dark');
      
      var e = localStorage.getItem('theme');
      
      if (e === 'system' || (!e && true)) {
        var t = '(prefers-color-scheme: dark)';
        var m = window.matchMedia(t);
        
        if (m.media !== t || m.matches) {
          d.style.colorScheme = 'dark';
          c.add('dark');
        } else {
          d.style.colorScheme = 'light';
          c.add('light');
        }
      } else if (e) {
        c.add(e || '');
        d.style.colorScheme = e;
      }
    }
    updateTheme();
  })();
`;
