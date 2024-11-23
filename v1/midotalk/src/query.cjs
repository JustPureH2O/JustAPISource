const CharacterTag = {
    // ----------------- Abydos ---------------------- 阿拜多斯
    SHIROKO: {user: "shiroko", id: },
    // ----------------- Gehenna --------------------- 格赫娜
    // Handyman 68 便利店68
    // School Lunch Club 供给部
    // Gourmet Research Society 美食研究会
    // Disciplinary Committee 风纪委员会
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