import { AssessmentApi } from '../../api/assessment'

const TestingPage: React.FC = () => {
  AssessmentApi.getMyAssesment().then((response) => {
    console.log(response.data)
  })
  return (
    <div>
      <h1>Testing Page</h1>
    </div>
  )
}

export default TestingPage
