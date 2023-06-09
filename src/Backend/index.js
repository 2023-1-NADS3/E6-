const NodeCache = require('node-cache')
const myCache = new NodeCache();

async function storeVerification(code_path, entity){
    myCache.set(JSON.stringify(code_path), JSON.stringify(entity), 5);
}

async function getVerification(code_path){
    const data = await myCache.get(JSON.stringify(code_path));
    console.log('data: ')
    console.log(data)
    return data;
}



storeVerification({a:'abc', b: 'b'}, {nome: 'joao', email: 'joao@gmail.com'})

getVerification({a: 'abc', b: 'b'})

setTimeout(() => {
    // getVerification('abc')
}, 6000);
