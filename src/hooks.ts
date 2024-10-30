import { useCallback, useEffect } from "react";

// Ctrl+Enterで何かをするカスタムフック
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useCtrlEnter(callback: () => void, dependencies: any[] = []) {
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "Enter") {
				callback();
			}
		},
		[callback],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown, ...dependencies]);
}
