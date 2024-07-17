import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsData} = props
  const {
    companyLogoUrl,
    jobDescription,
    employmentType,
    location,
    rating,
    title,
  } = similarJobsData

  return (
    <li className="similar-jobs-container">
      <div className="title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-img"
        />
        <div className="contents">
          <h1 className="job-title">{title}</h1>
          <div className="rating-section">
            <AiFillStar className="star" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <div className="desc-section">
        <h1 className="desc-heading">Description</h1>
        <p className="desc-text">{jobDescription}</p>
      </div>
      <div className="location-section">
        <div className="loc-container">
          <MdLocationOn className="loc-icon" />
          <p className="loc-text">{location}</p>
        </div>
        <div className="emp-type">
          <p className="emp-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
