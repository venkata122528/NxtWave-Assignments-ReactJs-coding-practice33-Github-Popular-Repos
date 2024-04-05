// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {each} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = each

  return (
    <li className="eachCard">
      <img src={avatarUrl} alt={name} className="" />
      <h1 className="languageName">{name}</h1>
      <div className="">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className=""
          alt="stars"
        />
        <p className="">{starsCount}</p>
      </div>
      <div className="">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className=""
          alt="forks"
        />
        <p className="">{forksCount}</p>
      </div>
      <div className="">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className=""
          alt="open issues"
        />
        <p className="">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
