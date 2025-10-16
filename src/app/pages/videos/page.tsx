import { VideoCategory } from '@/features/video/components/video-category'
import { VideoFeeds } from '@/features/video/components/video-feeds'

const Home = () => {
  return (
    <div>
      <VideoCategory />
      <VideoFeeds />
      {/* <div className="px-4">
        <VideoList />
      </div> */}
    </div>
  )
}

export default Home
