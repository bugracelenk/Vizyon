<script>
import { mapGetters } from 'vuex';

import AppHeader from './AppHeader';
import Loader from './Loader';
import Movie from './Movie';

export default {
    name: 'Home',
    data(){
        return{
            isLoading : true
        }
    },
    components : {
        AppHeader,
        Loader,
        Movie
    },
    computed : {
        ...mapGetters([
            'movies',
            'groupMovies'
        ])
    },
    created(){
        this.$store.dispatch('fetchMovies').then(() => {
            this.isLoading = false;
        });
    }
}   
</script>


<template>
    <section>
        <app-header />
        <loader v-if="isLoading" />
        <section class="container py-5">
            <div v-for="group in groupMovies" :key="group.index" class="card-deck">
                <movie 
                v-for="movie in group" 
                :key="movie.id"
                :movie = "movie"
                />
            </div>
        </section>
    </section>
</template>

<style>
.card-deck{
    margin-bottom: 30px
}
</style>




