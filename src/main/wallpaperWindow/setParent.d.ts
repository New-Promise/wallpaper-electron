/// <reference types="node" />
/// <reference types="ref-napi" />
export declare class SetParent {
    workView: any;
    Progman: any;
    winFns: import("win32-ffi/dist/ts").TsWin32Fns<import("win32-ffi/dist/ts/user32/win_user_fns").WinUserFns & import("win32-ffi/dist/ts/kernel32/lib_loader_api_fns").LibLoaderApiFns & import("win32-ffi/dist/ts/kernel32/sys_info_api").SysInfoApiFns & import("win32-ffi/dist/ts/kernel32/process_threads_api_fns").ProcessThreadsApiFns & import("win32-ffi/dist/ts/kernel32/err_handling_api").ErrHandlingApi & Record<string, any>>;
    childWindow: any;
    constructor(childWindow: any);
    createEnumWindowProc(): Buffer;
    bufferCastInt32(buf: any): any;
    close(childWindow: any): void;
}
