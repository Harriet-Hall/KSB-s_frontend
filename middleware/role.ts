import { navigateTo } from "nuxt/app"
export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserSession()
  const adminRoutes = ['/full-access', '/full-access/'];

  console.log("User session:", user.value);

  if (adminRoutes.includes(to.path) && user.value?.role !== 'admin') {
    return navigateTo('/restricted-access'); 
  }
});