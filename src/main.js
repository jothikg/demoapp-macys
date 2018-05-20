import './utils/setup';
import Mn from 'backbone.marionette';
import Radio from 'backbone.radio';
import { createRouter, middleware } from 'marionette.routing';
import IndexRoute from './app';
import ListRoute from './list';
import ListView from './list/view';
import DetailRoute from './detail';
import ReviewRoute from './review';

export const router = createRouter({
  log: true,
  logError: true
});

router.map(route => {
  route('index', { path: '/', routeClass: IndexRoute }, () => {
    route('browse', { routeClass: ListRoute, abstract: true }, () => {
      route('browse.default', {path: '', viewClass: ListView});
    });
    route('detail', { path: '/product/:productid', routeClass: DetailRoute });
    route('review', { path: '/review', routeClass: ReviewRoute });
  });
});

let app = new Mn.Application({
  region: '#app-content'
});

router.rootRegion = app.getRegion();

router.use(middleware);

Radio.channel('router').on('before:transition', transition => {
  if (transition.path === '/') {
    transition.redirectTo('browse.default')
  }
});

Radio.channel('transit').on('go:order', () => {
  router.transitionTo('review');
});

router.listen();
