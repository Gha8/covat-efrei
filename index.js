import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import introduction from '../components/introduction.vue';
import Accueil from '../components/accueil.vue';
import ProfilUser from '../components/ProfilUser.vue';
import ListeTrajet from '../components/ListeTrajet.vue';

const routes = [
  {
    path: '/',
    redirect: '/introduction', 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  { 
    path: '/trajets', 
    component: ListeTrajet, 
    meta: { requiresAuth: true }
  },
  {
    path: '/accueil',  
    name: 'Accueil',
    component: Accueil,
  },
  { 
    path: '/profil', 
    component: ProfilUser, 
    meta: { requiresAuth: true } 
  },
  {
     path: '/ajout-trajet', 
     component: AjoutTrajet, 
     meta: { requiresAuth: true } 
  },
  {
    path: '/signup',  
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/introduction',  
    name: 'Introduction',
    component: introduction,
  },
  { 
    path: '/about', 
    component: AboutUs,
    name: 'About'
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
// 🔹 Vérifier si l'utilisateur est connecté avant d'accéder à certaines pages
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('userId'); 

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirige vers login si l'utilisateur n'est pas authentifié
  } else {
    next();
  }
});

export default router;
