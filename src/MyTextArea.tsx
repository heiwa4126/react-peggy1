import React from "react";

export class MyTextArea {
	private textAreaRef: React.RefObject<HTMLTextAreaElement>;

	constructor() {
		this.textAreaRef = React.createRef(); // refの初期化
	}
	// テキストエリアの値を取得するメソッド
	getText = () => {
		return this.textAreaRef.current ? this.textAreaRef.current.value : "";
	};

	// テキストエリアの値を設定するメソッド
	setText = (newValue: string) => {
		if (this.textAreaRef.current) {
			this.textAreaRef.current.value = newValue;
		}
	};

	draw = ({
		...props
	}: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "ref">) => {
		return <textarea ref={this.textAreaRef} value={this.s} {...props} />;
	};
}
