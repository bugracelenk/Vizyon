<script>
import MovieDetails from './MovieDetails.vue';
import Loader from './Loader.vue';
import BackdropImage from './BackdropImage.vue';
import Poster from './Poster.vue';

export default {
    mixins : [ MovieDetails ],
    data(){
        return{
            isLoading : true,
            selectedTime : null,
            selectedTickets : [],
            hasTicketingInfo : false,
            movieTimes : {}
        }
    },
    created(){
        this.movieId = this.$route.params.id;
        this.$store.dispatch('fetchTicketingInfo', this.movieId).then(() => {
            this.hasTicketingInfo= true;
            this.movieTimes = this.$store.state.movieTimes[this.movieId];
            this.setTicketTypes();
        });
    },
    computed:{
        movieTimes(){
            return this.$store.state.movieTimes[this.movieId];
        },
        ticketPrices(){
            return this.$store.state.ticketPrices;
        },
        seatSelectionPath() {
            return `/movie/${this.movieId}/seat`;
        },
        isTimeAndTicketCountSelected() {
            let selected = false;

            for (const key in this.selectedTickets) {
                if (this.selectedTickets[key] > 0) {
                selected = true;
                }
            }

            return selected && this.selectedTime;
        }
    },
    methods : {
        selectTime(time){
            this.selectedTime = time;
        },
        addTicket(type){
            this.selectedTickets[type] = ++ this.selectedTickets[type];
        },
        removeTicket(type){
            this.selectedTickets[type] = Math.max(--this.selectedTickets[type], 0);
        },
        setTicketTypes(){
            const types = {};

            this.ticketPrices.forEach((ticket) => {
                types[ticket.label] = 0;
            });

            this.selectedTickets = types;
        },
        navigateToSeatSelection() {
            this.$store.commit('setSelectedTime', this.selectedTime);
            this.$store.commit('setSelectedTicketOptions', this.selectedTickets);
            this.$store.commit('setSelectedMovieHallId', this.movieTimes.hallId);
            debugger;
        },
    },
    components : {
        Loader,
        BackdropImage
    }

}
</script>


<template>
    <section>
        <loader v-if="isLoading" />
        <section v-if="hasDetails">
            <backdrop-image :imageName="movie.backdrop_path"></backdrop-image>
            <div class="container pt-5">
                <div class="row">
                    <div class="col-sm-4">
                        <poster :posterName="movie.poster_path" />
                    </div>
                    <div class="col-sm-8">
                        <div class="movie-details">
                            <h2 class="movie-title">{{movie.original_title}}</h2>
                            <p>{{movie.overview}}</p>
                        </div>
                        <div class="movie-times">
                            <h5>{{this.movieTimes.hallName}}</h5>
                            <p 
                            v-for="time in this.movieTimes.times"
                            :key="time.index"
                            @click="selectTime(time)"
                            :class="{ selected: time === selectedTime}"
                            >
                            {{time}}
                            </p>
                        </div>
                        <div class="ticket-types">
                            <div v-for="ticket in ticketPrices" :key="ticket.index">
                                <p @click="removeTicket(ticket.label)">-</p>
                                <div class="text">
                                    <span class="label">
                                        <span class="count" v-if="selectedTickets[ticket.label] > 0">
                                            {{selectedTickets[ticket.label]}}
                                        </span>
                                        {{ticket.label}}
                                    </span>
                                    <span class="price">{{parseInt(ticket.price, 10).toFixed(2)}} TL</span>
                                </div>
                                <p @click="addTicket(ticket.label)">+</p>
                            </div>
                        </div>
                        <a @click="navigateToSeatSelection" :href="seatSelectionPath"> Select Your Seats</a>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<style>
.movie-times p {
  display: inline-block;
  padding: 5px 20px;
  border: 1px solid #FFF;
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
}
.movie-times p.selected,
.movie-times p:hover,
.ticket-types p:not(.disabled):hover {
  background-color: #FFF;
  color: #000;
}
.ticket-types {
  margin-top: 30px;
}
.ticket-types p {
  font-size: 22px;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid #FFF;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  top: -15px;
}
.ticket-types p.disabled {
  opacity: .33;
}
.ticket-types .text {
  display: inline-block;
  width: 175px;
  text-align: center;
}
.ticket-types .label {
  display: block;
  font-size: 24px;
  font-weight: bold;
}
</style>