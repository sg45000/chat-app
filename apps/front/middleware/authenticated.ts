import {Context} from '@nuxt/types';

export default function (ctx: Context): void {
  if(ctx.route.path === '/login' || ctx.route.path === '/signup') {
    return;
  }
  if(!ctx.app.$accessor.auth.isAuthenticated) {
    return ctx.redirect('login');
  }
}
