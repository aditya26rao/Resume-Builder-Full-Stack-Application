import React from 'react'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ClassicTemplate from './templates/ClassicTemplate'

const ResumePreview = ({ data, template, accentColor, classes = '' }) => {

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} accentColor={accentColor} />
      case 'minimal':
        return <MinimalTemplate data={data} accentColor={accentColor} />
      case 'minimal-image':
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className='w-full bg-gray-100'>
      <div
        id='resume-preview'
        className={`border border-gray-200 print:shadow-none print:border-none ${classes}`}
      >
        {renderTemplate()}

        {/* Print CSS */}
        <style>{`
          @media print {
            @page {
              size: auto;
              margin: 0mm;
            }
            
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              background-color: white;
            }
          }
        `}</style>
      </div>
    </div>
  )
}

export default ResumePreview
