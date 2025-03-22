import { useState } from "react"

import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

interface ICriteriaList {
    name: string,
    description: string,
}

// hard-coded data
const CRITERIA_LIST = [
    {
        id: 1,
        name: 'Hello Hello',
        description: 'Happy Happy Happy HappyHappy HappyHappy HappyHappy HappyHappy Happy'
    },
    {
        id: 2,
        name: 'Hello Hello',
        description: 'Happy Happy Happy HappyHappy HappyHappy HappyHappy HappyHappy Happy'
    },
    {
        id: 3,
        name: 'Hello Hello',
        description: 'Happy Happy Happy HappyHappy HappyHappy HappyHappy HappyHappy Happy'
    }
]

const CriteriaItem = ({ title, item }: { title: string, item: string }) => {
    return (
        <div className="flex flex-row items-start gap-2">
            {/* <span className="font-semibold">{title}</span> */}
            <div className="flex flex-row items-center justify-between w-full bg-gray-100 rounded-lg p-2">
                <span className="text-sm font-light">{item}</span>
            </div>
        </div>
    )
}

const CriteriaList = (props: ICriteriaList) => {
    return (
        <div className="w-full p-5 flex flex-col gap-4 rounded-lg border border-blue-600">
            <div className="w-full flex flex-row items-center justify-between">
                <span className="font-semibold text-base p-2 rounded-lg bg-blue-200">{props.name}</span>
                <div className="flex flex-row items-center gap-2">
                    <button
                        className="hover:underline"
                        onClick={() => { }}
                    >
                        Edit
                    </button>
                    {'|'}
                    <button
                        className="hover:underline"
                        onClick={() => { }}
                    >
                        Delete
                    </button>
                </div>
            </div>
            {/* <CriteriaItem title="Name" item={props.name} /> */}
            <CriteriaItem title="Description" item={props.description} />
        </div>
    )
}

const CriteriaSchema = yup.object().shape({
    name: yup
        .string()
        .required('Criteria name is required'),
    description: yup
        .string()
        .required('Description is required')
})

const NewCriteriaListForm = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ICriteriaList>({
        resolver: yupResolver(CriteriaSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    const onSubmit: SubmitHandler<ICriteriaList> = async (data) => {
        try {

        } catch(error) {
            console.error(error)
        }
    }

    return (
        <form className="w-full p-5 flex flex-col gap-4 rounded-lg border border-gray-300">
            <div className='flex flex-col gap-4 items-center justify-center'>
                <span className="text-xl font-semibold text-left w-full">New Criteria</span>
                <div className="w-full">
                    <label className='font-semibold text-sm'>Name: </label>
                    <input
                        id='CriteriaName'
                        type="text"
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                        placeholder="Criteria #1"
                        {...register('name')}
                    />
                </div>
                <div className="w-full">
                    <label className='font-semibold text-sm'>Description: </label>
                    <input
                        id='CriteriaDesc'
                        type="text"
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                        placeholder="Something about this criteria..."
                        {...register('description')}
                    />
                </div>
                <div className="flex flex-row items-center gap-3">
                    <button
                        className="px-3 py-2 rounded-md bg-gray-300 text-white"
                        onClick={() => setOpen(!open)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-3 py-2 rounded-md bg-blue-600 text-white"
                        onClick={() => setOpen(!open)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}

const CriteriaPage = () => {
    const [openNewForm, setOpenNewForm] = useState(false)

    return (
        <div className="flex flex-col items-start gap-4 text-black p-5">
            <span className="font-semibold text-2xl">My Criteria Collection</span>
            {CRITERIA_LIST.map((item) => (
                <CriteriaList key={item.id} name={item.name} description={item.description} />
            ))}
            {openNewForm && <NewCriteriaListForm open={openNewForm} setOpen={setOpenNewForm} />}
            <button
                disabled={openNewForm === true}
                className="w-full p-5 rounded-lg border-dashed border border-blue-600 text-blue-600 disabled:border-gray-400 disabled:text-gray-400"
                onClick={() => { setOpenNewForm(!openNewForm) }}
            >
                Add New Criteria
            </button>
        </div>
    )
}

export default CriteriaPage