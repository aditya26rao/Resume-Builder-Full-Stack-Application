import React from 'react'
import { Plus, Trash2, FolderIcon } from 'lucide-react'

const ProjectForm = ({ data = [], onChange }) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",
            tools: "",
        }
        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index)
        onChange(updated)
    }

    const updateProject = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div className='space-y-6'>

            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                        <FolderIcon className="w-5 h-5" />
                        Projects
                    </h3>
                    <p className='text-sm text-gray-500'>Add your project details</p>
                </div>

                <button
                    onClick={addProject}
                    className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'
                >
                    <Plus className='size-4' />
                    Add Project
                </button>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <FolderIcon className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No projects added yet.</p>
                    <p className='text-sm'>Click "Add Project" to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((project, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>

                            {/* Title + Remove Button */}
                            <div className='flex justify-between items-start'>
                                <h4 className='font-medium text-gray-700'>Project #{index + 1}</h4>
                                <button
                                    onClick={() => removeProject(index)}
                                    className='text-red-500 hover:text-red-700 transition-colors'
                                >
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            {/* Inputs */}
                            <div className='grid md:grid-cols-2 gap-3'>
                                <input
                                    value={project.name}
                                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                                    type="text"
                                    placeholder='Project Name'
                                    className='px-3 py-2 text-sm rounded-lg border border-gray-300'
                                />

                                <input
                                    value={project.type}
                                    onChange={(e) => updateProject(index, 'type', e.target.value)}
                                    type="text"
                                    placeholder='Project Type (e.g., Web App, ML Model)'
                                    className='px-3 py-2 text-sm rounded-lg border border-gray-300'
                                />
                            </div>

                            <textarea
                                value={project.description}
                                onChange={(e) => updateProject(index, 'description', e.target.value)}
                                placeholder='Project Description'
                                className='w-full px-3 py-2 text-sm rounded-lg border border-gray-300 h-24'
                            />

                            <input
                                value={project.tools}
                                onChange={(e) => updateProject(index, 'tools', e.target.value)}
                                type="text"
                                placeholder='Tools / Technologies (e.g., React, Django, MySQL)'
                                className='w-full px-3 py-2 text-sm rounded-lg border border-gray-300'
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProjectForm
