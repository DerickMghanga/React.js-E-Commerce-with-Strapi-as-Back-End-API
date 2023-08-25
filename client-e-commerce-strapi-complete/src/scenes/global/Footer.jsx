import React from 'react'

const Footer = () => {
  return (
    <div className='mt-[70px] p-10 bg-[#f5f5f5]'>
      <div className='w-[88%] m-auto flex justify-between flex-wrap gap-y-7 gap-x-7'>

        <div>
          <h4 className='font-bold mb-10 text-[#d6001c]'>URBAN TRENDZ</h4>
          <p>
          Maecenas egestas arcu quis ligula mattis placerat.Praesent venenatis metus at tortor pulvinar varius.
          Maecenas egestas arcu quis ligula mattis placerat. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. 
          Proin sapien ipsum, porta a, auctor quis, euismod ut, mi.
          </p>
        </div>

        <div>
          <h4 className='font-bold mb-5'>About Us</h4>
          <p className='mb-2'>Careers</p>
          <p className='mb-2'>Our Stores</p>
          <p className='mb-2'>Terms & Conditions</p>
          <p className='mb-2'>Privacy Policy</p>
        </div>

        <div>
          <h4 className='font-bold mb-5'>Customer Care</h4>
          <p className='mb-2'>Help Center</p>
          <p className='mb-2'>Track your Order</p>
          <p className='mb-2'>Corporate & Bulk purchasing</p>
          <p className='mb-2'>Returns & Refunds</p>
        </div>

        <div>
          <h4 className='font-bold mb-10 text-[#d6001c]'>CONTACT US</h4>
          <p className='mb-6'>Ronald Ngala Street, Nairobi 00100</p>
          <p className='mb-6'><b>Email Us:</b> urbantrendz.co.ke </p>
          <p className='mb-6'><b>Call Us:</b> +254 744 433 322</p>
        </div>

      </div>
    </div>
  )
}

export default Footer