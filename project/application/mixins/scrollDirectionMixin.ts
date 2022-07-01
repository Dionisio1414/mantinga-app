import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import { debounce } from 'lodash';

@Component({})
export default class MixinScrollDirection extends Vue {
    public lastScrollTop: number = 0;
    public isScrollDown: boolean = false;
    public internalScrollDown: boolean = false;

    @Watch('internalScrollDown', { immediate: true })
    public handleScroll = debounce(this.syncVariables, 200)

    public syncVariables(): void {
        this.isScrollDown = this.internalScrollDown;
    }

    public mounted(): void {
        window.addEventListener('scroll', this.handleScrollDirection, { passive: true })
    }

    public destroyed(): void {
        window.removeEventListener('scroll', this.handleScrollDirection)
    }

    public handleScrollDirection(): void {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.body.scrollHeight;
        const offsetHeight = document.body.clientHeight;
        const limit = scrollHeight - offsetHeight;

        if (scrollTop > limit) return

        scrollTop > this.lastScrollTop ? this.internalScrollDown = true : this.internalScrollDown = false;
        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

}
