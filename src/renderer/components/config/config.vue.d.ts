import { Vue } from "vue-property-decorator";
export default class Config extends Vue {
    private isLogin;
    private formData;
    private formInline;
    formInlineRules: {};
    private configData;
    created(): void;
    keyupSubmit(): void;
    close(): void;
    login(): void;
    submit(): void;
    setData(data: object): void;
    reset(): void;
}
