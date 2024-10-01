const CanvasArguments = {
    FILL: "FILL",
    FIT: "FIT"
};

const CharacterTag = {
    // -------------- Abydos ---------------- 阿拜多斯
    SHIROKO: {user: "shiroko", name: "Shiroko"},
    SHIROKO_SWIMSUIT: {user: "shiroko_swimsuit", name: "CH0188"},
    SHIROKO_RIDINGSUIT: {user: "shiroko_ridingsuit", name: "Shiroko_ridingsuit"},
    SHIROKO_TERROR: {user: "shiroko_terror", name: "CH0263"}, // TODO 存在二次处理过的模型
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
    // -------------- Gehenna ---------------- 格赫娜
    // Handyman 68 便利店68
    ARU: {user: "aru", name: "Aru"},
    ARU_NEWYEAR: {user: "aru_newyear", name: "Aru_newyear"},
    ARU_DRESS: {user: "aru_dress", name: "CH0240"},
    KAYOKO: {user: "kayoko", name: "Kayoko"},
    KAYOKO_NEWYEAR: {user: "kayoko_newyear", name: "CH0086"},
    KAYOKO_DRESS: {user: "kayoko_dress", name: "CH0239"}, // TODO 存在多个二次处理版本的模型
    MUTSUKI: {user: "mutsuki", name: "Mutsuki"},
    MUTSUKI_NEWYEAR: {user: "mutsuki_newyear", name: "mutsuki_newyear"},
    HARUKA: {user: "haruka", name: "Haruka"},
    HARUKA_NEWYEAR: {user: "haruka_newyear", name: "CH0087"},
    // School Lunch Club 供给部
    FUUKA: {user: "fuuka", name: "Fuuka"},
    FUUKA_NEWYEAR: {user: "fuuka_newyear", name: "CH0177"},
    JURI: {user: "juri", name: "Juri"},
    // Gourmet Research Society 美食研究会
    // 官方图册上写的是 Akashi Junko，但是模型扒下来就是 Zunko，为了消除歧义故两种标识符都添加在此
    JUNKO: {user: "junko", name: "Zunko"},
    ZUNKO: {user: "zunko", name: "Zunko"},
    JUNKO_NEWYEAR: {user: "junko_newyear", name: "CH0192"},
    ZUNKO_NEWYEAR: {user: "zunko_newyear", name: "CH0192"},
    HARUNA: {user: "haruna", name: "Haruna"},
    HARUNA_NEWYEAR: {user: "haruna_newyear", name: "CH0191"},
    HARUNA_GYM: {user: "haruna_gym", name: "CH0193"},
    IZUMI: {user: "izumi", name: "Izumi"},
    IZUMI_SWIMSUIT: {user: "izumi_swimsuit", name: "Izumi_swimsuit"},
    AKARI: {user: "akari", name: "akari"}, // TODO 明里的回忆大厅稍微有些问题，可能是需要把 home 和 bg 合并到一起
    AKARI_NEWYEAR: {user: "akari_newyear", name: "CH0196"},
    // Disciplinary Committee 风纪委员会
    HINA: {user: "hina", name: "Hina"},
    HINA_SWIMSUIT: {user: "hina_swimsuit", name: "CH0063"},
    HINA_DRESS: {user: "hina_dress", name: "CH0230"},
    AKO: {user: "ako", name: "Ako"},
    AKO_DRESS: {user: "ako_dress", name: "CH0231"},
    IORI: {user: "iori", name: "Iori"},
    IORI_SWIMSUIT: {user: "iori_swimsuit", name: "CH0064"},
    CHINATSU: {user: "chinatsu", name: "Chinatsu"},
    CHINATSU_HOTSPRING: {user: "chinatsu_hotspring", name: "CH0163"},
    // Pandemonium Society 万魔殿
    MAKOTO: {user: "makoto", name: "CH0079"},
    IROHA: {user: "iroha", name: "CH0156"},
    IBUKI: {user: "ibuki", name: "Ibuki"},
    // Hot Spring Development Department 温泉开发部
    KASUMI: {user: "kasumi", name: "CH0089"},
    MEGU: {user: "megu", name: "CH0088"},
    // Emergency Medicine Club 救急医学部
    SENA: {user: "sena", name: "CH0081"},
    // Sparkle Club 亮闪闪部
    KIRARA: {user: "kirara", name: "Kirara"},
    // --------------- Trinity ----------------- 圣三一
    // Tea Party 茶话会
    MIKA: {user: "mika", name: "CH0069"},
    NAGISA: {user: "nagisa", name: "Nagisa"},
    // TODO 妃咲都实装了圣娅怎么还没动静
    // Sisterhood 姐妹会
    SAKURAKO: {user: "sakurako", name: "Sakurako"},
    MARI: {user: "mari", name: "mari"},
    MARI_GYM: {user: "mari_gym", name: "CH0186"},
    HINATA: {user: "hinata", name: "Hinata"},
    HINATA_SWIMSUIT: {user: "hinata_swimsuit", name: "CH0210"},
    // Justice Realization Committee 正义实现委员会
    // 小春划在了补习部下
    TSURUGI: {user: "tsurugi", name: "Tsurugi"},
    HASUMI: {user: "hasumi", name: "Hasumi"},
    HASUMI_GYM: {user: "hasumi_gym", name: "CH0190"},
    MASHIRO: {user: "mashiro", name: "Mashiro"},
    MASHIRO_SWIMSUIT: {user: "mashiro_swimsuit", name: "Mashiro_swimsuit"},
    ICHIKA: {user: "ichika", name: "CH0071"},
    // Knights Hospitaller 救援骑士团
    MINE: {user: "mine", name: "CH0152"},
    HANAE: {user: "hanae", name: "Hanae"},
    HANAE_CHRISTMAS: {user: "hanae_christmas", name: "CH0195"},
    SERINA: {user: "serina", name: "serina"},
    SERINA_CHRISTMAS: {user: "serina_christmas", name: "CH0194"},
    // Library Committee 图书委员会
    UI: {user: "ui", name: "CH0169"},
    UI_SWIMSUIT: {user: "ui_swimsuit", name: "CH0204"},
    SHIMIKO: {user: "shimiko", name: "Shimiko"},
    // After-School Sweets Club 放学后甜品部
    KAZUSA: {user: "kazusa", name: "kazusa"},
    KAZUSA_BAND: {user: "kazusa_band", name: "CH0250"},
    NATSU: {user: "natsu", name: "CH0155"},
    AIRI: {user: "airi", name: "Airi"},
    AIRI_BAND: {user: "airi_band", name: "CH0251"},
    YOSHIMI: {user: "yoshimi", name: "Yoshimi"},
    YOSHIMI_BAND: {user: "yoshimi_band", name: "CH0220"},
    // Trinity Vigilante Crew 圣三一自警团
    REISA: {user: "reisa", name: "CH0167"},
    SUZUMI: {user: "suzumi", name: "Suzumi"},
    // Supplementary Lessons Department 补习部
    KOHARU: {user: "koharu", name: "Koharu"},
    KOHARU_SQWIMSUIT: {user: "koharu_swimsuit", name: "CH0205"},
    AZUSA: {user: "azusa", name: "Azusa"},
    AZUSA_SWIMSUIT: {user: "azusa_swimsuit", name: "Azusa_swimsuit"},
    // 官方图册为 Ajitani Hifumi 而非此处的 Hihumi，为消除歧义决定添加两个不同译名
    HIFUMI: {user: "hifumi", name: "Hihumi"},
    HIHUMI: {user: "hihumi", name: "Hihumi"},
    HIFUMI_SWIMSUIT: {user: "hifumi_swimsuit", name: "CH0058"},
    HIHUMI_SWIMSUIT: {user: "hihumi_swimsuit", name: "CH0058"},
    HANAKO: {user: "hanako", name: "Hanako"},
    HANAKO_SWIMSUIT: {user: "hanako_swimsuit", name: "CH0209"},
    // ------------- Millennium Science School --------------- 千年科学学院
    // Seminar 研讨会
    YUUKA: {user: "yuuka", name: "Yuuka"},
    YUUKA_GYM: {user: "yuuka_gym", name: "CH0184"},
    NOA: {user: "noa", name: "CH0095"},
    KOYUKI: {user: "koyuki", name: "CH0198"},
    // Veritas 真理部
    CHIHIRO: {user: "chihiro", name: "CH0160"},
    MAKI: {user: "maki", name: "Maki"},
    HARE: {user: "hare", name: "Hare"},
    HARE_CAMP: {user: "hare_camp", name: "CH0233"},
    KOTAMA: {user: "kotama", name: "Kotama"},
    KOTAMA_CAMP: {user: "kotama_camp", name: "CH0232"},
    // Cleaning & Clearing
    NERU: {user: "neru", name: "Neru"},
    NERU_BUNNY: {user: "neru_bunny", name: "CH0101"},
    ASUNA: {user: "asuna", name: "Asuna"},
    ASUNA_BUNNY: {user: "asuna_bunny", name: "CH0098"},
    KARIN: {user: "karin", name: "Karin"},
    KARIN_BUNNY: {user: "karin_bunny", name: "CH0100"},
    AKANE: {user: "akane", name: "Akane"},
    AKANE_BUNNY: {user: "akane_bunny", name: "CH0099"},
    TOKI: {user: "toki", name: "CH0187"},
    TOKI_BUNNY: {user: "toki_bunny", name: "CH0211"},
    // Paranormal Affairs Department 灵异现象搜查部
    HIMARI: {user: "himari", name: "CH0159"},
    EIMI: {user: "eimi", name: "Eimi"},
    EIMI_SWIMSUIT: {user: "eimi_swimsuit", name: "CH0219"},
    // Engineering Department 工程部
    UTAHA: {user: "utaha", name: "Utaha"},
    UTAHA_CHEERLEADER: {user: "utaha_cheerleader", name: "CH0182"},
    HIBIKI: {user: "hibiki", name: "Hibiki"},
    HIBIKI_CHEERLEADER: {user: "hibiki_cheerleader", name: "CH0181"},
    KOTORI: {user: "kotori", name: "Kotori"},
    KOTORI_CHEERLEADER: {user: "kotori_cheerleader", name: "CH0185"},
    // Gym Training Department 体育锻炼部
    SUMIRE: {user: "sumire", name: "Sumire"},
    // Game Development Department 游戏开发部
    MIDORI: {user: "midori", name: "Midori"},
    MIDORI_MAID: {user: "midori_maid", name: "CH0202"},
    MOMOI: {user: "momoi", name: "Momoi"},
    MOMOI_MAID: {user: "momoi_maid", name: "CH0201"},
    ARIS: {user: "aris", name: "Aris"},
    ARIS_MAID: {user: "aris_maid", name: "CH0200"},
    YUZU: {user: "yuzu", name: "Yuzu"},
    YUZU_MAID: {user: "yuzu_maid", name: "CH0203"},
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
