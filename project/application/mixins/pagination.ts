import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import ultimatePagination, { PaginationModelItem, PaginationModelOptions } from 'ultimate-pagination';

@Component({})
export default class MixinPagination extends Vue {
    @Prop()
    public currentPage!: number;

    @Prop()
    public totalPages!: number;

    @Prop()
    public boundaryPagesRange!: number;

    @Prop()
    public siblingPagesRange!: number;

    @Prop()
    public hideEllipsis!: boolean;

    @Prop()
    public hidePreviousAndNextPageLinks!: boolean;

    @Prop()
    public hideFirstAndLastPageLinks!: boolean;

    @Watch('currentPage')
    public onCurrentPageChange(): void {
        this.updatePagination();
    }

    @Watch('totalPages')
    public onTotalPagesChange(): void {
        this.updatePagination();
    }

    @Watch('boundaryPagesRange')
    public onBoundaryPagesRangeChange(): void {
        this.updatePagination();
    }

    @Watch('siblingPagesRange')
    public onSiblingPagesRangeChange(): void {
        this.updatePagination();
    }

    @Watch('hideEllipsis')
    public onHideEllipsisChange(): void {
        this.updatePagination();
    }

    @Watch('hidePreviousAndNextPageLinks')
    public onHidePreviousAndNextPageLinksChange(): void {
        this.updatePagination();
    }

    @Watch('hideFirstAndLastPageLinks')
    public onHideFirstAndLastPageLinksChange(): void {
        this.updatePagination();
    }

    public pagination: PaginationModelItem[] | null = null;

    public mounted(): void {
        this.updatePagination();
    }

    private updatePagination(): void {
        this.pagination = this.getPagination();
    }

    private getPagination(): PaginationModelItem[] {
        const paginationModel: PaginationModelOptions = {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            boundaryPagesRange: this.boundaryPagesRange,
            siblingPagesRange: this.siblingPagesRange,
            hideEllipsis: this.hideEllipsis,
            hidePreviousAndNextPageLinks: this.hidePreviousAndNextPageLinks,
            hideFirstAndLastPageLinks: this.hideFirstAndLastPageLinks
        };

        return ultimatePagination.getPaginationModel(paginationModel);
    }
}
