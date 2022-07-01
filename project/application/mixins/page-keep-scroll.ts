import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class MixinPageKeepScroll extends Vue {
    private setDocumentElementScrollTop(): void {
        const scrollTopElement: number = document.documentElement.scrollTop
        localStorage.setItem('scrollPosition', String(scrollTopElement))
    }

    private getDocumentElementScrollTop(): void {
        const scrollPosition: string | null = localStorage.getItem('scrollPosition')

        if(scrollPosition) {
            window.scrollTo({ top: +scrollPosition, behavior: "smooth" })
            localStorage.removeItem('scrollPosition')
        }
    }

    public destroyed(): void {
        this.setDocumentElementScrollTop()
    }

    public mounted(): void {
        this.getDocumentElementScrollTop()
    }
}
