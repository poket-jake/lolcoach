# Vercel 배포 가이드 (Walkthrough)

이 가이드는 현재 프로젝트를 Vercel에 배포하는 구체적인 단계를 안내합니다.

## 1. 준비 사항
- 배포를 위해 `package.json`과 `vercel.json` 설정을 완료했습니다.
- Vercel 계정(무료)이 필요합니다. [vercel.com](https://vercel.com)에서 가입하세요.

## 2. 배포 방법 선택

### 옵션 A: GitHub 연동 (강력 추천)
가장 간편하고 지속적인 관리가 가능한 방법입니다.
1. **GitHub 저장소 생성**: [GitHub](https://github.com/new)에서 새 저장소를 만듭니다.
2. **코드 Push**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [내-저장소-URL]
   git push -u origin main
   ```
3. **Vercel 연동**:
   - Vercel 대시보드에서 `Add New` -> `Project` 선택.
   - 방금 만든 GitHub 저장소를 `Import` 합니다.
   - 별도의 빌드 설정 없이 `Deploy` 버튼을 누릅니다.

### 옵션 B: Vercel CLI 사용 (즉시 배포)
터미널에서 바로 배포하고 싶을 때 사용합니다.
1. **CLI 설치**:
   ```bash
   npm install -g vercel
   ```
2. **배포 시작**: 프로젝트 루트 폴더에서 다음을 입력합니다.
   ```bash
   vercel
   ```
3. **설정 동의**: 터미널에 나타나는 질문에 엔터를 눌러 기본값으로 진행합니다.
4. **완료**: 배포가 끝나면 제공되는 `Production` URL로 접속합니다.

## 3. 배포 확인
배포가 완료되면 다음과 같은 항목을 확인하세요:
- `https://[프로젝트명].vercel.app` 과 같은 URL로 접속이 가능한가?
- 챔피언 목록이 정상적으로 불러와지는가? (DDragon 이미지 로딩 확인)
- 라인전 및 밴픽 분석 기능이 정상 작동하는가?

이제 '브실골플' 서비스를 전 세계 어디서든 링크로 공유할 수 있습니다!
