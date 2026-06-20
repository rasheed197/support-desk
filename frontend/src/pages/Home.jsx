import {Link} from 'react-router-dom'
import {FaQuestionCircle, FaTicketAlt}  from 'react-icons/fa'


const Home = () => {
  return (
    <>
      <section className='heading'>
        <h1>What help do you need?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to='/new-ticket' className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link to='/tickets' className="btn btn-reverse btn-block">
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  )

}

export default Home
