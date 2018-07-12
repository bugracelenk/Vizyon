import Home from '../components/Home.vue';
import MovieDetails from '../components/MovieDetails.vue';
import TicketSelection from '../components/TicketSelection.vue';

export default {
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path : '/movie/:id',
      component : MovieDetails
    },
    {
      path : '/movie/:id/tickets',
      component: TicketSelection
    }
  ],
  mode: 'history',
}
