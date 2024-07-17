import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    checkBoxList: [],
    radioInput: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {checkBoxList, radioInput, searchInput} = this.state
    const type = checkBoxList.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const apirUrl = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apirUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeRadioInput = event => {
    this.setState({radioInput: event.target.id}, this.getJobs)
  }

  onChangeCheckbox = event => {
    const {checkBoxList} = this.state
    console.log(event.target.id)
    const inputInList = checkBoxList.filter(each => each === event.target.id)
    if (inputInList.length === 0) {
      this.setState(
        prevState => ({
          checkBoxList: [...prevState.checkBoxList, event.target.id],
        }),
        this.getJobs,
      )
    } else {
      const filteredList = checkBoxList.filter(each => each !== event.target.id)
      this.setState({checkBoxList: filteredList}, this.getJobs)
    }
  }

  onRetry = () => {
    this.getJobs()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-page">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retry-btn" onClick={this.onRetry} type="button">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    const isJobsPresent = jobsList.length !== 0
    return isJobsPresent ? (
      <ul className="job-list">
        {jobsList.map(eachItem => (
          <JobItem jobDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-job-title">No jobs found</h1>
        <p className="no-job-desc">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onRenderJobStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderCheckBox = () => (
    <ul className="checkBox-list">
      {employmentTypesList.map(eachItem => (
        <li className="checkbox-item" key={eachItem.employmentTypeId}>
          <input
            className="checkbox-input"
            id={eachItem.employmentTypeId}
            type="checkbox"
            onChange={this.onChangeCheckbox}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderRadioButton = () => (
    <ul className="radio-btn-list">
      {salaryRangesList.map(eachItem => (
        <li className="radio-item" key={eachItem.salaryRangeId}>
          <input
            type="radio"
            className="radio-input"
            name="option"
            id={eachItem.salaryRangeId}
            onChange={this.onChangeRadioInput}
          />
          <label className="label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <>
        <input
          type="search"
          className="search-box"
          value={searchInput}
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearch}
        />
        <button
          data-testid="searchButton"
          type="button"
          className="search-btn"
          onClick={this.onSubmitSearch}
          aria-label="search"
        >
          <AiOutlineSearch className="search-icon" />
        </button>
      </>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearch = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onSubmitSearch = () => {
    this.getJobs()
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="side-bar">
            <Profile />
            <hr />
            <h1 className="title-type">Type of Employment</h1>
            {this.renderCheckBox()}
            <hr />
            <h1 className="title-type">Salary Range</h1>
            {this.renderRadioButton()}
          </div>
          <div className="job-details-section">
            <div>{this.renderSearchBar()}</div>
            {this.onRenderJobStatus()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
