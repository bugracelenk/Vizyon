import service from '../services/service';

const state = {
    movies : [],
    movieDetails : {},
    movieTimes : {},
    halls: {},
    soldTickets : {},
    ticketPrices : [],
    selectedMovieId : null,
    selectedTime : null,
    selectedMovieHallId : null,
    selectedTicketCounts : null,
};

const getters = {
    movies(state){
        return state.movies;
    },
    times(state){
        return state.movieTimes;
    },
    groupMovies(){
        const grouped = [];

        state.movies.forEach((movie, index) => {
            if(index % 3 === 0){
                grouped.push([]);
            }

            grouped[grouped.length -1].push(movie);
        });

        return grouped;
    }
};

const mutations = {
    setMovies(state, movies){
        state.movies = movies;
    },
    setMovieDetails(state, payload){
        const {id, data} = payload;
        state.movieDetails[id] = data;
    },
    setMovieTimes(state, payload){
        const {id, data } = payload;
        state.movieTimes[id] = data;
    },
    setSelectedMovieId(state, id){
        state.selectedMovieId = id;
    },
    setTicketPrices(state, prices){
        state.ticketPrices = prices;
    },
    setSelectedTime(state, time){
        state.selectedTime = time;
    },
    setSelectedMovieHallId(state,id){
        state.selectedMovieHallId = id;
    },
    setSelectedTicketOptions(state, tickets){
        state.selectedTicketCounts = tickets;
    },
    setSeatingMap(state,payload){
        const { hallId, seating } = payload;
        state.halls[hallId] = seating;
    },
    setSoldTickets(state, payload){
        const { movieId, time, tickets } = payload;
        state.soldTickets[movieId] = state.soldTickets[movieId] || {};
        state.soldTickets[movieId][time] = tickets;
    }
};

const actions = {
    fetchMovies(context){
        return service.fetchMovies().then((snapshot) => {
            context.commit('setMovies', snapshot.val());
        });
    },
    fetchMovieDetails(context, id){
        return service.fetchMovieDetails(id).then((snapshot) => {
            context.commit('setMovieDetails', {id : id, data : snapshot.val()});
        });
    },
    fetchMovieTimes(context, id){
        return service.fetchMovieTimes(id).then((snapshot) => {
            context.commit('setMovieTimes', {id:id, data: snapshot.val()});
        });
    },
    fetchTicketPrices(context){
        return service.fetchTicketPrices().then((snapshot) => {
            context.commit('setTicketPrices', snapshot.val());
        });
    },
    fetchTicketingInfo(context,id){
        return context.dispatch('fetchTicketPrices').then(() => {
            return context.dispatch('fetchMovieTimes', id);
        });
    },
    fetchSeatMap(context, hallId){
        return service.fetchSeating(hallId).then((snapshot) => {
            return context.commit('setSeatingMap', { hallId, seating : snapshot.val()});
        });
    },
    fetchSoldTickets(context, { movieId, time }){
        return service.fetchSoldTickets({ movieId, time }).then((snapshot) => {
            context.commit('setSoldTickets', { movieId, time, tickets : snapshot.val()});
        });
    },
    fetchSeatingInfo(context, { movieId, time, hallId }){
        return context.dispatch('fetchSeatMap', hallId).then(() => {
            return context.dispatch('fetchSoldTickets', { movieId, time});
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}