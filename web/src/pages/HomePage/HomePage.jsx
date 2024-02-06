import ArticlesCell from 'src/components/ArticlesCell'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <h1>HomePage</h1>
      <ArticlesCell />
    </>
  )
}

export default HomePage
