import { useState, useEffect } from 'react'
import { Assessment } from '../../api/assessment/types'
import { AssessmentService } from '../../services/assessment'

const AssessmentItem = (props: Assessment) => {
  return (
    <div className='w-full p-5 flex flex-col gap-4 rounded-lg border border-blue-600'>
      <div className='w-full flex flex-row items-center justify-between'>
        <span className='font-semibold text-base p-2 rounded-lg bg-blue-200'>ID: {props.criteriaId}</span>
        <div className='flex flex-row items-center gap-2'>
          <button className='hover:underline' onClick={() => {}}>
            Details
          </button>
          {'|'}
          <button className='hover:underline' onClick={() => {}}>
            Feedback
          </button>
        </div>
      </div>
      <div className='w-full flex flex-row items-center gap-2'>
        <span className='font-semibold w-1/12'>{'Score: '}</span>
        <div className='w-full h-5 bg-gray-200 rounded-2xl dark:bg-gray-700 overflow-hidden'>
          <div
            className='h-5 bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-2xl flex flex-col items-center justify-center'
            style={{ width: `${(props.score / 100) * 100}%` }}
          >
            {/* {`${(props.score) / 100 * 100}`} % */}
            {props.score}
          </div>
        </div>
      </div>
      <div className='w-full flex flex-row items-start gap-2'>
        <span className='font-semibold w-1/12'>{'Comments: '}</span>
        <div className='flex flex-row items-center justify-between w-full bg-gray-100 rounded-lg p-2'>
          <span className='text-sm font-light'>{props.comment}</span>
        </div>
      </div>
    </div>
  )
}

const MyAssessmentsPage = () => {
  const [assessmentList, setAssessmentList] = useState<Assessment[]>([])

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await AssessmentService.getMyAssessment()
        console.log('My Assessments:', res.data)
        setAssessmentList(res.data)
      } catch (error) {
        console.error('Error fetching assessments:', error)
      }
    }

    fetchAssessments()
  }, [])

  return (
    <div className='flex flex-col gap-4 p-5'>
      <p className='font-semibold text-2xl'>My Assessments</p>
      {assessmentList.map((item, index) => (
        <AssessmentItem key={index} {...item} />
      ))}
    </div>
  )
}

export default MyAssessmentsPage
