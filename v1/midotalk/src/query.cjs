const CharacterTag = {
    // ----------------- Abydos ---------------------- 阿拜多斯
    SHIROKO: {user: "shiroko", id: 10010},
    SHIROKO_RIDINGSUIT: {user: "shiroko_ridingsuit", id: 10024},
    SHIROKO_SWIMSUIT: {user: "shiroko_swimsuit", id: 20027},
    SHIROKO_TERROR: {user: "shiroko_terror", id: 10100},
    HOSHINO: {user: "hoshino", id: 10005},
    HOSHINO_SWIMSUIT: {user: "hoshino_swimsuit", id: 10045},
    HOSHINO_ARMED: {user: "hoshino_armed", id: 10098},
    NONOMI: {user: "nonomi", id: 13004},
    NONOMI_SWIMSUIT: {user: "nonomi_swimsuit", id: 10044},
    AYANE: {user: "ayane", id: 23005},
    AYANE_SWIMSUIT: {user: "ayane_swimsuit", id: 26007},
    SERIKA: {user: "serika", id: 13008},
    SERIKA_NEWYEAR: {user: "serika_newyear", id: 20011},
    SERIKA_SWIMSUIT: {user: "serika_swimsuit", id: 20036},
    // ----------------- Gehenna --------------------- 格赫娜
    // Handyman 68 便利店68
    ARU: {user: "aru", id: 10000},
    ARU_NEWYEAR: {user: "aru_newyear", id: 10031},
    ARU_DRESS: {user: "aru_dress", id: 10089},
    KAYOKO: {user: "kayoko", id: 13005},
    KAYOKO_NEWYEAR: {user: "kayoko_newyear", id: 10064},
    KAYOKO_DRESS: {user: "kayoko_dress", id: 10088},
    MUTSUKI: {user: "mutsuki", id: 13006},
    MUTSUKI_NEWYEAR: {user: "mutsuki_newyear", id: 10032},
    HARUKA: {user: "haruka",id: 16000},
    HARUKA_NEWYEAR: {user: "haruka_newyear", id: 20025},
    // School Lunch Club 供给部
    FUUKA: {user: "fuuka", id: 23001},
    FUUKA_NEWYEAR: {user: "fuuka_newyear", id: 20022},
    JURI: {user: "juri", id: 26002},
    // Gourmet Research Society 美食研究会
    JUNKO: {user: "junko",  id: 13007},
    ZUNKO:  {user: "zunko", id: 13007},
    JUNKO_NEWYEAR: {user: "junko_newyear", id: 16012},
    ZUNKO_NEWYEAR: {user: "zunko_newyear", id: 16012},
    HARUNA: {user: "haruna", id: 10002},
    HARUNA_NEWYEAR: {user: "haruna_newyear", id: 10057},
    HARUNA_GYM: {user: "haruna_gym", id: 20030},
    IZUMI: {user: "izumi", id: 10009},
    IZUMI_SWIMSUIT: {user: "izumi_swimsuit", id: 16006},
    AKARI: {user: "akari", id: 13002},
    AKARI_NEWYEAR: {user: "akari_newyear", id: 20034},
    // Disciplinary Committee 风纪委员会
    HINA: {user: "hina", id: 10004},
    HINA_SWIMSUIT: {user: "hina_swimsuit", id: 10022},
    HINA_DRESS: {user: "hina_dress", id: 10086},
    AKO: {user: "ako", id: 20008},
    AKO_DRESS: {user: "ako_dress", id: 10087},
    IORI: {user: "iori", id: 10006},
    IORI_SWIMSUIT: {user: "iori_swimsuit", id: 10023},
    CHINATSU: {user: "chinatsu", id: 26000},
    CHINATSU_HOTSPRING: {user: "chinatsu_hotspring", id: 10030},

    // Pandemonium Society 万魔殿
    // Hot Spring Development Department 温泉开发部
    // Emergency Medicine Club 救急医学部
    // Sparkle Club 亮闪闪部
    // ----------------- Trinity ---------------------- 圣三一
    // Tea Party 茶话会
    // Sisterhood 姐妹会
    // Justice Realization Committee 正义实现委员会
    // Knights Hospitaller 救援骑士团
    // Library Committee 图书委员会
    // After-School Sweets Club 放学后甜品部
    // Trinity Vigilante Crew 圣三一自警团
    // Supplementary Lessons Department 补习部
    // ------------------ Millennium ---------------------- 千年科学学院
    // Seminar 研讨会
    // Veritas 真理部
    // Cleaning & Clearing C&C
    // Paranormal Affairs Department 灵异现象搜查部
    // Engineering Department 工程部
    // Gym Training Department 体育锻炼部
    // Game Development Club 游戏开发部
    // ------------------ Hyakkiyako ---------------------- 百鬼夜行
    // Yin-Yang Club 阴阳部
    // Hyakkaryouran Conflict Resolution Council 百花缭乱调停委员会
    // Festival Management Committee 节庆营运管理部
    // Etiquette Training Department 忍术研究部
    // Seven Prisoners 七囚人
    // ------------------ Shanhaijing --------------------- 山海经
    // Xuanlong Office 玄龙门
    KISAKI: {user: "kisaki", id: 20039},
    // Xuanwu Merchant Association 玄武商会
    REIJO: {user: "reijo", id: 10104},
    REIZYO: {user: "reizyo", id: 10104} // 多读音消歧
    // Chinese Alchemy Study Club 炼丹术研究会
    // Plum Blossom Garden 梅花园
    // ------------------- Red Winter --------------------- 红冬
    // Red Winter Office 红冬事务局
    // Public Works Department 劳务部
    // Knowledge Liberation Front 知识解放战线
    // No.227 Special Class 227特别班
    // ------------------- Valkyrie ----------------------- 瓦尔基里
    // Public Security Bureau 公安局
    // Community Safety Bureau 生活安全局
    // ------------------- Arius ----------------------- 阿里乌斯
    // ------------------- SRT ----------------------
    // RABBIT Platoon 兔子小队
    // ------------------ Somewhere Outside Kivotos --------------------- 联动角色
    // VOCALOID V家
    // Academy City 学园都市
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