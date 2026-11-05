# comment-image-generator

Notoow의 브라우저용 댓글 이미지 생성기입니다.

사이트: https://notoow.github.io/comment-image-generator/

## 기능

- YouTube, Instagram, TikTok, Reddit, X, Facebook, Threads
- 바이두 티에바, Bilibili, Weibo, 샤오홍슈, Douyin
- 2chan(후타바), 5ch, 디시인사이드
- 아이디, 댓글, 작성 시점, 반응 수 편집 및 실시간 미리보기
- 기본/랜덤/업로드/모자이크/블러 프로필
- 프로필과 아이디를 각각 독립적으로 랜덤 생성
- 아바타 색상 팔레트·직접 색상 선택, 이니셜 프로필
- 아이디 종류 선택: 색상, 음식, 자연어, 무작위 알파벳 조합
- 밝은 이미지와 어두운 이미지, 배경 불투명도, 투명 PNG
- 이미지 너비·글자 크기·좌우 및 상하 여백 조절
- 댓글 이미지의 네 변·네 모서리를 드래그해 너비와 높이 조절
- 실시간 줄바꿈·크기 표시, 방향키 조절(Shift: 10px), 높이 자동 복구
- 캔버스 상단 테마 전환, 유튜브 우측 삼점 버튼, 긴 댓글 4줄 접힘·펼침
- 바이두 본문 댓글·대댓글 형태 선택, 도우인 지역 표시 편집
- 2배 해상도 PNG 다운로드와 저장용 이미지 보기

댓글은 플랫폼별 DOM 템플릿으로 배치한 뒤 PNG로 변환합니다. 실제 웹 댓글을
열어 확인한 아이콘·간격·글자 크기를 반영하며, 플랫폼별 비교 결과와 제한은
[검증 기록](docs/platform-audit.md)에 정리했습니다. 바이두·Threads·Douyin은
[실제 웹 댓글 캡처 비교](docs/capture-comparison.md)를 반영했습니다. 캡처 기반의
크기 추정과 원본 DOM 실측은 구분하며, 모든 플랫폼·너비의 픽셀 일치를 주장하지 않습니다. [너비별 검증 페이지](tests/platform-layout.html)에서
15개 플랫폼의 줄바꿈·카드 경계·PNG 출력을 재검사할 수 있습니다.

플랫폼을 참고한 편집용 스타일이며 실제 게시글 캡처나 해당 플랫폼과의 제휴를 뜻하지 않습니다. 댓글을 자동 작성하거나 사이트에 게시하지 않습니다.

## 실행

빌드 과정 없이 정적 파일로 실행합니다.

```sh
python -m http.server 4186 --bind 127.0.0.1
```

## 개인정보

이미지 편집은 브라우저 안에서 처리합니다. 사진을 서버로 전송하지 않습니다. 텍스트와 설정은 이 브라우저의 localStorage에 저장되며 업로드한 사진은 저장하지 않습니다. 사이트 데이터를 지우면 저장된 설정도 지워집니다. 외부 CDN이나 분석 스크립트를 사용하지 않습니다.

## 배포

GitHub Pages: `main` 브랜치의 루트(`/`). `.nojekyll`로 정적 파일을 제공합니다. Open Graph와 Twitter 공유 카드는 `assets/og-image.png`를 사용합니다.

## 포함된 자산

- Lucide 1.17.0: `assets/vendor/lucide-LICENSE.txt`
- Pretendard Variable: `assets/OFL.txt`
- Roboto: `assets/Roboto-OFL.txt`
- html-to-image 1.11.13: `assets/vendor/html-to-image-LICENSE.txt`
- OG 이미지: OpenAI 내장 이미지 생성 도구로 제작. 프롬프트는 `docs/og-image-prompt.txt`.
