import React, { useState } from "react";
import { PeggySyntaxError, parse } from "../lib/calcParser";
import { Links } from "./App";
import { MyTextArea } from "./MyTextArea";
import { useCtrlEnter } from "./hooks";

const m1 = "(1+2) * 3";
const m2 = "(1+2) * 3 + 4";
const m3 = "(1+2) * 3 / z";

const ta1 = new MyTextArea(); // コンポーネント外で宣言すること

function App() {
	const [result, setResult] = useState<string>("");
	const [errMsg, setErrMsg] = useState<string>("");

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
	const updateResult = () => calcResult(ta1.get());
	useCtrlEnter(updateResult, []);

	const updateTxtAndResult = (m: string) => {
		ta1.set(m);
		calcResult(m);
	};

	const BtnEx = React.memo(({ m, label }: { m: string; label: string }) => {
		return (
			<button type="button" onClick={() => updateTxtAndResult(m)}>
				{label}
			</button>
		);
	});

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
					<ta1.draw className="ta1" placeholder="(ここに数式を入力して)" />
					<br />
					<button type="button" onClick={updateResult}>
						更新 (Ctrl+Enter)
					</button>
				</div>
				<div className="button-container">
					<BtnEx m={m1} label="← サンプル 1" />
					<BtnEx m={m2} label="← サンプル 2" />
					<BtnEx m={m3} label="← サンプル 3 (エラー)" />
				</div>
			</div>
			<nav>
				<Links me="/1" />
			</nav>
		</>
	);
}

export default App;
