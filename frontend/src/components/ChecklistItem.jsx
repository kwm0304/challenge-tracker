import PropTypes from 'prop-types'

const ChecklistItem = ({ label, value, onChange }) => {
  const rowStyle = "row-span-1  rounded-xl  items-center"
  const gridStyle = "grid grid-cols-2 justify-between  rounded-xl p-2  "
  const labelStyle = "text-amber-300 text-xl font-semibold"
  return (
    <div className={rowStyle}>
      <div className={gridStyle}>
        <input type='checkbox' className='w-8 ml-2' onChange={onChange} checked={value} />
        <label className={labelStyle}>{label}</label>
      </div>  
    </div>
  )
}

export default ChecklistItem

ChecklistItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}