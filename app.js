document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Mock Champion Data
    // ==========================================
    const champions = [
        { id: 'Aatrox', nameKo: '아트록스', nameEn: 'aatrox', tags: ['탑', '브루저'] },
        { id: 'Ahri', nameKo: '아리', nameEn: 'ahri', tags: ['미드', '암살자'] },
        { id: 'Aphelios', nameKo: '아펠리오스', nameEn: 'aphelios', tags: ['원딜', '하이퍼캐리'] },
        { id: 'Azir', nameKo: '아지르', nameEn: 'azir', tags: ['미드', '메이지'] },
        { id: 'Ezreal', nameKo: '이즈리얼', nameEn: 'ezreal', tags: ['원딜', '포킹'] },
        { id: 'Jayce', nameKo: '제이스', nameEn: 'jayce', tags: ['탑', '미드', '포킹'] },
        { id: 'Karma', nameKo: '카르마', nameEn: 'karma', tags: ['서포터', '유틸'] },
        { id: 'Lulu', nameKo: '룰루', nameEn: 'lulu', tags: ['서포터', '유틸'] },
        { id: 'Nidalee', nameKo: '니달리', nameEn: 'nidalee', tags: ['정글', '포킹'] },
        { id: 'Ornn', nameKo: '오른', nameEn: 'ornn', tags: ['탑', '탱커'] },
        { id: 'Renekton', nameKo: '레넥톤', nameEn: 'renekton', tags: ['탑', '브루저'] },
        { id: 'Sejuani', nameKo: '세주아니', nameEn: 'sejuani', tags: ['정글', '탱커'] },
        { id: 'Syndra', nameKo: '신드라', nameEn: 'syndra', tags: ['미드', '메이지'] },
        { id: 'Talon', nameKo: '탈론', nameEn: 'talon', tags: ['미드', '암살자'] },
        { id: 'Yasuo', nameKo: '야스오', nameEn: 'yasuo', tags: ['미드', '전사'] },
        { id: 'Zed', nameKo: '제드', nameEn: 'zed', tags: ['미드', '암살자'] }
    ];

    // ==========================================
    // State Management
    // ==========================================
    const state = {
        lane: { my: null, enemy: null },
        team: {
            'blue-top': null, 'blue-jng': null, 'blue-mid': null, 'blue-bot': null, 'blue-sup': null,
            'red-top': null, 'red-jng': null, 'red-mid': null, 'red-bot': null, 'red-sup': null
        }
    };

    let activeSlotId = null;
    let activeTab = 'lane'; // 'lane' or 'team'

    // ==========================================
    // DOM Elements
    // ==========================================
    const dropdown = document.getElementById('champ-dropdown');
    const searchInput = document.getElementById('champ-search');
    const champGrid = document.getElementById('dropdown-champ-list');

    // Panes & Nav Blocks
    const navBlocks = document.querySelectorAll('.nav-block');
    const resultBlocks = document.querySelectorAll('.result-block');

    // Result Nodes (Lane)
    const laneEmpty = document.getElementById('lane-empty');
    const laneContent = document.getElementById('lane-content');

    // Result Nodes (Team)
    const teamEmpty = document.getElementById('team-empty');
    const teamPartial = document.getElementById('team-partial');
    const teamContent = document.getElementById('team-content');

    const draftCountText = document.getElementById('draft-count');
    const draftCountPartial = document.getElementById('draft-count-text');
    const draftBarFill = document.getElementById('draft-bar-fill');
    const recCardsContainer = document.querySelector('.recommendation-cards');

    const allSlots = Array.from(document.querySelectorAll('.champ-slot, .champ-slot-row'));

    // ==========================================
    // Left Pane Block Switching
    // ==========================================
    navBlocks.forEach(block => {
        const header = block.querySelector('.block-header');
        header.addEventListener('click', () => switchPane(block));
    });

    function switchPane(block) {
        if (block.classList.contains('active-block')) return;

        // Hide Dropdown if open
        hideDropdown();

        // Reset Left Blocks
        navBlocks.forEach(b => {
            b.classList.remove('active-block');
            b.querySelector('.block-content').classList.add('hidden');
        });

        // Activate Selected Left Block
        block.classList.add('active-block');
        block.querySelector('.block-content').classList.remove('hidden');

        activeTab = block.getAttribute('data-target');

        // Toggle Right Pane Outputs
        resultBlocks.forEach(blk => blk.classList.add('hidden'));
        document.getElementById(`${activeTab}-output`).classList.remove('hidden');

        // Remove active slot highlights from previous tab
        allSlots.forEach(s => s.classList.remove('active-slot'));
        activeSlotId = null;
    }

    // ==========================================
    // Dropdown Logic
    // ==========================================
    function showDropdown(slotEl) {
        // Calculate position relative to body
        const rect = slotEl.getBoundingClientRect();

        let topPos = rect.bottom + window.scrollY + 5;
        let leftPos = rect.left + window.scrollX;

        // Basic boundary check
        const dropdownWidth = 320;
        if (leftPos + dropdownWidth > window.innerWidth) {
            leftPos = window.innerWidth - dropdownWidth - 20;
        }

        dropdown.style.top = `${topPos}px`;
        dropdown.style.left = `${leftPos}px`;

        dropdown.classList.remove('hidden');

        // Reset Search
        searchInput.value = '';
        renderChampList(champions);

        // Focus search async to allow display to hit
        setTimeout(() => searchInput.focus(), 50);
    }

    function hideDropdown() {
        dropdown.classList.add('hidden');
    }

    // Close Dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !e.target.closest('.champ-slot') && !e.target.closest('.champ-slot-row')) {
            hideDropdown();
        }
    });

    // ==========================================
    // Slot Activation
    // ==========================================
    function activateSlot(slotEl, autoOpen = true) {
        allSlots.forEach(s => s.classList.remove('active-slot'));
        slotEl.classList.add('active-slot');
        activeSlotId = slotEl.getAttribute('data-slot');

        if (autoOpen) {
            showDropdown(slotEl);
        }
    }

    allSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            activateSlot(slot, true); // manually clicked, force open dropdown
        });
    });

    // ==========================================
    // Champion Picker Logic
    // ==========================================
    function renderChampList(list) {
        champGrid.innerHTML = '';
        list.forEach(champ => {
            const div = document.createElement('div');
            div.className = 'champ-item fade-in';
            div.innerHTML = `
                <img src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champ.id}.png" alt="${champ.nameKo}">
                <span>${champ.nameKo}</span>
            `;
            div.addEventListener('click', (e) => {
                e.stopPropagation();
                selectChampion(champ);
            });
            champGrid.appendChild(div);
        });
    }

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const filtered = champions.filter(c =>
            c.nameKo.includes(term) || c.nameEn.includes(term)
        );
        renderChampList(filtered);
    });

    function selectChampion(champ) {
        if (!activeSlotId) return;

        const isLane = activeTab === 'lane';
        const targetEl = document.querySelector(`[data-slot="${activeSlotId}"]`);

        if (isLane) state.lane[activeSlotId] = champ;
        else state.team[activeSlotId] = champ;

        // UI update for slot
        const circle = targetEl.querySelector('.champ-circle');
        circle.innerHTML = `<img src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champ.id}.png" alt="${champ.nameKo}">`;
        circle.classList.remove('empty');
        circle.classList.add('filled');

        // All slot UI (circles) are updated above. 
        // We no longer display the champion name in the sidebar draft slots.

        // Hide dropdown immediately after selection
        hideDropdown();

        // Check if next slot needs to be visually highlighted
        autoAdvanceSlot(activeTab);

        // Trigger right pane analysis updates
        checkAndUpdateAnalysis();
    }

    function autoAdvanceSlot(tabContext) {
        const visibleSlots = document.querySelectorAll(`#${tabContext}-input .champ-slot, #${tabContext}-input .champ-slot-row`);
        for (let i = 0; i < visibleSlots.length; i++) {
            const slotData = visibleSlots[i].getAttribute('data-slot');
            const isFilled = tabContext === 'lane' ? state.lane[slotData] : state.team[slotData];

            if (!isFilled) {
                // Highlight the next slot, but user must click to open dropdown
                activateSlot(visibleSlots[i], false);
                return;
            }
        }

        // All done
        allSlots.forEach(s => s.classList.remove('active-slot'));
        activeSlotId = null;
    }

    // ==========================================
    // Analysis Triggers & Recommendations
    // ==========================================
    function checkAndUpdateAnalysis() {
        if (activeTab === 'lane') {
            if (state.lane.my && state.lane.enemy) {
                renderLaneMatchup(state.lane.my, state.lane.enemy);
                laneEmpty.classList.add('hidden');
                laneContent.classList.remove('hidden');
            } else {
                laneEmpty.classList.remove('hidden');
                laneContent.classList.add('hidden');
            }
        } else {
            const filledTeamCount = Object.values(state.team).filter(c => c !== null).length;
            updateDraftProgress(filledTeamCount);

            if (filledTeamCount === 0) {
                teamEmpty.classList.remove('hidden');
                teamPartial.classList.add('hidden');
                teamContent.classList.add('hidden');
            } else if (filledTeamCount > 0 && filledTeamCount < 10) {
                teamEmpty.classList.add('hidden');
                teamContent.classList.add('hidden');
                generateRealtimeRecommendations();
                teamPartial.classList.remove('hidden');
            } else if (filledTeamCount === 10) {
                teamEmpty.classList.add('hidden');
                teamPartial.classList.add('hidden');
                teamContent.classList.remove('hidden');
            }
        }
    }

    // ==========================================
    // Utilities
    // ==========================================
    function getJosa(name, type = '이/가') {
        const lastChar = name.charCodeAt(name.length - 1);
        const hasBatchim = (lastChar - 0xac00) % 28 !== 0;

        if (type === '이/가') return hasBatchim ? '이' : '가';
        if (type === '은/는') return hasBatchim ? '은' : '는';
        if (type === '을/를') return hasBatchim ? '을' : '를';
        return '';
    }

    function renderLaneMatchup(myChamp, enemyChamp) {
        // 임의의 라인전 우위 생성 (0: 내 챔피언 우세, 1: 반반, 2: 상대 챔피언 우세)
        const randomAdv = Math.floor(Math.random() * 3);

        // 태그를 고도화된 직무명으로 변환 (Mock logic)
        const getRoleDesc = (tags) => {
            if (!tags || tags.length === 0) return "미분류";
            const tagMap = {
                'Assassin': '암살자형',
                'Mage': '메이지형',
                'Marksman': '원딜형',
                'Tank': '탱커형',
                'Fighter': '전사형',
                'Support': '서포터형'
            };
            const role = tagMap[tags[0]] || tags[0];
            const prefix = (randomAdv === 0) ? '성장형 ' : (randomAdv === 1) ? '견제형 ' : '왕귀형 ';
            return prefix + role;
        };

        const myRoleDesc = getRoleDesc(myChamp.tags);
        const enemyRoleDesc = getRoleDesc(enemyChamp.tags);

        let advantageSummary = "";
        let strategyTitle = "라인전 상대법";
        let summaryLines = "";
        let advantageClass = "";
        let matchupTypeHtml = `
            <div class="matchup-type-container">
                <div class="matchup-type-badge">${myRoleDesc}</div>
                <div class="vs-divider-micro" style="margin: 0 0.4rem; font-size: 0.7rem; opacity: 0.6;">VS</div>
                <div class="matchup-type-badge" style="border-color: var(--red); color: var(--red); background: rgba(255, 78, 78, 0.1);">${enemyRoleDesc}</div>
            </div>
        `;

        if (randomAdv === 0) {
            advantageSummary = `이 구도는 <span class="highlight-name my">${myChamp.nameKo}</span>${getJosa(myChamp.nameKo)} <span class="tip-highlight">확실한 주도권</span>을 가집니다.`;
            advantageClass = "advantage-my";
            summaryLines = `
                <div class="summary-item-box">상대 주요 스킬이 빠질 때마다 <span class="tip-highlight">사거리 우위</span>를 이용해 적극적으로 딜교하세요.</div>
                <div class="summary-item-box">라인을 너무 밀기보다는, 상대가 <span class="tip-highlight">미니언을 먹으러 올 때마다 심리적 압박</span>을 주어야 합니다.</div>
                <div class="summary-item-box">킬을 노리기보다 <span class="tip-highlight">CS 격차를 벌리는 것</span>이 이 구도의 핵심입니다.</div>
            `;
        } else if (randomAdv === 1) {
            advantageSummary = `이 구도는 서로 실수를 기다리는 <span class="highlight-name neutral">반반 손싸움</span> 구도입니다.`;
            advantageClass = "advantage-neutral";
            summaryLines = `
                <div class="summary-item-box">핵심 <span class="tip-highlight">논타겟 스킬</span>을 누가 더 잘 맞추고 잘 피하느냐의 싸움입니다.</div>
                <div class="summary-item-box"><span class="tip-highlight">정글러의 개입</span>이 승부의 향방을 가를 수 있으므로 와딩에 신경쓰세요.</div>
                <div class="summary-item-box">상대보다 먼저 <span class="tip-highlight">핵심 코어 아이템</span>을 완성하는 타이밍을 노리세요.</div>
            `;
        } else {
            advantageSummary = `이 구도는 <span class="highlight-name enemy">${enemyChamp.nameKo}</span>${getJosa(enemyChamp.nameKo)} <span class="tip-highlight">매우 유리</span>하므로 방어적으로 임해야 합니다.`;
            advantageClass = "advantage-enemy";
            summaryLines = `
                <div class="summary-item-box">라인을 최대한 당겨서 유지하고, <span class="tip-highlight">무리한 딜교환</span>은 절대 피하세요.</div>
                <div class="summary-item-box">반반 가면 <span class="tip-highlight">후반 밸류</span>는 이쪽이 훨씬 높습니다. 인내심을 가지세요.</div>
                <div class="summary-item-box">상대 <span class="tip-highlight">주요 돌진기</span>가 빠졌을 때만 정글러를 호출하여 반격을 노리세요.</div>
            `;
        }

        // Mock Skills for UI
        const skills = [
            { key: 'Q', name: '현혹의 구', desc: '주력 딜링 스킬입니다.', cool: '6 / 5 / 4s' },
            { key: 'W', name: '여우불', desc: '타겟팅 보조 딜링기입니다.', cool: '8s' },
            { key: 'E', name: '매혹', desc: '가장 조심해야 할 핵심 CC기입니다.', cool: '12 / 8s' },
            { key: 'R', name: '혼령 질주', desc: '3회 기동 가능한 궁극기입니다.', cool: '120s', isUlt: true }
        ];

        laneContent.innerHTML = `
            <div class="matchup-top-banner">
                ${matchupTypeHtml}
                ${advantageSummary}
            </div>

            <div class="matchup-summary-box mb-2 ${advantageClass}">
                <h4 class="matchup-tips-title">⚔️ ${strategyTitle}</h4>
                <div class="matchup-summary-list">
                    ${summaryLines}
                </div>
            </div>

            <div class="split-bottom-row mb-2">
                <!-- 상대 핵심 스킬 (좌측) -->
                <div class="glass-card" style="flex: 1.2;">
                    <h4 class="card-title mb-2" style="font-size: 0.9rem;"><span class="icon">⏱️</span> 상대 핵심 스킬 (Cooldown)</h4>
                    <div class="skill-row-list">
                        ${skills.map(s => `
                            <div class="skill-row" style="grid-template-columns: 100px 1fr 80px; gap: 0.8rem; padding: 0.6rem 0.8rem;">
                                <div class="skill-row-left">
                                    <div class="skill-icon-box ${s.isUlt ? 'text-gold' : ''}" style="width:24px; height:24px; font-size:0.75rem;">${s.key}</div>
                                    <span class="skill-row-name" style="font-size:0.8rem;">${s.name}</span>
                                </div>
                                <div class="skill-row-desc" style="font-size:0.75rem; line-height:1.3;">${s.desc}</div>
                                <div class="skill-row-cool" style="font-size:0.75rem;">${s.cool}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 추천 룬 세팅 (우측) -->
                <div class="glass-card" style="flex: 1;">
                    <h4 class="card-title mb-2" style="font-size: 0.9rem;"><span class="icon">💎</span> 추천 룬 빌드</h4>
                    <div class="rune-options-container">
                        <div class="rune-option-box" style="padding: 0.8rem; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 0.8rem;">
                            <div class="rune-option-header" style="margin-bottom: 0.6rem; display: flex; justify-content: space-between;">
                                <span class="rune-option-tag" style="color: var(--gold); font-weight: bold;">[메인] 지배 + 영감</span>
                                <span class="text-gold" style="font-size: 0.75rem;">승률 54.2%</span>
                            </div>
                            <div class="rune-icons-row" style="display: flex; gap: 1rem; align-items: center;">
                                <div class="rune-group" style="display: flex; align-items: center; gap: 0.5rem;">
                                    <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png" style="width:32px; height:32px; border: 1px solid var(--gold); border-radius: 50%;">
                                    <span style="font-size:0.8rem;">감전</span>
                                </div>
                                <div class="rune-group" style="display: flex; align-items: center; gap: 0.5rem;">
                                    <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7203_Whimsy.png" style="width:24px; height:24px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%;">
                                    <span style="font-size:0.8rem; color:var(--text-muted);">비스킷</span>
                                </div>
                            </div>
                            <div class="rune-reason-box" style="margin-top: 0.6rem; padding: 0.5rem; background: rgba(61, 139, 255, 0.1); border-radius: 4px; font-size: 0.75rem;">
                                💡 초반 딜교환 압박 및 후반 폭발력 최적화
                            </div>
                        </div>

                        <div class="rune-option-box" style="padding: 0.8rem; background: rgba(255,255,255,0.01); border-radius: 8px; border: 1px dashed rgba(255,255,255,0.1);">
                            <div class="rune-option-header" style="margin-bottom: 0.6rem;">
                                <span class="rune-option-tag" style="color: var(--blue);">[서브] 마법 + 정밀</span>
                            </div>
                            <div class="rune-icons-row" style="display: flex; gap: 1rem; align-items: center;">
                                <div class="rune-group" style="display: flex; align-items: center; gap: 0.5rem;">
                                    <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png" style="width:32px; height:32px; border: 1px solid var(--blue); border-radius: 50%;">
                                    <span style="font-size:0.8rem;">유성</span>
                                </div>
                                <div class="rune-group" style="display: flex; align-items: center; gap: 0.5rem;">
                                    <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png" style="width:24px; height:24px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%;">
                                    <span style="font-size:0.8rem; color:var(--text-muted);">민첩함</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 추천 템트리 (하단 가로형) -->
            <div class="glass-card">
                <h4 class="card-title mb-2" style="font-size: 0.9rem;"><span class="icon">⚔️</span> 추천 템트리 (Build Path & Situational)</h4>
                <div class="item-build-tree">
                    <!-- 시작 아이템 -->
                    <div class="item-category">
                        <span class="category-label">시작 아이템</span>
                        <div class="item-node" title="도란의 반지">
                            <div class="item-icon-circle"><img src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/1056.png" alt="Doran's Ring"></div>
                            <div class="item-tooltip">라인 유지력과 마나 수급을 위한 필수 시작템</div>
                        </div>
                    </div>

                    <!-- 1코어 -->
                    <div class="item-category">
                        <span class="category-label">1코어 핵심</span>
                        <div class="item-node" title="루덴의 동반자">
                            <div class="item-icon-circle" style="border-color: var(--gold);"><img src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3001.png" alt="Luden's Companion"></div>
                            <div class="item-tooltip">강력한 스킬 데미지와 쿨감 확보 (최우선)</div>
                        </div>
                    </div>

                    <!-- 2코어 -->
                    <div class="item-category">
                        <span class="category-label">2코어 선택</span>
                        <div class="item-node" title="폭풍쇄도">
                            <div class="item-icon-circle" style="border-color: var(--red);"><img src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3135.png" alt="Stormsurge"></div>
                            <div class="item-tooltip">사이드 암살 및 순간 딜러 시너지 극대화</div>
                        </div>
                    </div>

                    <!-- 상황별 추천 -->
                    <div class="item-category">
                        <span class="category-label">상황별 아이템</span>
                        <div style="display: flex; gap: 1rem;">
                            <div class="item-node" title="공허의 지팡이">
                                <div class="item-icon-circle"><img src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3135.png" alt="Void Staff"></div>
                                <div class="item-tooltip"><strong>상대 탱커가 많을 때:</strong> 마법 관통력 확보</div>
                            </div>
                            <div class="item-node" title="망각의 구">
                                <div class="item-icon-circle"><img src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3916.png" alt="Oblivion Orb"></div>
                                <div class="item-tooltip"><strong>치유 감소가 필요할 때:</strong> 회복기 위주 챔피언 상대</div>
                            </div>
                            <div class="item-node" title="존야의 모래시계">
                                <div class="item-icon-circle"><img src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3157.png" alt="Zhonya's Hourglass"></div>
                                <div class="item-tooltip"><strong>생존이 급할 때:</strong> 암살자 진입 방어</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="text-align: right; font-size: 0.7rem; color: var(--gold); font-style: italic; margin-top: 0.5rem;">💡 아이콘에 마우스를 올리면 추천 이유를 볼 수 있습니다.</div>
            </div>
        `;
    }

    function updateDraftProgress(count) {
        draftCountText.textContent = count;
        draftCountPartial.textContent = count;
        draftBarFill.style.width = `${(count / 10) * 100}%`;
    }

    // Mock Logic: Pick random matching champions from array to show "Recommendation"
    function generateRealtimeRecommendations() {
        // Clear previous
        recCardsContainer.innerHTML = '';

        // Pick 3 pseudo-random champions from the list that aren't picked yet (Mocked)
        const pickedIds = Object.values(state.team).filter(c => c !== null).map(c => c.id);
        const available = champions.filter(c => !pickedIds.includes(c.id));

        // Just grab first 3 available to simulate logic
        const recs = available.slice(0, 3);

        const reasons = [
            "부족한 CC기를 보완해 줄 수단",
            "현재 구성된 아군과의 돌진 시너지 우수",
            "적군의 핵심 딜러를 카운터치는 픽"
        ];

        recs.forEach((champ, idx) => {
            const card = document.createElement('div');
            card.className = 'rec-card fade-in';
            card.style.animationDelay = `${idx * 0.1}s`;
            card.innerHTML = `
        <img src="https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champ.id}.png" alt="${champ.nameKo}" class="rec-img">
                <h4 class="text-gold mt-1">${champ.nameKo}</h4>
                <p class="rec-reason">${reasons[idx % reasons.length]}</p>
    `;
            recCardsContainer.appendChild(card);
        });
    }

    // Do NOT trigger slot auto-selection on initial load so user decides when to open Dropdown
});
