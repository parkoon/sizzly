import { useNavigate } from 'react-router'

import { paths } from '@/config/paths'
import { videos } from '@/data/videos'
import type { Video } from '@/types/youtube'
import { getYouTubeThumbnailUrl } from '@/utils/thumbnail'
import { secondsToTimeString, timeStringToSeconds } from '@/utils/time'

import { Button } from './ui/button'

const MAIN_VIDEO_ID = 'OaDLfF0LTyo'

export const MainVideoFeed = () => {
  const mainVideo = videos.find(video => video.videoId === MAIN_VIDEO_ID)

  if (!mainVideo) {
    return null
  }

  return (
    <div>
      <VideoCard
        video={{
          ...mainVideo,
          title: '내가 ___ 사주고 싶어서 그렇지~',
          description: 'Thôi mà, tao chỉ muốn đãi mày một bữa thôi~',
        }}
      />
    </div>
  )
}

type VideoCardProps = {
  video: Video
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(paths.watch.getHref(video.videoId))
  }

  return (
    <div className="flex flex-col rounded shadow-lg  border border-gray-200 px-6 py-8">
      <h2 className="text-2xl font-bold mb-5">“내가 살게~” cách nói</h2>
      <div className="relative mb-4">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded"
          onError={e => {
            // Fallback to YouTube thumbnail if local image not found
            const img = e.currentTarget
            img.src = getYouTubeThumbnailUrl(video.videoId)
          }}
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
          {secondsToTimeString(
            timeStringToSeconds(video.endTime) - timeStringToSeconds(video.startTime),
          )}
        </div>
      </div>
      <div className="flex-1 mt-3 px-3 text-center">
        <h3 className="line-clamp-2 leading-5 mb-1 text-lg font-semibold">{video.title}</h3>
        <p className="text-gray-600 mb-5">{video.description}</p>

        <Button block className="bg-primary" onClick={handleClick}>
          Bắt đầu
        </Button>
      </div>
    </div>
  )
}
