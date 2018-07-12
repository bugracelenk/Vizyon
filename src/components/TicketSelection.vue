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
        }
    },
    created(){
        this.movieId = this.$route.params.id;
        this.$store.dispatch('fetchMovieTimes', this.movieId).then(() => {
            this.isLoading = false;
        });
    },
    computed:{
        movieTimes(){
            return this.$store.state.movieTimes[this.movieId];
        }
    },
    
    methods : {

    },

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
                    <div class="col-sm-8"></div>
                </div>
            </div>
        </section>
    </section>
</template>
