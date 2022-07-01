<template>
    <GmapMap
        :center="center"
        :zoom="zoom"
        :options="{ ...options }"
        ref="gmap"
        @bounds_changed="boundsChanged"
    >
        <GmapMarker
            :key="index"
            v-for="(m, index) in mapMarkers"
            :clickable="true"
            :draggable="false"
            :position="{ ...m.position }"
            :icon="{
                url: markerHoverIndex === index ? m.urlBig  : m.url,
            }"
            @click="toggleInfoWindow(m, index, m.data[index])"
            @mouseover="onMarkerEnter(index)"
            @mouseout="onMarkerLeave(index)"
        >
        </GmapMarker>
        <GmapInfoWindow 
            v-if="isPopup"
            :options="infoOptions" 
            :position="infoWindowPos" 
            :opened="infoWinOpen" 
            @closeclick="infoWinOpen=false"
        >
            <slot name="content" :infoContent="infoContent"></slot>
        </GmapInfoWindow>
    </GmapMap>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator';
import { IMarkers } from '~/types/markers.interface';
import { IMapOptions, IContentMarkersPositions, IContentMarkers,IMapOptionsInfoWindow, IContentLocationsCoordinates, IMapStyles } from '~/types/map-options.interface';
import MixinGMapGeocoding from '~/mixins/gmap-geocoding';
import { EMarkerTypes } from '~/constants/marker-types'
import { MAP_STYLES } from '~/constants/map-styles'
import { IDictionary } from '~/types/dictionary.interface';

// @ts-ignore
const pinMain: string = require('~/assets/images/svg/map-marker-outline-red.svg');
// @ts-ignore
const pinSales: string = require('~/assets/images/svg/mantinga-pin.svg');
const pinSalesBig: string = require('~/assets/images/svg/mantinga-pin-big.svg');

@Component({})
export default class ComponentMap extends mixins(MixinGMapGeocoding) {
    @Prop() public zoom!: number;
    @Prop() public coordinates!: IContentLocationsCoordinates | IContentLocationsCoordinates[]
    @Prop() public infoWindowData!: IDictionary<any>
    @Prop({ default: false }) public isPopup!: boolean

    public options: IMapOptions = {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        styles: [ ...MAP_STYLES]
    }
    public infoOptions: IMapOptionsInfoWindow = {
        pixelOffset: {
            width: 0,
            height: -55
        }
    }
    public infoContent: IDictionary<any> | null = null
    public mapMarkers: IContentMarkers[] | IContentMarkers | null = null;
    public center: IContentMarkersPositions | {} = {
        lat: 0,
        lng: 0
    };
    private mapObject: any = null;
    private mapZoom: number | null = null;

    public infoWindowPos: IContentMarkersPositions | null = null;
    public infoWinOpen: boolean = false;
    public currentMidx: number | null = null
    public markerHoverIndex: number | null = null;

    private getMarkers(): Promise<IContentMarkers[] | IContentMarkers> {
        const value: IContentLocationsCoordinates | IContentLocationsCoordinates[] = this.coordinates;
        let result: any = null;

        if(Array.isArray(value)) {
            result = value.map(async gmapItem => {
                if(gmapItem?.location) {
                    const location: any = await this.codeAddress(gmapItem?.location);
                    const url: string = gmapItem?.type === EMarkerTypes.MAIN ? pinMain : pinSales;
                    const urlBig: string = gmapItem?.type === EMarkerTypes.MAIN ? pinMain : pinSalesBig;

                    if(!location) {
                        return null
                    }

                    const results: IContentMarkers = { 
                        position: { 
                            lat: location.lat(),
                            lng: location.lng() 
                        }, 
                        url,
                        urlBig
                    }

                    if(this.infoWindowData) {
                        results.data = this.infoWindowData
                    }

                    return results
                }
            })
        } else {
            result = (async () => {
                if(value?.location) {
                    const location: any = await this.codeAddress(value?.location);
                    const url: string = value?.type === EMarkerTypes.MAIN ? pinMain : pinSales;
                    const urlBig: string = value?.type === EMarkerTypes.MAIN ? pinMain : pinSalesBig;

                    if(!location) {
                        return null;
                    }

                    const results: IContentMarkers = { 
                        position: { 
                            lat: location.lat(),
                            lng: location.lng() 
                        }, 
                        url,
                        urlBig
                    }

                    if(this.infoWindowData) {
                        results.data = this.infoWindowData
                    }

                    return results
                }
            })()            
        }

        return Promise.all(result);
    }

    private scaleToMarkers(map: any): void {
        const bounds = new this.google.maps.LatLngBounds();
        for (let m of (this.mapMarkers as IContentMarkers[])) { bounds.extend(m.position); }
        map.fitBounds(bounds);
    }

    private async codeAddress(address: string): Promise<any> {
        return new Promise(res => {
            this
                .geocoder
                .geocode(
                    { address },
                    function (results: any, status: string) {
                        if (status !== 'OK') {
                            return;
                        }

                        res(results[0]?.geometry?.location || null);
                    }
                );
        });
    }

    public boundsChanged(bounds: any): void {
        if(bounds && this.mapObject && this.mapZoom) {
            this.mapZoom >= this.zoom ? (this.$refs.gmap as any).$mapObject.setZoom(this.zoom) : null;
        }

        return;
    }

    public toggleInfoWindow(marker: IContentMarkers, idx: number, data: IDictionary<any>): void {
        this.infoWindowPos = marker.position;
        this.infoContent = data;
        this.center = marker.position;

        if(this.currentMidx == idx) {
            this.infoWinOpen = !this.infoWinOpen;
        } else {
            this.infoWinOpen = true;
            this.currentMidx = idx;
        }
    }

    public async mounted(): Promise<any> {
        await (this.$refs.gmap as any).$mapPromise.then( async (map: any) => {
            this.mapObject = await (this.$refs.gmap as any).$mapObject;
            await this.getMarkers().then((data: any) => { 
                this.mapMarkers = data.filter((m: IContentMarkers ) => m !== undefined);
                if(data && data.length > 1) {
                    this.scaleToMarkers(map);
                }
                if(data && data.length === 1) {
                    this.center = { ...data[0].position }
                }
                this.mapZoom = map.zoom;
            });
        });
    }

    public onMarkerEnter(index: number): void {
        this.markerHoverIndex = index
    }

    public onMarkerLeave(): void {
        this.markerHoverIndex = null;
    }
}
</script>

<style lang="scss" scoped>
.vue-map-container {
    width: 100%;

    .gm-style {
        > div {
            display: none;
            &:nth-child(15) {
                display: none;
            }
            &:last-child {
                display: none;
            }
        }
    }
}
</style>
