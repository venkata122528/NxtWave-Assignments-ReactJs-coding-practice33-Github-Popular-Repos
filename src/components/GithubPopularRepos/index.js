import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatus = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    status: apiStatus.initial,
    language: languageFiltersData[0].id,
    languageData: [],
  }

  componentDidMount() {
    this.getLanguagesData()
  }

  getLanguagesData = async () => {
    this.setState({status: apiStatus.in_progress})
    const {language} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${language}`

    const response = await fetch(githubReposApiUrl)
    if (response.ok) {
      const data = await response.json()
      const neededFormatData = data.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({languageData: neededFormatData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  onClickLanguageButton = id => {
    this.setState({language: id}, this.getLanguagesData)
  }

  getLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failureImage"
      />
      <h1 className="failureText">Something Went Wrong</h1>
    </div>
  )

  render() {
    const {language, languageData, status} = this.state

    return (
      <div className="mainContainer">
        <h1 className="mainHeading">Popular</h1>
        <ul className="buttonsContainer">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              each={each}
              key={each.id}
              onClickLanguageButton={this.onClickLanguageButton}
              selectedButtonId={language}
            />
          ))}
        </ul>
        <ul className="cardOrResultContainer">
          {status === apiStatus.success &&
            languageData.map(each => (
              <RepositoryItem each={each} key={each.id} />
            ))}
          {status === apiStatus.in_progress && this.getLoader()}
          {status === apiStatus.failure && this.getFailureView()}
        </ul>
      </div>
    )
  }
}

export default GithubPopularRepos
