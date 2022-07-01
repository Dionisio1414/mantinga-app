import { IDictionary } from "./dictionary.interface";

export interface IMapOptions {
    zoomControl: boolean,
    mapTypeControl: boolean,
    scaleControl: boolean,
    streetViewControl: boolean,
    rotateControl: boolean,
    fullscreenControl: boolean,
    disableDefaultUi: boolean,
    styles: IMapStyles[]
}

export interface IContentMarkers {
    position: IContentMarkersPositions;
    url: string;
    data?: IDictionary<any>;
    scaledSize?: IContentMarkersScaledSize;
    labelOrigin?: IContentMarkersLabelOrigin;
    urlBig?: string;
}

export interface IContentMarkersScaledSize {
    width: number;
    height: number;
}

export interface IContentMarkersLabelOrigin {
    x: number;
    y: number;
}

export interface IContentMarkersPositions {
    lat: number;
    lng: number;
}

export interface IMapOptionsInfoWindow {
    content?: string;
    pixelOffset: {
        width: number;
        height: number;
    }
}

export interface IContentLocationsCoordinates {
    location: string;
    type: string;
}

export interface IMapStyles {
    "featureType"?: string;
    "elementType": string;
    "stylers": [
        {
            "color"?: string;
            "visibility"?: string;
        }
    ]
}
