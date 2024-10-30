import { useState } from "react";
import { PeggySyntaxError, parse } from "../lib/calcParser";
import { Links } from "./App";
import { MyTextArea } from "./MyTextArea";
import { useCtrlEnter } from "./hooks";

const m1 = "(1+2) * 3";
const m2 = "(1+2) * 3 + 4";
const m3 = "(1+2) * 3 / z";

function App() {
	const [result, setResult] = useState<string>("");
	const [errMsg, setErrMsg] = useState<string>("");

	const ta1 = new MyTextArea();

	const calcResult = (m: string) => {
		try {
			const newResult = parse(m);
			setResult(String(newResult));
			setErrMsg("");
		} catch (error) {
			setResult("");
			if (error instanceof PeggySyntaxError) {
				setErrMsg(`Syntax Error: ${error.message}
Location: Line ${error.location.start.line}, Column ${error.location.start.column}`);
			} else {
				setErrMsg(`Unexpected error: ${error}`);
			}
		}
	};
	const updateResult = () => calcResult(ta1.getText());
	useCtrlEnter(updateResult, []);

	const updateTxtAndResult = (m: string) => {
		ta1.setText(m);
		calcResult(m);
	};

	return (
		<>
			<h1>1a. parserを使ってみる (calc)</h1>
			{errMsg ? (
				<p className="errMsg">{errMsg}</p>
			) : result ? (
				<p>{result}</p>
			) : (
				<p>(ここに結果が表示されます)</p>
			)}

			<div className="container">
				<div>
					<ta1.draw className="ta1" />
					<br />
					<button type="button" onClick={updateResult}>
						更新 (Ctrl+Enter)
					</button>
				</div>
				<div className="button-container">
					<button type="button" onClick={() => updateTxtAndResult(m1)}>
						← サンプル 1
					</button>
					<button type="button" onClick={() => updateTxtAndResult(m2)}>
						← サンプル 2
					</button>
					<button type="button" onClick={() => updateTxtAndResult(m3)}>
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
