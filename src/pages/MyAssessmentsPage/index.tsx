import { useState, useEffect } from 'react'
import { Assessment } from '../../api/assessment/types'
import { AssessmentService } from '../../services/assessment'
import { Criteria } from '../../api/criteria/types'
import { CriteriaService } from '../../services/criteria'

type AssessmentItemProps = Omit<Assessment, 'userId'> & { criteriaName: string }

const AssessmentItem = ({ criteriaName, score, comment, updatedAt }: AssessmentItemProps) => {
  return (
    <div className='w-full p-5 flex flex-col gap-4 rounded-lg border border-blue-600'>
      <div className='w-full flex flex-row items-center justify-between'>
        <span className='font-semibold text-base p-2 rounded-lg bg-blue-200'>{criteriaName}</span>
        <span className='text-sm text-gray-500'>{new Date(updatedAt).toLocaleString()}</span> {/* Format the date */}
      </div>
      <div className='w-full flex flex-row items-center gap-2'>
        <span className='font-semibold w-1/12'>{'Score: '}</span>
        <div className='w-full h-5 bg-gray-200 rounded-2xl dark:bg-gray-700 overflow-hidden'>
          <div
            className='h-5 bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-2xl flex flex-col items-center justify-center'
            style={{ width: `${((score > 0 ? score : 0) / 100) * 100}%` }}
          >
            {score}
          </div>
        </div>
      </div>
      <div className='w-full flex flex-row items-start gap-2'>
        <span className='font-semibold w-1/12'>{'Comments: '}</span>
        <div className='flex flex-row items-center justify-between w-full bg-gray-100 rounded-lg p-2'>
          <span className='text-sm font-light'>{comment}</span>
        </div>
      </div>
    </div>
  )
}

const MyAssessmentsPage = () => {
  const [assessmentList, setAssessmentList] = useState<Assessment[]>([])
  const [criteriaList, setCriteriaList] = useState<Criteria[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [assessmentsRes, criteriasRes] = await Promise.all([
          AssessmentService.getMyAssessment(),
          CriteriaService.getCriterias()
        ])
        setAssessmentList(assessmentsRes.data)
        setCriteriaList(criteriasRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='flex flex-col gap-4 p-5'>
      <p className='font-semibold text-2xl'>My Assessments</p>
      {loading ? (
        <div className='text-center mt-5'>
          <div role='status'>
            <svg
              aria-hidden='true'
              className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {assessmentList.map((item) => (
            <AssessmentItem
              key={item.id}
              id={item.id}
              comment={item.comment}
              score={item.score}
              criteriaId={item.criteriaId}
              updatedAt={item.updatedAt} // Pass updatedAt
              criteriaName={criteriaList.find((criteria) => criteria.id === item.criteriaId)?.name || 'Unknown'}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default MyAssessmentsPage
