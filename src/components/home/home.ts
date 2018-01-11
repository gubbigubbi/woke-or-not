import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';

import FirebaseService from '../../services/firebase';
const firebase = new FirebaseService();

interface Celebrity {
    name: string;
    biography: string;
    profile: string;
    score: number;
}

@Component({
    template: require('./home.html')
})
export class HomeComponent extends Vue {

    item: Celebrity[] = [];
    randomNumber: number;
    private url = 'https://api.themoviedb.org/3/person/';
    protected axios;

    constructor() {
      super();
      this.axios = axios;
    }

    mounted() {
        this.$nextTick(() => {
            this.loadItems();
        });
    }

    private loadItems(): void {

        this.randomNumber = Math.floor(Math.random() * 19001);

        if (!this.item.length) {
            this.axios.get(this.url + this.randomNumber + '?api_key=99b313245443450f9a15d69409942b5d').then((response: AxiosResponse) => {
                this.checkIfCelebrityHasImage(response.data.profile_path);
                this.item = response.data;
                this.item['profile'] = `https://image.tmdb.org/t/p/w320` + response.data.profile_path;
            }, (error) => {
                console.error(error);
            });
        }
    }

    private checkIfCelebrityHasImage(image: string): void {
        image == null && this.loadItems();
    }

    private incrementCount(count: number): void {
        this.item['score'] = count;
        firebase.addCelebrity(this.item);
        this.loadItems();
    }
}
