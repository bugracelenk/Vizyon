import Home from '../components/Home.vue';
import MovieDetails from '../components/MovieDetails.vue';
import TicketSelection from '../components/TicketSelection.vue';
import Seating from '../components/Seating.vue';

export default {
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path : '/movie/:id',
      component : MovieDetails,
    },
    {
      path : '/movie/:id/tickets',
      component: TicketSelection,
    },
    {
      path : 'movie/:id/seat',
      component : Seating,
    },
  ],
  mode: 'history',
}
