import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const champions = [
        {
            id: "Ahri",
            nameKr: "아리",
            title: "구미호",
            traitTip: "기동성이 뛰어난 마법사형 암살자입니다. 매혹(E)을 맞혔을 때 모든 화력을 집중하는 것이 핵심입니다.",
            counterAdvice: "매혹이 빠졌을 때가 가장 취약한 타이밍입니다. 아리의 대시(R) 횟수를 항상 체크하세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Ahri.png",
            skills: [
                { slot: "P", name: "정기 흡수", description: "적을 처치하거나 미니언을 9마리 처치하면 체력을 회복합니다.", cooldown: "0", traitTip: "라인전 유지력의 근원입니다.", counterAdvice: "아리가 체력이 낮을 때 미니언을 먹지 못하도록 압박하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Ahri_Passive.png" },
                { slot: "Q", name: "현혹의 구슬", description: "구슬을 던져 마법 피해를 입히고, 돌아올 때 고정 피해를 입힙니다.", cooldown: "7", traitTip: "돌아오는 구슬의 고정 피해를 맞히는 것이 중요합니다.", counterAdvice: "구슬이 돌아올 때 옆으로 살짝 피해 고정 피해를 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AhriQuis.png" },
                { slot: "W", name: "여우불", description: "불꽃 3개가 주변 적을 공격하며 이동 속도가 잠시 증가합니다.", cooldown: "9/8/7/6/5", traitTip: "이동 속도 증가를 카이팅이나 도주에 활용하세요.", counterAdvice: "가장 가까운 대상에게 우선 순위가 있으므로 미니언 근처에서 싸우세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AhriFoxFire.png" },
                { slot: "E", name: "매혹", description: "맞은 적을 자신에게 걸어오게 하며 받는 피해량을 늘립니다.", cooldown: "12", traitTip: "가장 중요한 스킬입니다. 반드시 명중시켜야 합니다.", counterAdvice: "미니언 뒤에 숨어서 매혹 각을 주지 마세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AhriSeduce.png" },
                { slot: "R", name: "혼령 질주", description: "전방으로 질주하며 원혼을 발사합니다. 최대 3번(킬 관여 시 추가) 사용 가능합니다.", cooldown: "130/105/80", traitTip: "벽을 넘을 수 있으므로 기습이나 추격에 탁월합니다.", counterAdvice: "궁극기가 쿨타임일 때 아리는 매우 둔합니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AhriTumble.png" }
            ]
        },
        {
            id: "Zed",
            nameKr: "제드",
            title: "그림자의 주인",
            traitTip: "기력을 사용하는 물리 암살자입니다. 그림자를 활용한 거리 조절과 기습적인 폭딜이 특징입니다.",
            counterAdvice: "기력이 바닥났을 때가 가장 취약합니다. 제드의 그림자(W) 위치를 항상 확인하세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Zed.png",
            skills: [
                { slot: "P", name: "약자 멸시", description: "체력이 낮은 적에게 추가 마법 피해를 입힙니다.", cooldown: "10 (대상당)", traitTip: "막타를 먹거나 풀콤보 마무리 시 매우 강력합니다.", counterAdvice: "적은 체력일 때 제드의 평타를 조심하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Zed_Passive.png" },
                { slot: "Q", name: "예리한 표창", description: "제드와 그림자가 표창을 던집니다.", cooldown: "6", traitTip: "그림자와 겹쳐서 맞히면 피해량이 배가됩니다.", counterAdvice: "제드 본체와 그림자의 직선 경로 사이에 서지 마세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ZedQ.png" },
                { slot: "W", name: "살아있는 그림자", description: "그림자를 생성하고 위치를 바꿀 수 있습니다.", cooldown: "20/19/18/17/16", traitTip: "제드의 생존기이자 공격의 핵심입니다. 신중히 사용하세요.", counterAdvice: "W가 빠진 제드는 갱킹에 매우 취약합니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ZedW.png" },
                { slot: "E", name: "그림자 베기", description: "주변을 베어 피해를 입히고 둔화시킵니다.", cooldown: "5/4.5/4/3.5/3", traitTip: "그림자 E는 둔화 효과가 있어 Q를 맞히기 쉽게 해줍니다.", counterAdvice: "그림자 근처에 가면 둔화되니 거리를 유지하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ZedE.png" },
                { slot: "R", name: "죽음의 표식", description: "적에게 표식을 남기고 잠시 후 폭발 피해를 입힙니다.", cooldown: "120/100/80", traitTip: "표식을 남긴 후 최대한 많은 피해를 입혀야 폭발 딜이 커집니다.", counterAdvice: "제드가 궁을 쓰면 제드의 본체는 내 등 뒤에 나타납니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ZedR.png" }
            ]
        },
        {
            id: "Yasuo",
            nameKr: "야스오",
            title: "용서받지 못한 자",
            traitTip: "기동성이 뛰어난 근접 딜러입니다. 미니언을 타고 이동하며 바람 장막(W)으로 적의 투사체를 막는 것이 중요합니다.",
            counterAdvice: "미니언이 없는 곳에서 싸움을 유도하세요. 바람 장막의 쿨타임을 계산하세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Yasuo.png",
            skills: [
                { slot: "P", name: "낭인의 길", description: "이동 시 보호막 충전, 치명타 확률 2배 증가.", cooldown: "0", traitTip: "이동을 멈추지 마세요.", counterAdvice: "평타 한 대를 미리 쳐서 보호막을 뺀 후 싸우세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Yasuo_Passive.png" },
                { slot: "Q", name: "강철 폭풍", description: "전방 공격. 3회째에 회오리바람 발사.", cooldown: "4-1.33 (공속 비례)", traitTip: "회오리 스택을 유지해 적의 접근을 차단하세요.", counterAdvice: "야스오의 칼끝에 바람이 돌 때 조심하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/YasuoQW.png" },
                { slot: "W", name: "바람 장막", description: "투사체를 막는 벽 생성.", cooldown: "30/27/24/21/18", traitTip: "주요 스킬(궁극기 등)을 막는 데 사용하세요.", counterAdvice: "벽 뒤로 넘어가서 스킬을 사용하거나 벽이 사라질 때까지 기다리세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/YasuoW.png" },
                { slot: "E", name: "질풍검", description: "미니언이나 적을 타고 이동.", cooldown: "0.5/0.4/0.3/0.2/0.1", traitTip: "미니언을 타고 빠르게 접근하거나 도망가세요.", counterAdvice: "야스오가 다음에 탈 미니언을 예상하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/YasuoE.png" },
                { slot: "R", name: "최후의 숨결", description: "에어본 된 적에게 도약해 피해를 입힘.", cooldown: "80/55/30", traitTip: "팀원의 에어본과 연계하면 매우 강력합니다.", counterAdvice: "에어본 되지 않도록 주의하고, 야스오가 궁을 쓸 때 점화를 거세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/YasuoR.png" }
            ]
        },
        {
            id: "Orianna",
            nameKr: "오리아나",
            title: "시계태엽 소녀",
            traitTip: "구체 제어가 핵심인 메이지입니다. 구체의 위치를 항상 유리하게 유지하세요.",
            counterAdvice: "오리아나 본체와 구체 사이의 거리를 계산해 이동 경로를 예측하세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Orianna.png",
            skills: [
                { slot: "P", name: "시계태엽 감기", description: "기본 공격에 마법 피해 추가.", cooldown: "0", traitTip: "초반 라인전에서 평타 견제를 적극 활용하세요.", counterAdvice: "가까이서 평타 딜교를 하면 생각보다 아픕니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Orianna_Passive.png" },
                { slot: "Q", name: "명령: 공격", description: "구체를 지정 위치로 보냅니다.", cooldown: "6/5.25/4.5/3.75/3", traitTip: "구체를 적 챔피언 근처에 두어 압박하세요.", counterAdvice: "구체가 날아오는 방향의 수직으로 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/OrianaIzunaCommand.png" },
                { slot: "W", name: "명령: 불협화음", description: "구체 주변에 피해 및 장판 생성(이속 변화).", cooldown: "7", traitTip: "QW 콤보로 순식간에 피해를 입히세요.", counterAdvice: "장판 위에 있으면 늦어지므로 즉시 나오세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/OrianaDissonanceCommand.png" },
                { slot: "E", name: "명령: 보호", description: "아군에게 구체를 붙여 보호막 및 방어력 부여.", cooldown: "9", traitTip: "구체가 돌아오면서 경로상 적에게 피해를 입립니다.", counterAdvice: "보호막이 씌워진 적에게는 스킬을 아끼세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/OrianaRedactCommand.png" },
                { slot: "R", name: "명령: 충격파", description: "구체 주변 적을 중앙으로 끌어당기며 피해.", cooldown: "110/95/80", traitTip: "한타에서 다수를 맞히거나 주요 딜러를 묶으세요.", counterAdvice: "구체 근처에 뭉쳐 있지 마세요. 존야로 씹을 수 있습니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/OrianaShockwaveCommand.png" }
            ]
        },
        {
            id: "Viktor",
            nameKr: "빅토르",
            title: "기계 혁명가",
            traitTip: "후반 왕귀형 메이지입니다. E 스킬 진화를 우선순위로 두세요.",
            counterAdvice: "중력장(W) 안에서 기절하지 않도록 즉시 이탈하세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Viktor.png",
            skills: [
                { slot: "P", name: "영광스러운 진화", description: "처치 관여 시 스킬 강화 포인트 획득.", cooldown: "0", traitTip: "초반 성장에 집중해 빠르게 스킬을 진화 시키세요.", counterAdvice: "빅토르의 진화 타이밍을 체크해 그때 싸움을 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Viktor_Passive.png" },
                { slot: "Q", name: "힘의 흡수", description: "피해를 입히고 보호막 획득, 평타 강화.", cooldown: "9/8/7/6/5", traitTip: "딜교환 시 보호막으로 피해를 상쇄하세요.", counterAdvice: "강화 평타 모션이 매우 빠르니 조심하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ViktorPowerTransfer.png" },
                { slot: "W", name: "중력장", description: "지정 범위 적 둔화 및 기절.", cooldown: "17/16/15/14/13", traitTip: "진입로를 차단하거나 아군 연계용으로 사용하세요.", counterAdvice: "장판 중앙에서 빨리 벗어나야 기절하지 않습니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ViktorGravitonField.png" },
                { slot: "E", name: "죽음의 광선", description: "지정 경로에 광선 발사.", cooldown: "12/11/10/9/8", traitTip: "진화 시 두 번 터지므로 라인 클리어와 견제에 탁월합니다.", counterAdvice: "광선이 긋는 궤적을 보고 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ViktorDeathRay.png" },
                { slot: "R", name: "혼돈의 폭풍", description: "피해를 입히는 폭풍 생성 및 조종.", cooldown: "120/100/80", traitTip: "집중 근원을 끊을 수 있는 능력이 있습니다.", counterAdvice: "폭풍은 빅토르와 가까울수록 빨라지니 빅토르와 거리를 두세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ViktorChaosStorm.png" }
            ]
        },
        {
            id: "Hwei",
            nameKr: "흐웨이",
            title: "몽상하는 화가",
            traitTip: "10가지 스킬을 사용하는 다재다능한 메이지입니다.",
            counterAdvice: "흐웨이의 스킬 쿨타임 계열(Q, W, E)을 확인하세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Hwei.png",
            skills: [
                { slot: "P", name: "화가의 조망", description: "스킬 적중 후 다른 스킬 적중 시 추가 폭발 피해.", cooldown: "0", traitTip: "스킬 콤보로 패시브를 터뜨려야 딜이 완성됩니다.", counterAdvice: "한 번 스킬을 맞았다면 다음 스킬을 극도로 조심하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Hwei_P.png" },
                { slot: "Q", name: "참항", description: "공격 스킬 계열. QQ, QW, QE 중 선택.", cooldown: "10/9/8/7/6", traitTip: "QQ는 원거리 저격, QE는 라인 푸시에 좋습니다.", counterAdvice: "흐웨이의 붓질 방향을 주시하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/HweiQ.png" },
                { slot: "W", name: "성찰", description: "유틸리티 스킬 계열. WQ, WW, WE 중 선택.", cooldown: "18", traitTip: "WE는 마나 회복과 추가 딜을 제공합니다.", counterAdvice: "흐웨이가 WE를 켰을 때 평타 견제가 강화됩니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/HweiW.png" },
                { slot: "E", name: "통제", description: "제어 스킬 계열. EQ, EW, EE 중 선택.", cooldown: "15", traitTip: "EQ는 공포, EE는 적들을 중앙으로 모읍니다.", counterAdvice: "흐웨이가 E를 아끼고 있다면 암살 시도 시 주의하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/HweiE.png" },
                { slot: "R", name: "절망의 소용돌이", description: "점점 커지며 둔화와 피해를 입히는 구체 발사.", cooldown: "140/125/110", traitTip: "한타 중심부에 적중시키면 광역 슬로우로 고립시킬 수 있습니다.", counterAdvice: "구체에 맞았다면 아군과 떨어지세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/HweiR.png" }
            ]
        },
        {
            id: "Ryze",
            nameKr: "라이즈",
            title: "룬 마법사",
            traitTip: "스킬 연계와 마나 관리가 중요한 메이지입니다.",
            counterAdvice: "전이 표식(E)이 있는 상태에서 라이즈의 스킬을 조심하세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Ryze.png",
            skills: [
                { slot: "P", name: "비전 연마", description: "추가 마나에 따라 피해량 증가.", cooldown: "0", traitTip: "마나 아이템으로 피해량을 극대화하세요.", counterAdvice: "라이즈의 마나통이 클수록 딜이 아픕니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Ryze_P.png" },
                { slot: "Q", name: "과부하", description: "에너지를 발사합니다.", cooldown: "5", traitTip: "다른 스킬 사용 시 쿨타임이 초기화됩니다.", counterAdvice: "무빙으로 과부하를 피하는 것이 핵심입니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/RyzeQWrapper.png" },
                { slot: "W", name: "룬 감옥", description: "적을 둔화 시키고 피해를 입힙니다.", cooldown: "11/10.5/10/9.5/9", traitTip: "E와 연계하면 속박으로 변합니다.", counterAdvice: "E에 맞은 상태라면 W 사거리 밖으로 나가세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/RyzeW.png" },
                { slot: "E", name: "주문 전이", description: "마법 구체를 던져 표식을 남깁니다.", cooldown: "3.5/3.25/3/2.75/2.5", traitTip: "미니언을 통해 적 챔피언에게 전이 시키세요.", counterAdvice: "표식이 있는 미니언 근처에 서지 마세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/RyzeE.png" },
                { slot: "R", name: "공간 왜곡", description: "아군을 순간이동 시킵니다.", cooldown: "180/160/140", traitTip: "전략적으로 한타 합류나 운영에 사용하세요.", counterAdvice: "라이즈에게 CC를 걸면 차원문이 취소됩니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/RyzeR.png" }
            ]
        },
        {
            id: "Katarina",
            nameKr: "카타리나",
            title: "사악한 칼날",
            traitTip: "단검을 주웠을 때 순보(E) 쿨타임 초기화를 이용한 현란한 암살이 특징입니다.",
            counterAdvice: "카타리나가 궁극기를 쓸 때 CC기로 즉시 끊어주세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Katarina.png",
            skills: [
                { slot: "P", name: "탐욕", description: "처치 관여 시 쿨타임 대폭 감소, 단검 주울 시 주변 공격.", cooldown: "0", traitTip: "단검의 낙하지점을 예측해 순보로 진입하세요.", counterAdvice: "바닥에 떨어진 단검 근처에 가지 마세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Katarina_Passive.png" },
                { slot: "Q", name: "단검 투척", description: "단검을 던져 여러 적 공격, 이후 바닥에 떨어짐.", cooldown: "11/10/9/8/7", traitTip: "단검이 항상 첫 대상의 뒤쪽에 떨어진다는 점을 이용하세요.", counterAdvice: "단검이 떨어질 위치를 미리 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/KatarinaQ.png" },
                { slot: "W", name: "준비", description: "제자리에 단검을 던지고 이속 증가.", cooldown: "15/14/13/12/11", traitTip: "도망가거나 이속이 필요할 때 바로 사용하세요.", counterAdvice: "카타리나가 W를 쓴 곳은 곧 폭발 딜이 들어올 곳입니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/KatarinaW.png" },
                { slot: "E", name: "순보", description: "대상에게 순간이동.", cooldown: "12/11/10/9/8", traitTip: "단검을 주우면 쿨타임이 거의 초기화됩니다.", counterAdvice: "카타리나가 순보로 튈 수 있는 아군 미니언 위치를 체크하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/KatarinaEWrapper.png" },
                { slot: "R", name: "죽음의 연꽃", description: "제자리에서 단검을 난사해 폭딜을 넣음.", cooldown: "75/60/45", traitTip: "적들의 주요 CC기가 빠졌을 때 진입해 사용하세요.", counterAdvice: "카타리나가 돌기 시작하면 즉시 기절이나 침묵을 거세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/KatarinaR.png" }
            ]
        },
        {
            id: "Leblanc",
            nameKr: "르블랑",
            title: "환술사",
            traitTip: "왜곡(W)을 이용한 치고 빠지기와 인장 폭발 딜이 강력한 암살자입니다.",
            counterAdvice: "르블랑이 왜곡으로 돌아갈 위치에 스킬을 미리 조준하세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Leblanc.png",
            skills: [
                { slot: "P", name: "거울 환영", description: "딸피일 때 분신 생성.", cooldown: "60", traitTip: "분신을 조종해 적을 혼란시키세요.", counterAdvice: "진짜 르블랑은 보통 버프 효과를 가지고 있습니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/LeBlancP.png" },
                { slot: "Q", name: "악의의 인장", description: "인장을 남기고 다음 스킬 적중 시 가동.", cooldown: "6", traitTip: "QW 콤보는 르블랑의 기본 견제 방식입니다.", counterAdvice: "머리에 인장이 생겼다면 왜곡 거리 밖으로 물리세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/LeblancQ.png" },
                { slot: "W", name: "왜곡", description: "돌진하여 광역 피해, 재사용 시 귀환.", cooldown: "15/13.75/12.5/11.25/10", traitTip: "복귀 타이밍을 섞어 적의 스킬을 낭비시키세요.", counterAdvice: "르블랑이 돌아갈 인장 위치를 압박하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/LeblancW.png" },
                { slot: "E", name: "환영 사슬", description: "사슬을 던져 일정 시간 유지 시 속박.", cooldown: "14/13.25/12.5/11.75/11", traitTip: "E를 맞히면 Q 인장을 확정으로 터뜨릴 수 있습니다.", counterAdvice: "사슬에 맞았다면 즉시 거리를 벌려 끊으세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/LeblancE.png" },
                { slot: "R", name: "모방", description: "가장 최근 스킬을 강화하여 사용.", cooldown: "50/40/30", traitTip: "상황에 따라 더블 왜곡(기동성)이나 더블 사슬(제어)을 선택하세요.", counterAdvice: "르블랑이 궁극기를 어떤 스킬에 썼는지 확인하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/LeblancR.png" }
            ]
        },
        {
            id: "Ambessa",
            nameKr: "암베사",
            title: "전장의 우두머리",
            traitTip: "스킬 사용 후 돌진하는 패시브를 이용한 끈질긴 추격이 일품인 브루저입니다.",
            counterAdvice: "기력을 소모하는 챔피언이므로 기력 관리가 안 된 상태를 노리세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Ambessa.png",
            skills: [
                { slot: "P", name: "용사냥개의 발걸음", description: "스킬 사용 후 이동 시 돌진 및 평타 강화.", cooldown: "0", traitTip: "스킬을 쓴 후 항상 무빙을 해서 거리 조절을 하세요.", counterAdvice: "암베사의 현란한 무빙에 당황하지 마세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Icon_Ambessa_Passive.Domina.png" },
                { slot: "Q", name: "교활한 휩쓸기", description: "부채꼴 베기, 적중 시 직선 내리치기 준비.", cooldown: "14/13/12/11/10", traitTip: "가장자리 적중 시 피해가 크므로 사거리 조절이 핵심입니다.", counterAdvice: "암베사의 Q1 사거리 끝을 조심하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AmbessaQ.png" },
                { slot: "W", name: "배척", description: "보호막을 얻고 주변 공격, 피해 막을 시 딜 증가.", cooldown: "18/17/16/15/14", traitTip: "적의 큰 스킬을 W 보호막으로 흡수하며 반격하세요.", counterAdvice: "암베사가 W를 켰을 때 공격을 잠시 중단하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AmbessaW.png" },
                { slot: "E", name: "찢어 가르기", description: "사슬 휘둘러 피해 및 둔화.", cooldown: "13/12/11/10/9", traitTip: "패시브 돌진과 연계해 순식간에 거리를 좁히세요.", counterAdvice: "둔화에 걸리면 다음 스킬 연계를 피하기 힘들어집니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AmbessaE.png" },
                { slot: "R", name: "공개 처형", description: "가장 먼 적에게 돌진 후 제압 및 내리치기.", cooldown: "130/115/100", traitTip: "저지 불가 상태로 돌진하므로 주요 딜러를 확실히 무세요.", counterAdvice: "수은이나 정화로 암베사의 궁 제압을 풀 수 있습니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AmbessaR.png" }
            ]
        },
        {
            id: "Akshan",
            nameKr: "아크샨",
            title: "떠도는 감시자",
            traitTip: "부활 능력과 강력한 로밍력을 가진 원거리 암살자입니다.",
            counterAdvice: "아크샨이 은신(W) 상태로 접근할 수 있으니 핑와를 활용하세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Akshan.png",
            skills: [
                { slot: "P", name: "비열한 싸움", description: "3타 추가 피해 및 보호막 부여.", cooldown: "0", traitTip: "평타 캔슬 여부에 따라 이속 증가 혹은 추가타가 나갑니다.", counterAdvice: "평타 딜교가 매우 강력하니 짧게 치고 빠지세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/akshan_p.png" },
                { slot: "Q", name: "복수의 부메랑", description: "부메랑 투척, 적중 시 사거리 증가.", cooldown: "8/7.25/6.5/5.75/5", traitTip: "미니언 라인을 긁어 사거리를 늘려 적을 견제하세요.", counterAdvice: "부메랑이 돌아올 때도 맞지 않게 조심하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AkshanQ.png" },
                { slot: "W", name: "악당 처단", description: "은신 및 악당 처치 시 아군 부활.", cooldown: "18-2", traitTip: "아군을 죽인 적에게 복수해 아군을 살리세요.", counterAdvice: "아크샨이 게임에 있으면 킬을 먹어도 안심할 수 없습니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AkshanW.png" },
                { slot: "E", name: "영웅의 비상", description: "갈고리를 타고 회전하며 공격.", cooldown: "18/16.5/15/13.5/12", traitTip: "벽 지형을 잘 활용해 이동 경로를 만드세요.", counterAdvice: "몸으로 막으면 아크샨이 즉시 땅으로 떨어집니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AkshanE.png" },
                { slot: "R", name: "인과응보", description: "탄환을 차지하여 집중 발사.", cooldown: "100/85/70", traitTip: "타워나 미니언에 막히지 않게 각을 잘 잡으세요.", counterAdvice: "아군 탱크나 타워 뒤로 숨어서 탄환을 차단하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AkshanR.png" }
            ]
        },
        {
            id: "Yone",
            nameKr: "요네",
            title: "잊히지 못한 자",
            traitTip: "안전하게 진입하고 귀환할 수 있는 강력한 하이퍼 캐리입니다.",
            counterAdvice: "요네가 육신으로 돌아가는 영혼 상태(E) 종료 시점을 노리세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Yone.png",
            skills: [
                { slot: "P", name: "사냥꾼의 길", description: "두 번째 공격마다 마법 피해, 치명타 2배.", cooldown: "0", traitTip: "평타 딜이 반반 섞여 있어 방어하기 까다롭습니다.", counterAdvice: "방어구 구매 시 물방과 마방을 적절히 섞으세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/YonePassive.png" },
                { slot: "Q", name: "필멸의 검", description: "전방 찌르기, 3타 시 돌진 에어본.", cooldown: "4-1.33", traitTip: "스택을 쌓아두면 상대가 근접하기 어렵습니다.", counterAdvice: "요네에게 바람이 감돌 때 직선 무빙을 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/YoneQ.png" },
                { slot: "W", name: "영혼 가르기", description: "부채꼴 베기 및 보호막 획득.", cooldown: "14", traitTip: "여러 명의 챔피언을 맞힐수록 보호막이 커집니다.", counterAdvice: "요네와 너무 가깝게 붙어 있지 마세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/YoneW.png" },
                { slot: "E", name: "영혼해방", description: "영혼 상태로 진입, 종료 시 피해 비례 추가타.", cooldown: "22/19/16/13/10", traitTip: "E로 들어가서 폭딜을 넣고 안전하게 복귀하세요.", counterAdvice: "요네의 본체(복귀 지점)에 스킬을 미리 깔아두세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/YoneE.png" },
                { slot: "R", name: "운명봉인", description: "일직선 적들을 모으며 공중으로 띄움.", cooldown: "120/100/80", traitTip: "좁은 길목이나 연계용으로 최고입니다.", counterAdvice: "범위가 표시되므로 빠르게 무빙이나 점멸로 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/YoneR.png" }
            ]
        },
        {
            id: "Zoe",
            nameKr: "조이",
            title: "여명의 성위",
            traitTip: "상상도 못한 각도에서 수면을 걸고 폭딜을 넣는 암살자 메이지입니다.",
            counterAdvice: "수면(E)에 걸리면 곧 잠이 드니 안전한 곳으로 위치를 옮기세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Zoe.png",
            skills: [
                { slot: "P", name: "반짝반짝!", description: "스킬 사용 후 기본 공격 시 추가 마법 피해.", cooldown: "0", traitTip: "스킬 사이사이에 평타를 섞어 딜을 보충하세요.", counterAdvice: "조이의 우클릭이 생각보다 아픈 이유입니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Zoe_P.png" },
                { slot: "Q", name: "통통별", description: "별을 던져 총 이동 거리에 비례한 피해.", cooldown: "8.5/8/7.5/7/6.5", traitTip: "뒤로 던졌다가 앞으로 다시 던져 거리를 늘리세요.", counterAdvice: "별이 날아오는 궤적의 수직 방향으로 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ZoeQ.png" },
                { slot: "W", name: "주문도둑", description: "떨어진 스펠이나 아이템을 뺏어 씀.", cooldown: "0", traitTip: "바닥에 떨어진 파편을 적극적으로 주우세요.", counterAdvice: "조이가 주울 만한 중요 파편 위에서 압박하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ZoeW.png" },
                { slot: "E", name: "헤롱헤롱쿨쿨방울", description: "수면 상태로 유도, 벽 너머 사거리 증가.", cooldown: "16/15/14/13/12", traitTip: "벽 너머에서 쏘면 예상치 못한 곳까지 날아갑니다.", counterAdvice: "수면에 걸린 뒤 입는 첫 피해는 2배이므로 아군이 막아줘야 합니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ZoeE.png" },
                { slot: "R", name: "차원 넘기", description: "잠시 위치 이동 후 복귀.", cooldown: "11/8/5", traitTip: "시야 확보나 Q 거리 늘리기용으로 쓰세요.", counterAdvice: "조이가 반드시 돌아오는 지점에 스킬을 조준하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ZoeR.png" }
            ]
        },
        {
            id: "Kassadin",
            nameKr: "카사딘",
            title: "공허의 방랑자",
            traitTip: "16레벨 왕귀의 대명사입니다.",
            counterAdvice: "6레벨 전 카사딘은 매우 약합니다.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Kassadin.png",
            skills: [
                { slot: "P", name: "공허석", description: "마법 피해 감소 및 유닛 충돌 무시.", cooldown: "0", traitTip: "메이지 상대로 강력한 내성을 가집니다.", counterAdvice: "물리 챔피언으로 대응하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Kassadin_Passive.png" },
                { slot: "Q", name: "무의 구체", description: "정신 집중 차단 및 마법 보호막.", cooldown: "10/9/8", traitTip: "상대 스킬을 끊는 데 유용합니다.", counterAdvice: "보호막이 있을 때 딜을 넣지 마세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/NullLance.png" },
                { slot: "W", name: "황천의 검", description: "마나 회복 및 평타 강화.", cooldown: "7", traitTip: "챔피언 공격 시 마나 회복량이 큽니다.", counterAdvice: "카사딘의 접근을 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/NetherBlade.png" },
                { slot: "E", name: "힘의 파동", description: "둔화 및 광역 피해.", cooldown: "21-17", traitTip: "스킬 사용이 잦은 한타에서 효율이 좋습니다.", counterAdvice: "범위 둔화를 체크하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/ForcePulse.png" },
                { slot: "R", name: "균열 이동", description: "짧은 순간이동.", cooldown: "5/3.5/2", traitTip: "성장할수록 재사용 대기시간이 극도로 짧아집니다.", counterAdvice: "카사딘의 16레벨 전까지 끝내야 합니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/RiftWalk.png" }
            ]
        },
        {
            id: "Lux",
            nameKr: "럭스",
            title: "광명의 소녀",
            traitTip: "긴 사거리의 속박과 포킹이 강점입니다.",
            counterAdvice: "속박(Q)만 피하면 럭스는 매우 취약합니다.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Lux.png",
            skills: [
                { slot: "P", name: "광채", description: "스킬 후 평타 추가 피해.", cooldown: "0", traitTip: "패시브 평타 견제가 핵심입니다.", counterAdvice: "초반 평타를 조심하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/LuxIlluminatingFraulein.png" },
                { slot: "Q", name: "빛의 속박", description: "최대 2명 속박.", cooldown: "11/10.5/10/9.5/9", traitTip: "첫 번째 적 뒤의 적도 속박할 수 있습니다.", counterAdvice: "미니언 뒤에 숨어 무조건 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/LuxLightBinding.png" },
                { slot: "W", name: "프리즘 보호막", description: "방학 보호막 생성.", cooldown: "14/13/12/11/10", traitTip: "아군 다수에게 씌워줄 수 있습니다.", counterAdvice: "보호막이 있는 럭스는 잡기 힘듭니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/LuxPrismaticWave.png" },
                { slot: "E", name: "광휘의 특이점", description: "둔화 및 폭발 피해.", cooldown: "10/9.5/9/8.5/8", traitTip: "주요 견제기입니다.", counterAdvice: "장판 안에서 빨리 나오세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/LuxLightStrikeKugel.png" },
                { slot: "R", name: "최후의 섬광", description: "긴 거리 레이저 공격.", cooldown: "60/50/40", traitTip: "장거리 저격에 사용하세요.", counterAdvice: "조준선을 보고 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/LuxR.png" }
            ]
        },
        {
            id: "Akali",
            nameKr: "아칼리",
            title: "섬기는 이 없는 암살자",
            traitTip: "현란한 무빙과 은신을 활용한 암살이 장점입니다.",
            counterAdvice: "연막(W) 안에서도 광역 피해는 입습니다.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Akali.png",
            skills: [
                { slot: "P", name: "암살자의 표식", description: "스킬 후 강평 사거리 증가.", cooldown: "0", traitTip: "강평 콤보를 잊지 마세요.", counterAdvice: "원 밖으로 나가는 무빙을 주시하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Akali_P.png" },
                { slot: "Q", name: "오연투척검", description: "단검 투척 피해 및 둔화.", cooldown: "1.5", traitTip: "기력 관리하며 최대 사거리에서 쓰세요.", counterAdvice: "기력이 없을 때가 기회입니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AkaliQ.png" },
                { slot: "W", name: "황혼의 장막", description: "은신 연막 생성.", cooldown: "20/19/18/17/16", traitTip: "위험할 때 시간을 벌거나 기력을 채우세요.", counterAdvice: "연막에 광역기를 난사하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AkaliW.png" },
                { slot: "E", name: "표창곡예", description: "표창 발사 후 돌진.", cooldown: "16/14.5/13/11.5/10", traitTip: "벽 넘는 데도 쓸 수 있습니다.", counterAdvice: "표창만 안 맞으면 됩니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AkaliE.png" },
                { slot: "R", name: "무결처형", description: "두 번 돌진 공격.", cooldown: "120/90/60", traitTip: "R2는 잃은 체력 비례 딜입니다.", counterAdvice: "거리를 두어 R1 사거리를 주지 마세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/AkaliR.png" }
            ]
        },
        {
            id: "Sylas",
            nameKr: "사일러스",
            title: "해방된 자",
            traitTip: "적의 궁을 뺏는 변수와 W의 괴랄한 힐량이 핵심입니다.",
            counterAdvice: "사일러스가 딸피일 때 W 힐량을 조심하세요.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Sylas.png",
            skills: [
                { slot: "P", name: "페트리사이트 폭발", description: "스킬 후 평타가 강화됩니다.", cooldown: "0", traitTip: "스킬 평 스킬 평 루틴을 지키세요.", counterAdvice: "강평 딜이 아프니 주의하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/SylasP.png" },
                { slot: "Q", name: "사슬 후려치기", description: "사슬을 휘둘러 피해 및 폭발.", cooldown: "10/9/8/7/6", traitTip: "폭발 딜까지 맞혀야 합니다.", counterAdvice: "바닥 폭발 지점을 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/SylasQ.png" },
                { slot: "W", name: "국왕시해자", description: "돌진 힐 및 피해.", cooldown: "12/10.5/9/7.5/6", traitTip: "딸피일 때 극적인 회복을 노리세요.", counterAdvice: "치감 아이템이 무조건 필요합니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/SylasW.png" },
                { slot: "E", name: "도주 / 억압", description: "돌진 후 사슬 투척.", cooldown: "13/12/11/10/9", traitTip: "E1E2로 거리를 좁히세요.", counterAdvice: "E2 사슬만 피하면 됩니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/SylasE.png" },
                { slot: "R", name: "강탈", description: "적의 궁을 강탈합니다.", cooldown: "80/55/30", traitTip: "좋은 궁을 미리 선점하세요.", counterAdvice: "중요 궁극기를 뺏기지 않게 조심하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/SylasR.png" }
            ]
        },
        {
            id: "Syndra",
            nameKr: "신드라",
            title: "어둠의 여제",
            traitTip: "강력한 고정 피해와 광역 스턴이 장점인 메이지입니다.",
            counterAdvice: "E 스턴이 빠졌을 때가 가장 약점입니다.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Syndra.png",
            skills: [
                { slot: "P", name: "초월", description: "조각 수집으로 스킬 강화.", cooldown: "0", traitTip: "스킬을 최대한 많이 맞히세요.", counterAdvice: "성장할수록 더 무섭습니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/SyndraPassive.png" },
                { slot: "Q", name: "어둠 구체", description: "구체 생성 피해.", cooldown: "7", traitTip: "쿨마다 깔아서 딜링과 스택 쌓기를 하세요.", counterAdvice: "구체 위치를 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/SyndraQ.png" },
                { slot: "W", name: "의지의 힘", description: "구체 던지기 피해 및 둔화.", cooldown: "12/11/10/9/8", traitTip: "강화 시 고정 피해가 추가됩니다.", counterAdvice: "던져지는 방향에서 벗어나세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/SyndraW.png" },
                { slot: "E", name: "적군 와해", description: "밀어내기 및 구체 스턴.", cooldown: "17", traitTip: "최상의 생존기이자 공격기입니다.", counterAdvice: "신드라와 구체의 직선상에 서지 마세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/SyndraE.png" },
                { slot: "R", name: "풀려난 힘", description: "구체 폭격.", cooldown: "120/100/80", traitTip: "구체를 미리 깔아두고 궁을 쓰세요.", counterAdvice: "존야로 막을 수 있습니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/SyndraR.png" }
            ]
        },
        {
            id: "TwistedFate",
            nameKr: "트위스티드 페이트",
            title: "카드의 달인",
            traitTip: "글로벌 합류전의 최강자입니다.",
            counterAdvice: "트페의 로밍 속도를 따라잡아야 합니다.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/TwistedFate.png",
            skills: [
                { slot: "P", name: "사기 주사위", description: "추가 골드 습득.", cooldown: "0", traitTip: "CS 수급 능력이 곧 성장의 핵심입니다.", counterAdvice: "반반 파밍하면 트페가 더 이득입니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/Cardmaster_SealFate.png" },
                { slot: "Q", name: "와일드 카드", description: "세 장의 카드 투척.", cooldown: "6/5.75/5.5/5.25/5", traitTip: "긴 사거리를 이용해 파밍하세요.", counterAdvice: "무빙으로 피하기 쉽습니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/WildCards.png" },
                { slot: "W", name: "카드 뽑기", description: "파랑, 빨강, 황금 카드 중 선택.", cooldown: "6", traitTip: "황금 카드는 확정 CC입니다.", counterAdvice: "카드를 고를 때 거리를 두세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/PickACard.png" },
                { slot: "E", name: "속임수 덱", description: "4타 추가 피해 및 공속 상승.", cooldown: "0", traitTip: "타워 철거 시에도 유용합니다.", counterAdvice: "스택 평타가 아프니 조심하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/CardmasterStack.png" },
                { slot: "R", name: "운명", description: "시야 확보 및 이동.", cooldown: "180/150/120", traitTip: "맵을 넓게 보고 합류하세요.", counterAdvice: "트페가 궁을 쓰면 우리 위치가 다 보입니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/Destiny.png" }
            ]
        },
        {
            id: "Veigar",
            nameKr: "베이가",
            title: "악의 작은 지배자",
            traitTip: "무한 성장의 마법사입니다.",
            counterAdvice: "초반에 베이가를 말려죽여야 합니다.",
            imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/Veigar.png",
            skills: [
                { slot: "P", name: "극악무도", description: "주문력 영구 증가 패시브.", cooldown: "0", traitTip: "스킬 연계로 주문력을 계속 높이세요.", counterAdvice: "후반 갈수록 감당이 안 됩니다.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/passive/VeigarEntropy.png" },
                { slot: "Q", name: "사악한 일격", description: "에너지 탄 발사.", cooldown: "6/5.5/5/4.5/4", traitTip: "막타와 챔피언 견제를 동시에 하세요.", counterAdvice: "투사체를 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/VeigarBalefulStrike.png" },
                { slot: "W", name: "암흑 물질", description: "광역 폭격.", cooldown: "8", traitTip: "E 안에 가두고 사용하세요.", counterAdvice: "바닥 조준점을 피하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/VeigarDarkMatter.png" },
                { slot: "E", name: "사건의 지평선", description: "광폭 스턴 감옥.", cooldown: "20/18.5/17/15.5/14", traitTip: "한타 때 다수를 가두는 것이 베스트입니다.", counterAdvice: "감옥 벽에 닿지 않게 중앙에서 대기하세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/VeigarEventHorizon.png" },
                { slot: "R", name: "태초의 폭발", description: "폭딜 궁극기.", cooldown: "100/80/60", traitTip: "피가 적은 적을 확정적으로 보낼 수 있습니다.", counterAdvice: "베이가 근처에 딸피로 있지 마세요.", imageUrl: "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/spell/VeigarR.png" }
            ]
        }
    ];

    for (const champ of champions) {
        await prisma.champion.upsert({
            where: { id: champ.id },
            update: {
                nameKr: champ.nameKr,
                title: champ.title,
                traitTip: champ.traitTip,
                counterAdvice: champ.counterAdvice,
                imageUrl: champ.imageUrl,
            },
            create: {
                id: champ.id,
                nameKr: champ.nameKr,
                title: champ.title,
                traitTip: champ.traitTip,
                counterAdvice: champ.counterAdvice,
                imageUrl: champ.imageUrl,
            },
        });

        for (const skill of champ.skills) {
            await prisma.skill.upsert({
                where: { id: `${champ.id}_${skill.slot}` },
                update: {
                    name: skill.name,
                    description: skill.description,
                    cooldown: skill.cooldown,
                    traitTip: skill.traitTip,
                    counterAdvice: skill.counterAdvice,
                    imageUrl: skill.imageUrl,
                },
                create: {
                    id: `${champ.id}_${skill.slot}`,
                    championId: champ.id,
                    slot: skill.slot,
                    name: skill.name,
                    description: skill.description,
                    cooldown: skill.cooldown,
                    traitTip: skill.traitTip,
                    counterAdvice: skill.counterAdvice,
                    imageUrl: skill.imageUrl,
                },
            });
        }
    }

    // 매치업 데이터
    const matchups = [
        {
            championId: "Ahri",
            opponentId: "Yasuo",
            verdictMessage: "초반에는 할만하지만 장막 쿨타임 계산이 필수입니다.",
            tradingRule: "장막을 평타나 W로 빼고 나서 E를 노리세요. 미니언을 타고 들어올 때 E각을 잘 봐야 합니다.",
            killWindow: "장막과 질풍검(E) 스택이 빠졌을 때 매혹 명중 시.",
            survivalTip: "야스오가 3스택 회오리를 모았을 때 거리를 벌리고 무빙에 집중하세요."
        },
        {
            championId: "Zed",
            opponentId: "Orianna",
            verdictMessage: "6레벨 전까지 버티면 6레벨 이후부터는 제드의 턴입니다.",
            tradingRule: "오리아나의 구체 위치를 보고 WQE로 견제하세요. 충격파(R) 모션을 보고 궁으로 씹는 것이 핵심입니다.",
            killWindow: "오리아나의 E 보호막이 빠졌거나 구체가 멀리 있을 때 진입.",
            survivalTip: "오리아나의 평타 견제가 아프므로 초반에는 미니언을 포기하더라도 체력 관리에 집중하세요."
        },
        {
            championId: "Viktor",
            opponentId: "Syndra",
            verdictMessage: "서로의 사거리 싸움입니다. E 스킬 선점이 관건입니다.",
            tradingRule: "신드라의 Q 견제를 피하며 E로 같이 긁으세요. 신드라의 E 스턴 각을 주지 않는 무빙이 필요합니다.",
            killWindow: "신드라의 E가 빗나갔을 때 즉시 레이저와 궁극기로 폭딜.",
            survivalTip: "신드라의 6레벨 궁극기 폭딜 범위에서 벗어날 준비를 하세요."
        },
        {
            championId: "Sylas",
            opponentId: "Akali",
            verdictMessage: "손가락 싸움이지만 사일러스의 W 유지력이 변수입니다.",
            tradingRule: "아칼리의 Q를 E 대시로 피하며 들어가세요. 아칼리가 연막을 쓰면 즉시 빠져야 합니다.",
            killWindow: "아칼리의 기력이 떨어졌거나 연막이 빠진 직후.",
            survivalTip: "아칼리의 E에 맞았다면 뒤로 무조건 빼지 말고 아칼리가 들어오는 타이밍에 W로 맞대응하세요."
        }
    ];

    for (const matchup of matchups) {
        await prisma.matchupInsight.upsert({
            where: {
                championId_opponentId: {
                    championId: matchup.championId,
                    opponentId: matchup.opponentId
                }
            },
            update: {
                verdictMessage: matchup.verdictMessage,
                tradingRule: matchup.tradingRule,
                killWindow: matchup.killWindow,
                survivalTip: matchup.survivalTip
            },
            create: {
                championId: matchup.championId,
                opponentId: matchup.opponentId,
                verdictMessage: matchup.verdictMessage,
                tradingRule: matchup.tradingRule,
                killWindow: matchup.killWindow,
                survivalTip: matchup.survivalTip
            }
        });
    }

    console.log('Seed data inserted successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
