# 수학별 모험단 배포 안내

## 산출물
- `dist/`: 정적 웹 배포 파일
- `release.zip`: `dist/` 압축 배포본
- `LICENSES.md`: 라이브러리와 콘텐츠 권리 정책
- `QA_REPORT.md`: 빌드, 성능, 저작권 검수 기록

## 로컬 실행
배포 파일만 실행할 때는 `dist` 폴더 안의 `START_GAME.cmd`를 더블클릭한다. 브라우저가 자동으로 열리고, 터미널 창을 닫으면 로컬 게임 서버도 종료된다.

`dist/index.html`을 직접 더블클릭해 여는 방식은 브라우저 보안 정책 때문에 빈 화면이 나올 수 있다.

## 개발 실행
```powershell
npm.cmd install
npm.cmd run dev
```

브라우저에서 `http://127.0.0.1:5173`을 연다.

## 배포 빌드
```powershell
npm.cmd run release
```

명령이 성공하면 `dist/`와 `release.zip`이 생성된다. `release.zip`을 풀고 `START_GAME.cmd`를 실행하면 된다. `dist/` 폴더 내용은 정적 호스팅 서비스에도 그대로 올릴 수 있다.

## 게임플레이 QA
```powershell
npm.cmd run build
npm.cmd run qa:gameplay
```

Chrome에서 실제 화면을 열어 초등/중등 문제 출제, 보상상자, 도감, 아이템 장착을 자동 확인한다. 결과는 `qa-gameplay-result.json`에 저장된다.

## 브라우저 호환
- Chrome, Edge, Safari, Firefox 최신 버전
- 모바일 브라우저는 iOS Safari와 Android Chrome 최신 버전 기준
- 로컬 저장을 사용하므로 브라우저 데이터 삭제 시 진도와 도감이 삭제된다.

## 캐시 삭제
새 버전 배포 후 이전 파일이 보이면 브라우저 새로고침을 두 번 실행하거나 사이트 데이터 캐시를 삭제한다.
