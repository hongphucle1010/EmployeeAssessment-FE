import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Modal, Spinner } from 'flowbite-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Assessment } from '../../api/assessment/types'
import { AssessmentService } from '../../services/assessment'
import { Criteria } from '../../api/criteria/types'
import { CriteriaService } from '../../services/criteria'
import { SuperviseeService } from '../../services/supervisee'

/* 
Giả sử Assessment có kiểu:
interface Assessment {
  id: number
  criteriaId: number
  score: number
  comment: string
  updatedAt: string
  userId: number
}
*/

type AssessmentItemProps = Omit<Assessment, 'userId'> & {
  criteriaName: string
  onDelete: (id: number) => void
  onEdit: (assessment: Assessment) => void
}

const AssessmentItem: React.FC<AssessmentItemProps> = ({ id, comment, score, criteriaName, onDelete, onEdit }) => {
  return (
    <div className='w-full p-5 flex flex-col gap-4 rounded-lg border border-blue-600'>
      <div className='w-full flex flex-row items-center justify-between'>
        <span className='font-semibold text-base p-2 rounded-lg bg-blue-200'>{criteriaName}</span>
        <div className='flex flex-row items-center gap-2'>
          <button
            className='hover:underline'
            onClick={() => onEdit({ id, criteriaId: 0, score, comment, updatedAt: '', userId: 0 } as Assessment)}
          >
            Edit
          </button>
          {' | '}
          <button className='hover:underline' onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </div>

      <div className='w-full flex flex-row items-center gap-2'>
        <span className='font-semibold w-1/12'>{'Score: '}</span>
        <div className='w-full h-5 bg-gray-200 rounded-2xl dark:bg-gray-700 overflow-hidden'>
          <div
            className='h-5 bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-2xl flex flex-col items-center justify-center'
            style={{ width: `${(score / 100) * 100}%` }}
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

// Schema xác thực cho edit assessment
const AssessmentSchema = yup.object().shape({
  score: yup
    .number()
    .min(0, 'Score must be at least 0')
    .max(100, 'Score must be at most 100')
    .required('Score is required'),
  comment: yup.string().required('Comment is required')
})

type EditAssessmentForm = {
  score: number
  comment: string
}

interface EditAssessmentModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  assessment: Assessment
  updateAssessment: (updated: Assessment) => void
}

const EditAssessmentModal: React.FC<EditAssessmentModalProps> = ({ open, setOpen, assessment, updateAssessment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditAssessmentForm>({
    resolver: yupResolver(AssessmentSchema),
    defaultValues: {
      score: assessment.score,
      comment: assessment.comment
    }
  })
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<EditAssessmentForm> = async (data) => {
    setLoading(true)
    try {
      // Gọi API update assessment
      const response = await AssessmentService.updateAssessment(assessment.id, {
        ...assessment,
        ...data
      })
      const updatedAssessment = response.data
      updateAssessment(updatedAssessment)
      setOpen(false)
    } catch (error) {
      console.error('Failed to update assessment', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={open} onClose={() => setOpen(false)}>
      <Modal.Header>Edit Assessment</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div>
            <label className='font-semibold text-sm' htmlFor='EditAssessmentScore'>
              Score:
            </label>
            <input
              id='EditAssessmentScore'
              type='number'
              className='w-full p-2 mt-1 border border-gray-300 rounded-md'
              {...register('score')}
            />
            {errors.score && <p className='text-red-500 text-xs'>{errors.score.message}</p>}
          </div>
          <div>
            <label className='font-semibold text-sm' htmlFor='EditAssessmentComment'>
              Comment:
            </label>
            <input
              id='EditAssessmentComment'
              type='text'
              className='w-full p-2 mt-1 border border-gray-300 rounded-md'
              {...register('comment')}
            />
            {errors.comment && <p className='text-red-500 text-xs'>{errors.comment.message}</p>}
          </div>
          <div className='flex justify-end gap-3'>
            <button
              type='button'
              className='px-3 py-2 rounded-md bg-gray-300 text-white'
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-3 py-2 rounded-md bg-blue-600 text-white flex items-center gap-2'
              disabled={loading}
            >
              {loading && <Spinner size='sm' />}
              Save
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

const SuperviseeAssessmentsPage = () => {
  const [assessmentList, setAssessmentList] = useState<Assessment[]>([])
  const [criteriaList, setCriteriaList] = useState<Criteria[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [editAssessment, setEditAssessment] = useState<Assessment | null>(null)
  const [supervisee, setSuperviseeName] = useState<string>('Unknown')
  const { id } = useParams<{ id: string }>()
  const sId = Number(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [assessmentsRes, criteriasRes, superviseeRes] = await Promise.all([
          AssessmentService.getAssessmentByUserId(sId),
          CriteriaService.getCriterias(),
          SuperviseeService.getSuperviseeById(sId)
        ])
        setAssessmentList(assessmentsRes.data)
        setCriteriaList(criteriasRes.data)
        const supervisee = superviseeRes.data.username
        setSuperviseeName(supervisee)
        console.log('supervisee', supervisee)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [sId])

  // Hàm xóa Assessment
  const handleDelete = async (assessmentId: number) => {
    try {
      await AssessmentService.deleteAssessment(assessmentId)
      setAssessmentList((prev) => prev.filter((item) => item.id !== assessmentId))
    } catch (error) {
      console.error('Error deleting assessment:', error)
    }
  }

  // Hàm Edit: mở modal chỉnh sửa và lưu assessment cần chỉnh sửa vào state
  const handleEdit = (assessment: Assessment) => {
    // Tìm assessment hiện tại trong danh sách (nếu cần)
    const current = assessmentList.find((item) => item.id === assessment.id)
    if (current) {
      setEditAssessment(current)
    }
  }

  // Hàm cập nhật assessment sau khi chỉnh sửa thành công từ modal
  const updateAssessmentInList = (updated: Assessment) => {
    setAssessmentList((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
  }

  return (
    <div className='flex flex-col gap-4 p-5'>
      <p className='font-semibold text-2xl'>Assessments: {supervisee}</p>

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
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 
                  100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 
                  0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 
                  91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 
                  27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 
                  50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 
                  97.0079 33.5539C95.2932 28.8227 92.871 24.3692 
                  89.8167 20.348C85.8452 15.1192 80.8826 10.7238 
                  75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 
                  56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 
                  41.7345 1.27873C39.2613 1.69328 37.813 4.19778 
                  38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 
                  44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 
                  55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 
                  70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 
                  82.5849 25.841C84.9175 28.9121 86.7997 32.2913 
                  88.1811 35.8758C89.083 38.2158 91.5421 39.6781 
                  93.9676 39.0409Z'
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
              criteriaName={criteriaList.find((criteria) => criteria.id === item.criteriaId)?.name || 'Unknown'}
              onDelete={handleDelete}
              onEdit={handleEdit}
              updatedAt={item.updatedAt}
            />
          ))}
        </>
      )}
      {/* Edit modal hiển thị khi có assessment đang chỉnh sửa */}
      {editAssessment && (
        <EditAssessmentModal
          open={true}
          setOpen={(open) => {
            if (!open) setEditAssessment(null)
          }}
          assessment={editAssessment}
          updateAssessment={updateAssessmentInList}
        />
      )}
    </div>
  )
}



export default SuperviseeAssessmentsPage
