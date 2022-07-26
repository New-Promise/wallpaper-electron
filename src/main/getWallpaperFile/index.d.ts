export declare class GetWallpaperFile {
    constructor();
    getFileList(): void;
    getFileType(fileName: string): "html" | "image" | "video" | undefined;
    upLoadWallpaper(): void;
    deleteWallpaper(): void;
}
