import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import SlideUpDown from 'vue-slide-up-down';

@Component({
    components: {
        SlideUpDown
    }
})
export default class MixinAccordion extends Vue {
    public accordionActive: boolean = false;

    public switchAccordion(): void {
        this.accordionActive = !this.accordionActive;
    }
}
