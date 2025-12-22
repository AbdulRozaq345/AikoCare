import React from 'react'
import {FocusCardsDemo} from '@/components/focuscard'
import {NavbarDemo} from '@/components/navbar'
import {TextGenerateEffectDemo} from '@/components/textgenerate'
function page() {
  return (
    <div className="min-h-screen py-20 flex flex-col items-center justify-center ">
        <NavbarDemo />
        <section className="relative overflow-hidden w-full  px-4 sm:px-8 lg:px-16">
        <div className="mx-auto text-center max-w-4xl px-4  ">
            <p className="text-2xl uppercase text-gray-800 mb-3 font-bold ">Konsultasi</p>
            <div className="overflow-hidden ">
                <TextGenerateEffectDemo/>
            </div>
        </div>
        </section>
        <div className="lg:mb-30 py-12 w-full px-4 sm:px-8 lg:px-16">        
        <FocusCardsDemo />
        </div>
        
    </div>
  )
}

export default page