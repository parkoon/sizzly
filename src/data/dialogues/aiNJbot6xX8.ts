import type { Dialogue } from '@/types/youtube'

export const dialogues: Dialogue[] = [
  {
    id: '1',
    startTime: '00:02:48:11',
    endTime: '00:02:49:05',
    text: '리사야',
    translation: 'Lisa ơi',
  },
  {
    id: '2',
    startTime: '00:02:49:20',
    endTime: '00:02:51:15',
    text: '나 이거 사면 나랑 같이 {해줄 거야?}',
    translation: 'Nếu mình mua cái này, cậu làm với mình chứ?',
    commentary: `
### V-아/어 줄 거야? — giải thích bằng tiếng Việt

- Ý nghĩa: Cách hỏi nhờ vả kèm xác nhận "(cậu) làm giúp mình nhé/chứ?"
- Hình thức: V + 아/어 + 주다 (làm giúp cho người nói) + "-ㄹ 거야?" (hỏi ý định)

- Ví dụ:
  - 나랑 같이 해줄 거야? → Làm với mình chứ?
  - 이거 좀 고쳐줄 거야? → Sửa cái này giúp mình chứ?
  - 도와줄 거야? → Giúp mình chứ?
  - 더 공손: 도와주실래요? → Anh/chị giúp em được không ạ?
    `,
  },
  {
    id: '3',
    startTime: '00:02:51:16',
    endTime: '00:02:51:27',
    text: '아니',
    translation: 'Không.',
  },
  {
    id: '4',
    startTime: '00:02:51:29',
    endTime: '00:02:52:22',
    text: '빨리 봐봐',
    translation: 'Xem nhanh đi.',
  },
  {
    id: '5',
    startTime: '00:02:52:25',
    endTime: '00:02:53:10',
    text: '뭔데?',
    translation: 'Gì vậy?',
    commentary: `
### "뭔데?" — giải thích bằng tiếng Việt

- Ý nghĩa: Câu hỏi ngắn, thân mật giữa người quen: "Cái đó là gì?/Là gì vậy?"
- Lịch sự hơn (뭐예요?): "Cái gì vậy ạ?" / "Là gì ạ?"
- Ví dụ:
  - 뭔데? → "Gì vậy?" / (Bắc) "Gì đấy?"
  - 뭐야? (ngạc nhiên/bối rối) → "Gì vậy?" (giọng ngạc nhiên)
    `,
  },
  {
    id: '6',
    startTime: '00:02:54:19',
    endTime: '00:02:55:01',
    text: "ok, let's go",
    translation: 'Ok, đi thôi!',
  },
  {
    id: '7',
    startTime: '00:02:56:00',
    endTime: '00:02:57:04',
    text: '너 나랑 같이 해줄거야?',
    translation: 'Cậu làm với mình chứ?',
  },
  {
    id: '8',
    startTime: '00:02:57:10',
    endTime: '00:02:57:25',
    text: '응',
    translation: 'Ừ.',
  },
  {
    id: '9',
    startTime: '00:02:57:30',
    endTime: '00:02:58:18',
    text: '파티 게임이다',
    translation: 'Game party đấy.',
  },
  {
    id: '10',
    startTime: '00:03:00:08',
    endTime: '00:03:02:00',
    text: '야, {죽는다} 나 봤어',
    translation: 'Này, sắp chết rồi, mình thấy rồi.',
    commentary: `
### Cách nói đùa "죽는다/죽겠다" (tiếng Việt)

- **Cốt lõi**: Không phải "chết" thật, mà là cách nói phóng đại cảm xúc; dùng giữa người thân/quEN để đùa hoặc nhấn mạnh.

- **1) Adj/V-아/어 죽겠다**: "... muốn chết" = rất/cực kỳ …
  - 배고파 죽겠다 → đói muốn chết
  - 웃겨 죽겠다 → buồn cười muốn chết

- **2) Cảnh báo/đe dọa đùa: ~하면 죽는다**
  - 늦으면 죽는다 → trễ là chết với tao đó (giỡn, thân mật)
  - 장난치면 죽는다 → đừng chọc, không là chết đó (giỡn)
  - Lưu ý: chỉ nên dùng giữa bạn bè; không phù hợp nơi trang trọng hoặc với người lớn.
    `,
  },
]
