// Single source of truth for the API host.
//
// Dev:  leave REACT_APP_API_URL unset -> API_BASE_URL is '' -> requests are
//       same-origin and the CRA dev-server proxy (package.json) forwards them
//       to the local Django backend on :8000.
// Prod: set REACT_APP_API_URL (e.g. https://<app>.onrender.com) at build time
//       (Vercel project env) so the built bundle talks to the live backend.
export const API_BASE_URL = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');

// Prefix a relative API path (e.g. '/api/orders') with the configured host.
export const apiUrl = (path = '') => `${API_BASE_URL}${path}`;

// Resolve an image/media path returned by the API. The backend returns
// root-relative paths ('/images/x.jpg' in dev, '/static/images/x.jpg' in prod).
// In production these MUST be prefixed with the backend host, otherwise the
// browser requests them from the frontend origin (Vercel) and they 404.
// Only root-relative paths are rewritten; absolute (http/https), blob: and
// data: URLs (e.g. upload previews) are returned untouched.
export const mediaUrl = (path) => (path && path.startsWith('/') ? apiUrl(path) : path);
