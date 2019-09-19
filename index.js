const tools = require('./tools')
const pelando = require('./pelando')

async function init() {
    let ret = await tools.readOptions('O que gostaria de fazer? ', [
        "Pegar dados PELANDO.COM"
    ])
    switch (ret) {
        case -1:
            process.exit()
        case 0:
            await fetchAndSaveDataToJSON()
            init()
            break;
        default:
            break;
    }
}

async function fetchAndSaveDataToJSON() {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Iniciando WebScrap')
            var lst = await pelando.fetchData()
            await tools.saveToJson('./output/save.json', lst)
            console.log("WebScrap finalizado com sucesso!")
            resolve()
        } catch (error) {
            console.log(error)
        }
    })
}

init()