import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-section">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="desc">
        Millions of people are searching for jobs, salary, information,company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="job-link">
        <button type="button" className="find-jobs-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
