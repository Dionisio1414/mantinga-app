import { Vue, Component } from 'nuxt-property-decorator';
import { gmapApi, loaded } from 'vue2-google-maps';

@Component({})
export default class MixinGMapGeocoding extends Vue {
    private static _geocoder: any = null;

    protected google: any = null
    protected geocoderService: any = null
    protected loaded: any = loaded

    public async created(): Promise<void> {
        // @ts-ignore
        this.google = await this.$gmapApiPromiseLazy({});
    }

    protected get geocoder(): any {
        if(!this.google?.maps?.Geocoder) {
            return null;
         }

        if (!MixinGMapGeocoding._geocoder) {
            MixinGMapGeocoding._geocoder = new this.google.maps.Geocoder();
        }

        return MixinGMapGeocoding._geocoder;
    }

}
