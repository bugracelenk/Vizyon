<script>
import Loader from './Loader.vue';
import BackdropImage from './BackdropImage.vue';
import Poster from './Poster.vue';

export default {
    data(){
        return{
            hasDetails: false,
            isLoading: true,
        }
    },
    created(){
        this.$store.dispatch('fetchMovieDetails', this.movieId).then(() => {
            this.isLoading = false;
            this.hasDetails = true;
        });
    },
    methods:{
        castAvatar(path){
            return `https://image.tmdb.org/t/p/w45${path}`;
        }
    },
    computed:{
        movieId(){
            return this.$route.params.id;
        },
        movie(){
            return this.$store.state.movieDetails[this.movieId];
        },
        runtime(){
            const {runtime} = this.movie;

            const hours = Math.floor(runtime / 60);
            const minutes = runtime - (60 * hours);

            return `${hours} h ${minutes} m`;
        },
        trailers(){
            const trailers = [];
            this.movie.videos.results.forEach((video) => {
                if(video.type === 'Trailer'){
                    trailers.push({
                        thumbnail: `https://i.ytimg.com/vi/${video.key}/sddefault.jpg`,
                        url: `https://youtube.com/watch?=${video.key}`,
                    });
                }
            });
            return trailers;
        },
        ticketsPath(){
            return `/movie/${this.movieId}/tickets`;
        }
    },
    components:{
        Loader,
        BackdropImage,
        Poster
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
                    <div class="col-sm-8 details">
                        <h2>{{movie.title}}</h2>
                        <p>{{movie.overview}}</p>
                        <div>Runtime : {{this.runtime}}</div>
                        <div>Average Rate : {{ movie.vote_average.toFixed(1)}}</div>
                        <div>Production Companies : {{movie.production_companies[0].name}}</div>
                        <div>Release Date : {{movie.release_date}}</div>
                        <h4 class="mb-3">Cast</h4>
                        <img v-for="person in movie.cast" :key="person.id" :src="castAvatar(person.profile_path)" class="cast-avatar">
                        <h4 class="mb-3">Trailers</h4>
                        <a v-for="trailer in trailers" :key="trailer.index"  :href="trailer.url" class="trailer" target="_blank">
                            <span></span>
                            <img :src="trailer.thumbnail" alt="" />
                        </a>
                        <a :href="ticketsPath" class="btn btn-success">Get Tickets</a>
                    </div>

                </div>
            </div>
        </section>
    </section>
</template>

<style>
.details{
    color:#fff;
}
.cast-avatar{
    width: 45px;
    height: 45px;
    border-radius: 45px;
    border : 2px solid #fff;
    box-sizing: border-box;
    margin-right: 10px;
}
.trailer{
    width: 150px;
    height: 110px;
    display: inline-block; 
    margin-right: 20px;
    position: relative;
}
.trailer img{
    width: 100%;
    height: 100%;
}
.trailer span{
    background-image: url(http://f.acet.me/LXIk.png);
    background-size: 75px 75px;
    position: absolute;
    width: 75px;
    height: 75px;
    top:18px;
    left: 25px;
    display: block;
}
</style>
