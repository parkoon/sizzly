import type { Dialogue } from '@/types/youtube'

export const dialogues: Dialogue[] = [
  {
    id: '1',
    startTime: '00:01:10:02',
    endTime: '00:01:12:00',
    text: '지은탁 피디 남자친구 {입니다}',
    translation: 'Mình là bạn trai của PD Ji Eun-tak.',
    commentary: `
## ~입니다
- Kính ngữ, trang trọng nhất trong tiếng Hàn.
- Dùng trong tình huống chính thức: phát biểu, phỏng vấn, bản tin, công việc.

### So với tiếng Việt
- Giống với "là" khi giới thiệu.
- Ví dụ:
  - 한국어: 저는 학생입니다.
  - Tiếng Việt: Tôi là học sinh.

### Trong hội thoại thường ngày
- Ít dùng. Người Hàn thường nói: "이에요/예요" hoặc "이야/야".
    `,
  },
  {
    id: '2',
    startTime: '00:01:13:28',
    endTime: '00:01:15:20',
    text: '아 정확히는 결혼할 사이입니다',
    translation: 'À, nói chính xác thì bọn mình sắp cưới nhau.',
  },
  {
    id: '3',
    startTime: '00:01:15:20',
    endTime: '00:01:16:23',
    text: '결혼식 이번 주말 어때?',
    translation: 'Đám cưới cuối tuần này thì sao?',
  },
  {
    id: '4',
    startTime: '00:01:17:21',
    endTime: '00:01:19:10',
    text: '{헐}',
    translation: 'Thật hả?',
    commentary: `
## 헐
- Từng là từ thịnh hành ở Hàn, giờ vẫn dùng thường xuyên.
- Dùng khi ngạc nhiên, sốc, bất ngờ, khó tin.

Tương đương tiếng Việt:
- "Trời ơi"
- "Thật hả?"
- "Ôi trời"
    `,
  },
  {
    id: '5',
    startTime: '00:01:19:10',
    endTime: '00:01:22:25',
    text: '점심부터 먹을까? 나가자',
    translation: 'Ăn trưa trước không? Ra ngoài đi.',
  },
]
