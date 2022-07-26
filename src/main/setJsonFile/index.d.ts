export declare class SetJsonFile {
    mainWindow: any;
    wallpaperWindow: any;
    constructor(mainWindow: any, wallpaperWindow: any);
    readJsonFile(): Promise<unknown>;
    setJsonFile(): void;
    getJsonFile(): void;
}
