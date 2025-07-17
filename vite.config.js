import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit()
	],
		// ssr: {
		// // 将GSAP相关包标记为外部依赖，避免SSR处理
		// noExternal: ['gsap']
	// },
	// optimizeDeps: {
	// 	// 预构建GSAP包
	// 	include: ['gsap', 'gsap/ScrollTrigger']
	// }
});
