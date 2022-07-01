import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';


export default function({ app }: any) {
    Vue.use(VueGoogleMaps, {
        load: {
            key: app.$config.gmapApiKey,
            libraries: 'places'
        },
        installComponents: true
    })    
}