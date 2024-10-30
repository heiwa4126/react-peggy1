import { useRef, useState } from "react";
import { PeggySyntaxError, parse } from "../lib/calcParser";
import { Links } from "./App";
import { useCtrlEnter } from "./hooks";

const m1 = "(1+2) * 3";
const m2 = "(1+2) * 3 + 4";
const m3 = "(1+2) * 3 / z";

function App() {
	const [text, setText] = useState<string>("");
	const [result, setResult] = useState<string>("");
	const [errMsg, setErrMsg] = useState<string>("");

	const updateResult = (m?: string) => {
		try {
			const newResult = parse(m || text);
			setResult(String(newResult));
			setErrMsg("");
		} catch (error) {
			setResult("*ERROR*");
			if (error instanceof PeggySyntaxError) {
				setErrMsg(`Syntax Error: ${error.message}
Location: Line ${error.location.start.line}, Column ${error.location.start.column}`);
			} else {
				setErrMsg(`Unexpected error: ${error}`);
			}
		}
	};

	useCtrlEnter(() => {
		updateResult(textareaRef.current?.value);
	}, [text]);

	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const updateTextarea = (newText: string) => {
		if (textareaRef.current) {
			textareaRef.current.value = newText;
			setText(newText);
		}
	};
	const updateAll = (m: string) => {
		updateTextarea(m);
		updateResult(m);
	};

	return (
		<>
			<h1>1. parserを使ってみる (calc)</h1>
			{errMsg ? (
				<p className="errMsg">{errMsg}</p>
			) : result ? (
				<p>{result}</p>
			) : (
				<p>(ここに結果が表示されます)</p>
			)}

			<div className="container">
				<div>
					<textarea
						ref={textareaRef}
						className="ta1"
						// onChange={(e) => setText(e.target.value)} // 再描画されすぎ
					/>
					<br />
					<button type="button" onClick={() => updateResult}>
						更新 (Ctrl+Enter)
					</button>
				</div>
				<div className="button-container">
					<button type="button" onClick={() => updateAll(m1)}>
						← サンプル 1
					</button>
					<button type="button" onClick={() => updateAll(m2)}>
						← サンプル 2
					</button>
					<button type="button" onClick={() => updateAll(m3)}>
						← サンプル 3 (エラー)
					</button>
				</div>
			</div>
			<nav>
				<Links me="/1" />
			</nav>
		</>
	);
}

export default App;
