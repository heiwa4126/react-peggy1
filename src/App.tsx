import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import App1 from "./App1";
import App2 from "./App2";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<App1 />} />
				<Route path="/index.html" element={<App1 />} />
				{/* ↑デフォルトアプリ */}
				<Route path="/1" element={<App1 />} />
				<Route path="/2" element={<App2 />} />
			</Routes>
		</>
	);
}

const links = [
	{ to: "/1", text: "parserを使ってみる (calc)" },
	{ to: "/2", text: "parserを使ってみる (names)" },
];

export const Links = React.memo(({ me }: { me?: string }) => {
	return (
		<ol reversed>
			{links.map((link) => (
				<li key={link.to}>{link.to !== me ? <Link to={link.to}>{link.text}</Link> : link.text}</li>
			))}
		</ol>
	);
});

export default App;
