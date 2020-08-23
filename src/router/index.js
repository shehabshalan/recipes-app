import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Index'
import AddRecipes from '@/components/AddRecipes'
import EditRecipe from '@/components/EditRecipe'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/addrecipes',
    name: 'AddRecipes',
    component: AddRecipes
  },
  {
    path: '/editrecipe/:recipe_slug',
    name: 'EditRecipe',
    component: EditRecipe
  },


]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
