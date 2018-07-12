<script>
import { mapGetters } from 'vuex';
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
        }
    },
    created(){
        this.movieId = this.$route.params.id;
        this.$store.dispatch('fetchTicketingInfo', this.movieId).then(() => {
            this.hasTicketingInfo= true;
            this.setTicketTypes();
        });
    },
    computed:{
        movieTimes(){
            return this.$store.state.movieTimes[this.movieId];
            
        },
        ticketPrices(){
            return this.$store.state.ticketPrices;
            debugger;
        },
        ...mapGetters([
            'times',
        ])
    },
    
    
    
    methods : {
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
        }
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
                            <h5>{{movieTimes.hallName}}</h5>
                            <p 
                            v-for="time in movieTimes.times"
                            :key="time.index"
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
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
