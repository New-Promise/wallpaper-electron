import { Vue } from "vue-property-decorator";
export default class ContentCard extends Vue {
    wallpaperProperty: {
        type: string;
        url: string;
    };
    showMaskLayer: boolean;
    isPlay: boolean;
    mouseover(): void;
    mouseout(): void;
    videoClick(): void;
    setting(): {
        type: string;
        url: string;
    };
    deleteFn(): {
        type: string;
        url: string;
    };
}
