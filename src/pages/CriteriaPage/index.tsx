import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'flowbite-react'

import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CriteriaService } from '../../services/criteria'
import { Criteria } from '../../api/criteria/types'

const CriteriaItem = ({ title, item }: { title: string; item: string }) => {
  return (
    <div className='flex flex-row items-start gap-2'>
      <span className='font-semibold'>{title}</span>
      <div className='flex flex-row items-center justify-between w-full bg-gray-100 rounded-lg p-2'>
        <span className='text-sm font-light'>{item}</span>
      </div>
    </div>
  )
}

interface CriteriaListProps extends Criteria {
  setCriteriaList: React.Dispatch<React.SetStateAction<Criteria[]>>
}

const EditCriteriaModal = ({
  open,
  setOpen,
  criteria,
  setCriteriaList
}: {
  open: boolean
  setOpen: (open: boolean) => void
  criteria: Criteria
  setCriteriaList: React.Dispatch<React.SetStateAction<Criteria[]>>
}) => {
  const { register, handleSubmit } = useForm<Omit<Criteria, 'id'>>({
    resolver: yupResolver(CriteriaSchema),
    defaultValues: {
      name: criteria.name,
      description: criteria.description
    }
  })
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<Omit<Criteria, 'id'>> = async (data) => {
    setLoading(true)
    try {
      const response = await CriteriaService.updateCriteria(criteria.id, { ...criteria, ...data })
      const updatedCriteria = response.data
      setCriteriaList((prev) => prev.map((item) => (item.id === criteria.id ? updatedCriteria : item)))
      setOpen(false)
    } catch (error) {
      console.error('Failed to update criteria', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={open} onClose={() => setOpen(false)}>
      <Modal.Header>Edit Criteria</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div>
            <label className='font-semibold text-sm' htmlFor='EditCriteriaName'>
              Name:
            </label>
            <input
              id='EditCriteriaName'
              type='text'
              className='w-full p-2 mt-1 border border-gray-300 rounded-md'
              {...register('name')}
            />
          </div>
          <div>
            <label className='font-semibold text-sm' htmlFor='EditCriteriaDesc'>
              Description:
            </label>
            <input
              id='EditCriteriaDesc'
              type='text'
              className='w-full p-2 mt-1 border border-gray-300 rounded-md'
              {...register('description')}
            />
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

const CriteriaList = (props: CriteriaListProps) => {
  const [openEditModal, setOpenEditModal] = useState(false)

  return (
    <div className='w-full p-5 flex flex-col gap-4 rounded-lg border border-blue-600'>
      <div className='w-full flex flex-row items-center justify-between'>
        <span className='font-semibold text-base p-2 rounded-lg bg-blue-200'>{props.name}</span>
        <div className='flex flex-row items-center gap-2'>
          <button className='hover:underline' onClick={() => setOpenEditModal(true)}>
            Edit
          </button>
          {'|'}
          <button
            className='hover:underline'
            onClick={() => {
              CriteriaService.deleteCriteria(props.id).then((response) => {
                console.log('Criteria deleted', response)
                props.setCriteriaList((prev) => prev.filter((item) => item.id !== props.id))
              })
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <CriteriaItem title='Description' item={props.description} />
      <EditCriteriaModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        criteria={props}
        setCriteriaList={props.setCriteriaList}
      />
    </div>
  )
}

// Define a new type for form data that excludes the 'id' field
type CriteriaForm = Omit<Criteria, 'id'>

const CriteriaSchema = yup.object().shape({
  name: yup.string().required('Criteria name is required'),
  description: yup.string().required('Description is required')
})

const NewCriteriaListForm = ({
  open,
  setOpen,
  setCriteriaList
}: {
  open: boolean
  setOpen: (open: boolean) => void
  setCriteriaList: React.Dispatch<React.SetStateAction<Criteria[]>>
}) => {
  const { register, handleSubmit } = useForm<CriteriaForm>({
    resolver: yupResolver(CriteriaSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<CriteriaForm> = async (data) => {
    setLoading(true)
    try {
      const response = await CriteriaService.createCriteria(data)
      const newCriteria = response.data
      setCriteriaList((prev) => [...prev, newCriteria])
      setOpen(!open)
    } catch (error) {
      console.error('Failed to create criteria', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className='w-full p-5 flex flex-col gap-4 rounded-lg border border-gray-300'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-4 items-center justify-center'>
        <span className='text-xl font-semibold text-left w-full'>New Criteria</span>
        <div className='w-full'>
          <label className='font-semibold text-sm' htmlFor='CriteriaName'>
            Name:{' '}
          </label>
          <input
            id='CriteriaName'
            type='text'
            className='w-full p-2 mt-1 border border-gray-300 rounded-md'
            placeholder='Criteria #1'
            {...register('name')}
          />
        </div>
        <div className='w-full'>
          <label className='font-semibold text-sm' htmlFor='CriteriaDesc'>
            Description:{' '}
          </label>
          <input
            id='CriteriaDesc'
            type='text'
            className='w-full p-2 mt-1 border border-gray-300 rounded-md'
            placeholder='Something about this criteria...'
            {...register('description')}
          />
        </div>
        <div className='flex flex-row items-center gap-3'>
          <button
            className='px-3 py-2 rounded-md bg-gray-300 text-white'
            onClick={(e) => {
              e.preventDefault()
              setOpen(!open)
            }}
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
      </div>
    </form>
  )
}

const CriteriaPage = () => {
  const [openNewForm, setOpenNewForm] = useState(false)
  const [criteriaList, setCriteriaList] = useState<Criteria[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCriteria = async () => {
      setLoading(true)
      try {
        const response = await CriteriaService.getCriterias()
        setCriteriaList(response.data)
      } catch (error) {
        console.error('Failed to fetch criteria', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCriteria()
  }, [])

  return (
    <div className='flex flex-col items-start gap-4 text-black p-5'>
      <span className='font-semibold text-2xl'>My Criteria Collection</span>
      {loading ? (
        <div className='flex justify-center items-center w-full'>
          <Spinner size='lg' />
        </div>
      ) : (
        criteriaList.map((item) => (
          <CriteriaList
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            setCriteriaList={setCriteriaList}
          />
        ))
      )}
      {openNewForm && (
        <NewCriteriaListForm open={openNewForm} setOpen={setOpenNewForm} setCriteriaList={setCriteriaList} />
      )}
      <button
        disabled={openNewForm === true || loading}
        className='w-full p-5 rounded-lg border-dashed border border-blue-600 text-blue-600 disabled:border-gray-400 disabled:text-gray-400'
        onClick={() => {
          setOpenNewForm(!openNewForm)
        }}
      >
        Add New Criteria
      </button>
    </div>
  )
}

export default CriteriaPage
