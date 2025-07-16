async function generateMultipleItens<T>(callback: (data: T) => Promise<T>, mockFunction: () => T, length: number) {
	const result = await Promise.all(
		Array.from({ length }).map(() => {
			const data = mockFunction();
			return callback(data);
		}),
	);
	return result;
}

export default generateMultipleItens;
