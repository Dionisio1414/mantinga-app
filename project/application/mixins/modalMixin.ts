import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class MixinModal extends Vue {
    public mounted(): void {
        document.body.classList.add('disable-body');
    }

    public destroyed(): void {
        document.body.classList.remove('disable-body')
    }
}
