type WithId<T> = T & { Id: number }; 

function toMatchArrayId<T> (received: WithId<T>[], array: WithId<T>[]){
    try{
        const receivedIds = received.map((rec)=>rec.Id);
        let hasAllId = true;
        for(const item of array){
            if(!receivedIds.includes(item.Id)){
                hasAllId = false;               
            }
        }
        if(hasAllId){
            return {
                pass: true,
                message: () => "O Array contém todos os IDs esperados"
            }
        }
        return {
            pass: false,
            message: () => "O Array NÃO contém todos os IDs esperados"
        }
    }catch(err){
        return {
            pass: false,
            message: () => "O Array não contém itens com ID"
        }
    }
}

export default toMatchArrayId;
