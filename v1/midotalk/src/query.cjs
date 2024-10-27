const CharacterTag = {
    KISAKI: {user: "kisaki", id: 20039},
}

function queryByName(name) {
    for (let i in CharacterTag) {
        if (CharacterTag[i]['user'].toLowerCase() === name.toLowerCase() || CharacterTag[i]['id'] === name) {
            let path = `./assets/${CharacterTag[i]['id']}/${CharacterTag[i]['id']}.json`;
            console.log(`Found: ${CharacterTag[i]['id']} from Key: ${name}`);
            return path;
        }
    }
    throw new Error(`Could not find character with name or ID ${name}. Please check your input!`);
}

export {
    queryByName
}
export default class Query {
}