// maskSettings.svelte.js
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// 获取遮罩设置的函数（不使用响应式）
export function getMaskSettings() {
    if (!browser) { // 增加服务器返回默认值检测，确保ssr的兼容性
        return {
            initialMaskPos: "50% 22%",
            initialMaskSize: "3500% 3500%",
            maskPos: "50% 22%",
            maskSize: "20% 20%",
        };
    }

    const width = window.innerWidth;

    if (width <= 768) {
        return {
            initialMaskPos: "50% -1500vh",
            initialMaskSize: "3100% 3100%",
            maskPos: "50% 7vh",
            maskSize: "50% 50%",
        };
    }

    if (width >= 769 && width <= 1024) {
        return {
            initialMaskPos: "50% -1700vh",
            initialMaskSize: "3500% 3500%",
            maskPos: "50% 17vh",
            maskSize: "30% 30%",
        };
    }

    return {
        initialMaskPos: "50% 22%",
        initialMaskSize: "3500% 3500%",
        maskPos: "50% 22%",
        maskSize: "20% 20%",
    };
}

// 创建可重用的响应式遮罩设置 hook（使用传统的 Svelte store）
// export function useMaskSettings() {
//     const screenWidth = writable(browser ? window.innerWidth : 1024);
//     const settings = writable(getMaskSettings());

//     if (browser) {
//         const updateWidth = () => {
//             const newWidth = window.innerWidth;
//             screenWidth.set(newWidth);
//             settings.set(getMaskSettings());
//         };

//         window.addEventListener('resize', updateWidth);

//         // 返回清理函数
//         const cleanup = () => {
//             window.removeEventListener('resize', updateWidth);
//         };

//         return {
//             screenWidth,
//             settings,
//             cleanup
//         };
//     }

//     return {
//         screenWidth,
//         settings,
//         cleanup: () => {} // 空的清理函数
//     };
// }

// // 或者，如果你想要一个更简单的方法，可以使用这个版本
// export function createMaskSettingsStore() {
//     const store = writable(getMaskSettings());
    
//     if (browser) {
//         const updateSettings = () => {
//             store.set(getMaskSettings());
//         };

//         window.addEventListener('resize', updateSettings);

//         // 返回 store 和清理函数
//         return {
//             subscribe: store.subscribe,
//             cleanup: () => {
//                 window.removeEventListener('resize', updateSettings);
//             }
//         };
//     }

//     return {
//         subscribe: store.subscribe,
//         cleanup: () => {}
//     };
// }