import type { Dialogue } from '@/types/youtube'

export const dialogues: Dialogue[] = [
  {
    id: '1',
    startTime: '00:01:24:05',
    endTime: '00:01:28:30',
    text: '많은 사진 중에서 저런 순간이 포착이 된 거 같아요',
    translation: 'Trong nhiều tấm hình thì chắc tình cờ bắt được khoảnh khắc như vậy đó.',
  },
  {
    id: '2',
    startTime: '00:01:29:03',
    endTime: '00:01:30:01',
    text: '아 포착이',
    translation: 'À, "bắt được khoảnh khắc" hả.',
  },
  {
    id: '3',
    startTime: '00:01:30:02',
    endTime: '00:01:32:20',
    text: '근데 순간 포착 하기엔 {거울 셀카}인데',
    translation: 'Nhưng mà nói là khoảnh khắc tình cờ thì… cũng chỉ là selfie trước gương thôi mà.',
    commentary: `
거울 셀카

Ghép từ: "거울 (gương)" + "셀카 (selfie)" → nghĩa là chụp hình chính mình qua gương.
Tiếng Việt: "selfie trước gương".

👉 Giới trẻ Hàn dùng nhiều lắm. Dạo này thì bớt hot rồi, nhưng trong đời sống hằng ngày vẫn nghe thấy thường xuyên.
    `,
  },
  {
    id: '4',
    startTime: '00:01:32:20',
    endTime: '00:01:38:00',
    text: '내가 나를 계속 이렇게 멈춰서 찍{지 않았을까}',
    translation: 'Chắc là tao cứ đứng yên rồi tự chụp bản thân thôi á.',
    commentary: `
~(하)지 않았을까

Nghĩa: "Chắc là ~" / "Có lẽ ~"
Dùng để: suy đoán + nói một cách dè dặt, lịch sự.

Ví dụ:
벌써 집에 갔지 않았을까?
= "Chắc là đã về nhà rồi."
= "Có lẽ đã về nhà rồi."

👉 Hiểu đơn giản: "~하지 않았을까" = "아마 ~했을 거다" = "Chắc là ~".
    `,
  },
]
