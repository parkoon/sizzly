import type { Dialogue } from '@/types/youtube'

export const dialogues: Dialogue[] = [
  {
    id: '1',
    startTime: '00:00:05:07',
    endTime: '00:00:07:08',
    text: '어! 내가 낼게',
    translation: 'Ơ! Để tao trả cho.',
  },
  {
    id: '2',
    startTime: '00:00:07:16',
    endTime: '00:00:08:20',
    text: '니가 왜 내?',
    translation: 'Ủa, sao mày lại trả?',
  },
  {
    id: '3',
    startTime: '00:00:08:20',
    endTime: '00:00:11:09',
    text: '{아이, 내가 밥 한번 사주고 싶어서 그렇지~}',
    translation: 'Thôi mà, tao chỉ muốn đãi mày một bữa thôi~',
    commentary: `
Ở Hàn Quốc, "밥 사주다" (mời cơm) không chỉ là ăn cơm đơn thuần,
mà còn mang nghĩa đãi bạn bè/người quen một bữa.

Vì vậy, câu này không chỉ là "muốn trả tiền",
mà là cách thể hiện sự thân mật, quan tâm.

Ngoài ra, khi muốn cảm ơn, người Hàn cũng thường "mời cơm" để báo đáp.

Ví dụ:
다음에 내가 밥살게 → Lần sau để tao đãi một bữa.
    `,
  },
  {
    id: '4',
    startTime: '00:00:11:09',
    endTime: '00:00:13:02',
    text: '내가 먹자고 했으니까 내가내',
    translation: 'Tao rủ đi ăn mà, để tao trả.',
  },
  {
    id: '5',
    startTime: '00:00:13:09',
    endTime: '00:00:14:29',
    text: '그럼, 내기해 ',
    translation: 'Vậy thì cá cược đi.',
  },
  {
    id: '6',
    startTime: '00:00:14:29',
    endTime: '00:00:17:06',
    text: '끝말잇기에서 지는 사람이 내기 콜?',
    translation: 'Thua nối chữ thì trả tiền, ok?',
  },
  {
    id: '7',
    startTime: '00:00:17:06',
    endTime: '00:00:18:04',
    text: '뭔 내기야, 됐어',
    translation: 'Cá cược gì chứ, thôi khỏi.',
  },
]
