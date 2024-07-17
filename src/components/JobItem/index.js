import {Link} from 'react-router-dom'
import {IoStar} from 'react-icons/io5'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-item-details">
        <div className="top-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-section">
            <h1 className="job-title">{title}</h1>
            <div className="rating-section">
              <IoStar className="rating-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="mid-section">
          <div className="loc-emp-type">
            <MdLocationOn className="location-icon" />
            <p className="location">{location}</p>
            <FaSuitcase className="emp-icon" />
            <p className="emp-type">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <div className="desc-section">
          <h1 className="desc-text">Description</h1>
          <p className="job-desc">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItem
