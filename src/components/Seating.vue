<script>
import Loader from './Loader.vue';
import BackdropImage from './BackdropImage.vue';
import MovieDetails from './MovieDetails.vue';

export default {
    mixins : [ MovieDetails ],
    data(){
        return{
            hasSeatingInfo : false,
        }
    },
    created(){
        
        const options = {
            movieId: this.$route.params.id,
            time : this.$store.state.selectedTime,
            hallId : this.$store.state.selectedMovieHallId,
        };
        if (!options.time || !options.hallId){
            return this.$route.push(`/movie/${options.movieId}/tickets`);
        }

        this.$store.dispatch('fetchSeatingInfo', options).then(() => {
            console.log('... Data Fetched ...');
        })
    },
    components :[
        Loader
    ]
}
</script>

<template>
    <section>
        <loader v-if="hasSeatingInfo" />
    </section>
</template>