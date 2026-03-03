import Footer from '@/components/home/Footer'
import Heading from '@/components/ui/Heading'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/16/solid'

export default function ContactView() {
  return (
    <div >
      <div className="py-10 max-w-5xl mx-auto ">
        <Heading 
          title='Contacto'
          description='¿Tienes dudas? Nos encantaría escucharte.'
        />

        <div className='space-y-10 mt-10 p-10'>
          <div className='flex items-center gap-10'>
            <EnvelopeIcon width={30} />
            <span className='text-lg font-bold'>Correo: correo@correo.com</span>
          </div>

          <div className='flex items-center gap-10'>
            <PhoneIcon width={30} />
            <span className='text-lg font-bold'>Número: 123 456 7890</span>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>    
  )
}
