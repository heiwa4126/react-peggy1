import type React from "react";
import { type Dispatch, type SetStateAction, useState } from "react";

export class MyTextArea {
	private text: string | undefined;
	private setText: Dispatch<SetStateAction<string | undefined>>;

	constructor() {
		this.text = "";
		this.setText = () => {};
	}

	// テキストエリアの値を取得するメソッド
	get = () => {
		return this.text ? this.text : "";
	};

	// テキストエリアの値を設定するメソッド
	set = (newVal: string) => {
		this.setText(newVal);
	};

	draw = ({
		...props
	}: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">) => {
		[this.text, this.setText] = useState<string>();
		return (
			<textarea
				value={this.text}
				onChange={(e) => {
					this.setText(e.target.value);
				}}
				{...props}
			/>
		);
	};
}
