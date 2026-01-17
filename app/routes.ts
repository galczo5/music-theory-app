import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('./routes/home.tsx'),
  route('/play', './routes/chooser.tsx'),
  route('/play/interval-names', './routes/interval-names.tsx')
] satisfies RouteConfig;
