/**
 * type 选项的候选值和行为与平台相关。 可能的值有
 * 在 Linux 上, 可能的类型有 desktop、dock、toolbar、splash、notification。
 * 在 macOS 上，可能的类型是 desktop, textured。
 * textured 类型增加金属色泽的外观 (NSTexturedBackgroundWindowMask).
 * desktop 类型将窗口置于桌面背景级别 (kCGDesktopWindowLevel - 1). 注意，桌面窗口不会接收焦点、键盘或鼠标事件，但您可以使用< 0> globalShortcut < /0 >接收快捷键的消息
 * 在 Windows 上, 可能的类型为 toolbar.
 * */
interface Rectangle {
    height: number;
    width: number;
    x: number;
    y: number;
}
export declare class WallpaperWindow {
    wallpaperWindow: Array<any>;
    winURL: string;
    constructor(winURL: string);
    getScreen(): void;
    creationWindows(params: Rectangle, y: number): void;
}
export {};
