async function deleteMultipleItens<T>(callback: (data: T) => Promise<unknown>, array: T[]) {
    await Promise.all(array.map(callback));
}

export default deleteMultipleItens;