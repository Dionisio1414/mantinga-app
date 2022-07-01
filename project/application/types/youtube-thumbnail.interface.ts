export interface IYoutubeThumbnailItem {
    url: string;
    height: number;
    width: number;
}

export interface IYoutubeThumbnailOutput {
    default: IYoutubeThumbnailItem;
    high: IYoutubeThumbnailItem;
    medium: IYoutubeThumbnailItem;
}

