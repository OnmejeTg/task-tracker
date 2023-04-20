import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'


const Head = ({ title, onShowAdd, showAdd }) => {
  const location = useLocation()

  return (
    <div className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && <Button text={showAdd ? 'Close' : 'Add'} color={showAdd ? 'Red' : "Green"} onClick={onShowAdd} />}
    </div>
  )
}

Head.defaultProps = {
  title: "Task Tracker",
}

Head.propTypes = {
  title: PropTypes.string,
}

// CSS style in JS

// const headingStyle = {
//     color:'red',
//     backgoundColor:"black"
// }

export default Head
