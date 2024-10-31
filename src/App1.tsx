import React, { useState } from "react";
import { PeggySyntaxError, parse } from "../lib/calcParser";
import { Links } from "./App";
import { useCtrlEnter } from "./hooks";

//#region サンプルデータ
const ex1 = "(1+2) * 3";
const ex2 = "(1+2) * 3 + 4";
const ex3 = "(1+2) * 3 / z"; // エラーのサンプル
//#endregion

interface calcResult {
	result: string;
	errMsg: string;
}

async function parseCalc(input: string): Promise<calcResult> {
	try {
		const newResult = parse(input);
		return { result: String(newResult), errMsg: "" };
	} catch (error) {
		const errMsg =
			error instanceof PeggySyntaxError
				? `Syntax Error: ${error.message}
	Location: Line ${error.location.start.line}, Column ${error.location.start.column}`
				: `Unexpected error: ${error}`;
		return { result: "", errMsg };
	}
}

function App() {
	const [text, setText] = useState<string>("");
	const [result, setResult] = useState<calcResult>({ result: "", errMsg: "" });

	const calcResult = (input: string) => {
		parseCalc(input).then((newResult) => {
			setResult(newResult);
		});
	};

	const updateResult = () => calcResult(text);
	useCtrlEnter(updateResult, []);

	const updateTxtAndResult = (newText: string) => {
		setText(newText);
		calcResult(newText);
	};

	const BtnEx = React.memo(({ ex, lbl }: { ex: string; lbl: string }) => {
		return (
			<button type="button" onClick={() => updateTxtAndResult(ex)}>
				{lbl}
			</button>
		);
	});

	return (
		<>
			<h1>1. parserを使ってみる (calc)</h1>
			{result.errMsg ? (
				<p className="errMsg">{result.errMsg}</p>
			) : result.result ? (
				<p>{result.result}</p>
			) : (
				<p>(ここに結果が表示されます)</p>
			)}

			<div className="container">
				<div>
					<textarea
						className="ta1"
						placeholder="(ここに数式を入力して)"
						value={text}
						onChange={(e) => {
							setText(e.target.value);
						}}
					/>
					<br />
					<button type="button" onClick={updateResult}>
						更新 (Ctrl+Enter)
					</button>
				</div>
				<div className="button-container">
					<BtnEx ex={ex1} lbl="←サンプル 1" />
					<BtnEx ex={ex2} lbl="←サンプル 2" />
					<BtnEx ex={ex3} lbl="←サンプル 3 (エラー)" />
				</div>
			</div>
			<nav>
				<Links here="/1" />
			</nav>
		</>
	);
}

export default App;
