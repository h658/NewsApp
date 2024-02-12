import React,{useEffect, useState}from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{
const [articles, setArticles] = useState([])
const [loading, setLoading] = useState(true)
const [page, setPage] = useState(1)
const [totalResults, setTotalResults] = useState(0)

//  articles = [   //articles is a variable which we can access by articles
//         {
//             "source": {
//                 "id": null,
//                 "name": "247Sports"
//             },
//             "author": "Steve Wiltfong",
//             "title": "Blue-Chip Buzz: The latest on top prospects as morning of the Early Signing Period hits - 247Sports",
//             "description": "News and notes with the three-day Early Signing Period on the horizon.",
//             "url": "https://247sports.com/Article/blue-chip-buzz-the-latest-on-top-prospects-with-less-than-eight-hours-till-signing-day-begins-223546672",
//             "urlToImage": "https://s3media.247sports.com/Uploads/Assets/221/731/11731221.jpg",
//             "publishedAt": "2023-12-20T04:26:40Z",
//             "content": "We are under eight hours until the three-day Early Signing Period begins and college football prospects can start putting pen to paper and locking in their respective futures. There will be many rush… [+6059 chars]"
//         },
//         {
//             "source": {
//                 "id": "the-hill",
//                 "name": "The Hill"
//             },
//             "author": "Tara Suter",
//             "title": "Stephen A. Smith slams Texas immigration law as 'a disgrace,' 'inhumane' - The Hill",
//             "description": "Sports commentator Stephen A. Smith slammed Texas’ new immigration law in a post on his account on X, the platform formerly known as Twitter, on Tuesday. “This is a disgrace. It is inhumane,” the ESPN host said in the post.  The post also featured a clip from…",
//             "url": "https://thehill.com/homenews/media/4368906-stephen-a-smith-slams-texas-immigration-law/",
//             "urlToImage": "https://thehill.com/wp-content/uploads/sites/2/2023/04/StephenASmithSemafor_Getty.jpg?w=1280",
//             "publishedAt": "2023-12-20T02:18:00Z",
//             "content": "Skip to content\r\nSports commentator Stephen A. Smith slammed Texas’ new immigration law in a post on his account on X, the platform formerly known as Twitter, on Tuesday.\r\n“This is a disgrace. It is … [+2256 chars]"
//         },
//         {
//             "source": {
//                 "id": null,
//                 "name": "CBS Sports"
//             },
//             "author": "",
//             "title": "Ranking all 32 NFL teams, plus grades from Seahawks' stunning win against Eagles and NFL playoff picture - CBS Sports",
//             "description": "Here's everything you need to know about the NFL for Dec. 19",
//             "url": "https://www.cbssports.com/nfl/news/ranking-all-32-nfl-teams-plus-grades-from-seahawks-stunning-win-against-eagles-and-nfl-playoff-picture/",
//             "urlToImage": "https://sportshub.cbsistatic.com/i/r/2023/12/19/5618f585-11ea-4126-a26e-f9542442d92d/thumbnail/1200x675/5eec90f41b6367d34e45dc7f81d0c38c/drew-lock.jpg",
//             "publishedAt": "2023-12-19T18:07:01Z",
//             "content": "Welcome to the Tuesday edition of the Pick Six newsletter!\r\nAfter demoting their defensive coordinator over the weekend, the Eagles might want to think about demoting everyone on the defensive coachi… [+13782 chars]"
//         }
//     ]

const firstCapitalLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1)
}

const updateNews = async() =>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=769ab24ade23464482fc1e120aa01360&page=${page}&pageSize=${props.pageSize}`
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
}

useEffect(()=>{
    document.title= `${firstCapitalLetter(props.category)}- NewsKitten`;
    updateNews()
  },[])
    
//  const handlePrevClick = async () => {
//          setPage(page-1)
//          updateNews();
//     }

//  const handleNextClick = async () => {
//         setPage(page+1)
//         updateNews();
//     }

    const fetchMoreData =async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=769ab24ade23464482fc1e120aa01360&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)  }
    
   
        return (
            <>
               <h1 className="text-center"style={{marginTop:'90px'}}>News Kitten- Top  {firstCapitalLetter(props.category)} Headlines </h1> 
                {loading && <Loader/>}
                {/* loading true xa vhni </loader> dekhau */}

                <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles!== totalResults}
                loader={<Loader/>}>
        
                <div className="container">
                <div className='row my-4'>
                    {articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                        })}
                    </div>

                </div>
                </InfiniteScroll>
                </>
        )
                    }
                 
News.defaultProps = {
    country: 'us',
    pageSize:'6',
    category:'general'
}
 News.PropTypes= {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
}
export default News
