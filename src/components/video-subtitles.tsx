import type { Dialogue } from '@/types/youtube'

import { CommentaryMarkdown } from './commentary-markdown'
import { HighlightedText } from './ui/highlighted-text'

type VideoSubtitlesProps = {
  data?: Dialogue
}
export const VideoSubtitles = ({ data }: VideoSubtitlesProps) => {
  if (!data) return null

  return (
    <div className="p-4">
      <div className="">
        <HighlightedText text={data.text} className="text-lg font-medium mb-2 block" />
        <p className="text-sm text-gray-600">{data.translation}</p>
        {data.commentary && (
          <div className="mt-4">
            <CommentaryMarkdown content={data.commentary} />
          </div>
        )}
      </div>
    </div>
  )
}
