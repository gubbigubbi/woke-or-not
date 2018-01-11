import { Component, Vue } from 'vue-property-decorator';

import FirebaseService from '../../services/firebase';
const firebase = new FirebaseService();

interface Celebrity {
    name: string;
    biography: string;
    profile: string;
    score: number;
}

@Component({
    template: require('./list.html')
})
export class ListComponent extends Vue {

    items: Array<any> = [];

    constructor() {
      super();
    }

    mounted() {
        this.$nextTick(() => {
            this.loadItems();
        });
    }

    private loadItems(): void {
    
        firebase.getCelebritiesRef().orderByChild('score').limitToFirst(10).on('child_added', snapshot => {
            this.items.push({
                name: snapshot.val().name,
                score: snapshot.val().score,
                profile: snapshot.val().profile
            });
            console.log(snapshot.key);
        });
    }

}
