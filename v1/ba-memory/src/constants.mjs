const CanvasArguments = {
    FILL: "FILL",
    FIT: "FIT"
};

const CharacterTag = {
    // Abydos
    SHIROKO: {user: "shiroko", name: "Shiroko"},
    SHIROKO_SWIMSUIT: {user: "shiroko_swimsuit", name: "CH0188"},
    SHIROKO_RIDINGSUIT: {user: "shiroko_ridingsuit", name: "Shiroko_ridingsuit"},
    SHIROKO_TERROR: {user: "shiroko_terror", name: "CH0263"},
    HOSHINO: {user: "hoshino", name: "Hoshino"},
    HOSHINO_SWIMSUIT: {user: "hoshino_swimsuit", name: "Hoshino_swimsuit"},
    HOSHINO_ARMED: {user: "hoshino_armed", name: "CH0258"},
    NONOMI: {user: "nonomi", name: "Nonomi"},
    NONOMI_SWIMSUIT: {user: "nonomi_swimsuit", name: "CH0092"},
    AYANE: {user: "ayane", name: "Ayane"},
    AYANE_SWIMSUIT: {user: "ayane_swimsuit", name: "CH0176"},
    SERIKA: {user: "serika", name: "Serika"},
    SERIKA_NEWYEAR: {user: "serika_newyear", name: "Serika_Newyear"},
    SERIKA_SWIMSUIT: {user: "serika_swimsuit", name: "CH0189"},
    // Gehenna
    KAYOKO: {user: "kayoko", name: "Kayoko"},
    // Trinity
    KOHARU: {user: "koharu", name: "Koharu"},
    MIKA: {user: "mika", name: "CH0069"},
    AZUSA: {user: "azusa", name: "Azusa"},
    AZUSA_SWIMSUIT: {user: "azusa_swimsuit", name: "Azusa_swimsuit"},
    HASUMI: {user: "hasumi", name: "Hasumi"},
    HASUMI_GYM: {user: "hasumi_gym", name: "CH0190"},
}

function queryByName(name) {
    if (name === null) return;
    for (let i in CharacterTag) {
        if (CharacterTag[i]['user'].toLowerCase() === name.toLowerCase() || CharacterTag[i]['name'].toLowerCase() === name.toLowerCase()) {
            let name = CharacterTag[i]['name'];
            console.log(`Found: ${name}`);
            if (name.indexOf('_') === -1 || !name.endsWith('_home')) name += '_home';
            return `./assets/${name}/${name}.skel`;
        }
    }
    throw new Error(`Error when querying with name: ${name}! Please check your input`);
}

exports.CanvasArguments = CanvasArguments;
exports.CharacterTag = CharacterTag;
exports.queryByName = queryByName;