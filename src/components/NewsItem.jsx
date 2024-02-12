import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className="card">
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 0
      }}>
        <span className="  badge rounded-pill bg-danger">  {source}  </span>
      </div>
      <img src={!imageUrl ? "https://images.foxtv.com/m107833-mcdn.mp.lura.live/iupl/0D2/D61/1280/720/0D2D6195ED7E895DA97570F6A9EA016F.jpg?Expires=2082758400&KeyName=mcpkey1&Signature=vj1bz7o4L9OxGtVSnAyGokUGlW8&ve=1&tl=1" : imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">


        <h5 className="card-title">{title} </h5>
        <p className="card-text">{description}...</p>
        <p className='card-text'><small className="text">By {author ? author : "Unknown"} on
          {new Date(date).toGMTString()}</small></p>
        { /* {new date obj banaim jasle iosString lai GMTString ma lanxa} */}
        <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
      </div>
      {/* target wala part opens the article in new tab */}
    </div>


  )
}


export default NewsItem
