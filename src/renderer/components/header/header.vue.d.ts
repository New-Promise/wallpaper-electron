import { Vue } from "vue-property-decorator";
export default class Header extends Vue {
    isMaximize: boolean;
    minimize(): void;
    maximize(): void;
    unmaximize(): void;
    quit(): void;
}
