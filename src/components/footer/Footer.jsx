import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
      <p className='footer--copy'>copyright &copy; DayveShop</p> 
      <div className="footer--contact">
        <p className="text">contact the web developer </p>
        <a href="https://github.com/Dayvyno2021" target="_blank" rel="noopener noreferrer">
          <svg className="svg--icon github"><use xlinkHref="/img/symbol-defs.svg#icon-github-with-circle"></use></svg>
        </a>
        <a href="https://www.linkedin.com/in/david-okafor-58b947a3" target="_blank" rel="noopener noreferrer">
          <svg className="svg--icon linkedin"><use xlinkHref="/img/symbol-defs.svg#icon-linkedin-with-circle"></use></svg> 
        </a>
      </div>
    </div>
  )
}

export default Footer