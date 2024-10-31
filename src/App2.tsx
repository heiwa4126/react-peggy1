import React, { useState } from "react";
import { SyntaxError as PeggySyntaxError, parse } from "../lib/namesParser";
import { Links } from "./App";
import { useCtrlEnter } from "./hooks";

//#region サンプルデータ
const ex1 = `Name: foo Age: 0;
Name: hoge Age: 10;
Name: たろう Age: 98;`;
const ex2 = "Name: foo Age: 100; Name: hoge Age: 10;";
const ex3 = `Name: foo Age: 0;
Name: hoge Age: ;
Name: たろう Age: 98;`; // エラーのサンプル
//#endregion

interface namesResult {
	result: string;
	errMsg: string;
}

async function parseNames(input: string): Promise<namesResult> {
	try {
		const result = parse(input);
		return { result: JSON.stringify(result), errMsg: "" };
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
	const [result, setResult] = useState<namesResult>({ result: "", errMsg: "" });

	const calcResult = (input: string) => {
		parseNames(input).then((newResult) => {
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
			<h1>2. parserを使ってみる (names)</h1>
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
				<Links here="/2" />
			</nav>
		</>
	);
}

export default App;
