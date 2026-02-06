import { Check, Palette } from 'lucide-react'
import React, { useState } from 'react'

const ColorPicker = ({ onChange, selectedColor }) => {
    const colors = [
        { name: 'Red', value: '#EF4444' },
        { name: 'Green', value: '#22C55E' },
        { name: 'Purple', value: '#A855F7' },
        { name: 'Orange', value: '#F97316' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Teal', value: '#14B8A6' },
        { name: 'Yellow', value: '#FACC15' },
        { name: 'Indigo', value: '#6366F1' },
        { name: 'Sky', value: '#0EA5E9' },
        { name: 'Rose', value: '#F43F5E' },
    ]

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
            >
                <Palette size={16} />
                <span className="max-sm:hidden">Accent</span>
            </button>

            {isOpen && (
                <div className="grid grid-cols-5 w-64 gap-3 absolute top-full left-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
                    {colors.map((color) => (
                        <div
                            key={color.value}
                            onClick={() => {
                                onChange(color.value)
                                setIsOpen(false)
                            }}
                            className="relative cursor-pointer group flex flex-col items-center"
                        >
                            {/* Circle */}
                            <div
                                className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-black/20 transition-colors flex items-center justify-center"
                                style={{ backgroundColor: color.value }}
                            >
                                {selectedColor === color.value && (
                                    <Check className="size-5 text-white drop-shadow" />
                                )}
                            </div>

                            {/* Name */}
                            <p className="text-xs text-center mt-1 text-gray-600">
                                {color.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ColorPicker
