import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import cdn from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		cdn({
			modules: [
				"react",
				"react-dom",
				// {
				// 	name: "mermaid",
				// 	var: "mermaid",
				// 	path: "dist/mermaid.min.js",
				// },
			],
		}),
	],
	base: process.env.GITHUB_REPO_NAME ?? "./",
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					r: ["react-router-dom"],
					// r: ["react", "react-dom"],
				},
			},
		},
	},
	esbuild: {
		drop: ["console", "debugger"], // https://esbuild.github.io/api/#drop
	},
});
