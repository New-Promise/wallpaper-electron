import { Vue } from 'vue-property-decorator';
interface Type {
    type: string;
    url: string;
}
export default class Home extends Vue {
    classify: string;
    wallpaperJson: {
        atWallpaper: Type;
        wallpaperFile: Array<Type>;
    };
    fileCardList: Array<Type>;
    upLoadAccept: string;
    created(): void;
    getJsonFileSuccess(): void;
    returnFileList(): void;
    butClick(params: string): void;
    classification(): void;
    setting(params: Type): void;
    beforeUpload(file: File): boolean;
    upLoadWallpaperSuccess(): void;
    upLoadWallpaperError(): void;
    deleteFn(params: {
        url: string;
    }): void;
    deleteWallpaperError(): void;
    deleteWallpaperSuccess(): void;
}
export {};
