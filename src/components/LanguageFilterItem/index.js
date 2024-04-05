// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {each, onClickLanguageButton, selectedButtonId} = props
  const {id, language} = each

  const onClickButton = () => {
    onClickLanguageButton(id)
  }

  let className
  if (id === selectedButtonId) {
    className = 'selectedButton'
  } else {
    className = 'eachLanguageButton'
  }

  return (
    <li className="eachButtonListItem">
      <button type="button" className={className} onClick={onClickButton}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
