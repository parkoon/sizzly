/**
 * 시간 문자열을 초로 변환
 * @param timeString - "HH:MM:SS" 또는 "MM:SS" 형식의 시간 문자열
 * @returns 초 단위의 시간
 * @example
 * timeStringToSeconds("00:17:27") // 1047
 * timeStringToSeconds("17:27") // 1047
 * timeStringToSeconds("1:30:45") // 5445
 */
export function timeStringToSeconds(timeString: string): number {
  const parts = timeString.split(':').map(part => parseInt(part, 10))

  if (parts.length === 3) {
    // HH:MM:SS
    const [hours, minutes, seconds] = parts
    return hours * 3600 + minutes * 60 + seconds
  } else if (parts.length === 2) {
    // MM:SS
    const [minutes, seconds] = parts
    return minutes * 60 + seconds
  } else if (parts.length === 1) {
    // SS
    return parts[0]
  }

  return 0
}

/**
 * 초를 시간 문자열로 변환
 * @param seconds - 초 단위의 시간
 * @returns "HH:MM:SS" 형식의 시간 문자열 (1시간 미만인 경우 "MM:SS")
 * @example
 * secondsToTimeString(1047) // "17:27"
 * secondsToTimeString(5445) // "1:30:45"
 */
export function secondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * 타임코드 문자열(HH:MM:SS:MS)을 초 단위로 변환합니다.
 * @param timeCode - "HH:MM:SS:MS" 형식의 문자열 (예: "00:17:34:12")
 * @returns 초 단위의 숫자값
 * @throws 유효하지 않은 타임코드 형식일 경우 에러
 */
export function timeCodeToSeconds(timeCode: string): number {
  // 입력값 검증
  if (!timeCode || typeof timeCode !== 'string') {
    throw new Error('타임코드 문자열이 필요합니다')
  }

  // 타임코드 형식 검증 (HH:MM:SS:MS)
  const timeCodeRegex = /^(\d{2}):(\d{2}):(\d{2}):(\d{2})$/
  const match = timeCode.match(timeCodeRegex)

  if (!match) {
    throw new Error('잘못된 타임코드 형식입니다. HH:MM:SS:MS 형식이어야 합니다')
  }

  const [, hours, minutes, seconds, milliseconds] = match

  // 각 부분을 숫자로 변환
  const h = parseInt(hours, 10)
  const m = parseInt(minutes, 10)
  const s = parseInt(seconds, 10)
  const ms = parseInt(milliseconds, 10)

  // 유효 범위 검증
  if (m >= 60) {
    throw new Error('분은 0-59 사이여야 합니다')
  }
  if (s >= 60) {
    throw new Error('초는 0-59 사이여야 합니다')
  }
  if (ms >= 100) {
    throw new Error('밀리초는 0-99 사이여야 합니다')
  }

  // 초 단위로 변환
  const totalSeconds = h * 3600 + m * 60 + s + ms / 100

  return totalSeconds
}

/**
 * 초를 타임코드 형식으로 변환하는 역함수
 * @param totalSeconds - 초 단위 숫자
 * @returns "HH:MM:SS:MS" 형식의 문자열
 */
export function secondsToTimeCode(totalSeconds: number): string {
  if (totalSeconds < 0) {
    throw new Error('초는 음수일 수 없습니다')
  }

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)
  const milliseconds = Math.round((totalSeconds % 1) * 100)

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
    milliseconds.toString().padStart(2, '0'),
  ].join(':')
}
