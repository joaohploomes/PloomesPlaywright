async function deleteMultipleItens<T>(callback: (data: T)=> Promise<void>, array: T[]){
	array.forEach(callback);
};

export default deleteMultipleItens;