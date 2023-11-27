"use client";
import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
import { GoGoal } from "react-icons/go";
import { VscChecklist } from "react-icons/vsc";


const Delen = () => {
    const targetRef = useRef();
    return (
        <>
            <button className='absolute bg-[#002548] text-white p-5 rounded-lg mt-3 ml-3' onClick={() => generatePDF(targetRef, { filename: 'Stage.pdf' })}>Download PDF</button>
            <main ref={targetRef} className='bg-[#002548]'>

                <div className='text-white flex justify-center gap-10 p-32 bg-gradient-to-b to-[#002548] from-[#253849] '>
                    <div className='w-1/6'></div>
                    <div className='mr-20'>
                        <h1 className='text-3xl'>Icapps AP Hogeschool</h1>
                        <br />
                        <h2 className='text-5xl font-bold'>Stage John Doe</h2>
                        <h3 className='text-[#5ab38a] text-2xl font-bold mt-4'>27/08/2023 - 01/01/2024</h3>
                        <br />
                        <br />
                        <div className='flex gap-8'>
                            <div>
                                <h3 className='text-[#5ab38a]'>STAGEBEGELEIDER(S)</h3>
                                <p>Steve Jobs, Bill Gates</p>
                            </div>
                            <div>
                                <h3 className='text-[#5ab38a]'>CONTACTPERSOON</h3>
                                <p>Elon Musk</p>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className=' border-l-2 border-[#315c48] w-1/4'>
                        <h3 className='ml-16 text-[#5ab38a]'>BESCHRIJVING</h3>
                        <p className='ml-16'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                        <br />
                        <p className='ml-16'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>

                    </div>
                    <div className='w-1/6'></div>
                </div>



                <div className='text-white mb-32'>

                    <div className='flex'> {/*Deze blok is om doelen+icon te centeren*/}
                        <div className='w-1/2'></div>
                        <div className='text-4xl text-center font-semibold'>
                            <div className='ml-8 text-6xl text-[#5ab38a]'>
                                <GoGoal />
                            </div>
                            <h2 className='mt-3'>Doelen</h2>
                        </div>
                        <div className='w-1/2'></div>
                    </div>

                    <div className='flex flex-wrap ml-96 gap-4 mt-16'>
                        <div className='bg-[#1a3854] p-8 w-1/4 rounded-lg'> {/*hier doelen mappen, moet flex gewrapt worden*/}
                            <h3 className='text-xl font-bold'>Doel 1</h3>
                            <p className='text-[#5ab38a]'>27/08/2023</p>
                            <br />
                            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                        </div>
                        <div className='bg-[#1a3854] p-8 w-1/4 rounded-lg'>
                            <h3 className='text-xl font-bold'>Doel 1</h3>
                            <p className='text-[#5ab38a]'>27/08/2023</p>
                            <br />
                            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                        </div>
                        <div className='bg-[#1a3854] p-8 w-1/4 rounded-lg'>
                            <h3 className='text-xl font-bold'>Doel 1</h3>
                            <p className='text-[#5ab38a]'>27/08/2023</p>
                            <br />
                            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                        </div>
                        <div className='bg-[#1a3854] p-8 w-1/4 rounded-lg'>
                            <h3 className='text-xl font-bold'>Doel 1</h3>
                            <p className='text-[#5ab38a]'>27/08/2023</p>
                            <br />
                            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                        </div>
                    </div>
                </div>



                <div className='text-white'>
                    <div className='flex'> {/*Deze blok is om doelen+icon te centeren*/}
                        <div className='w-1/2'></div>
                        <div className='text-4xl text-center font-semibold'>
                            <div className='ml-14 text-6xl text-[#5ab38a]'>
                                <VscChecklist />
                            </div>
                            <h2 className='mt-3'>Checklist</h2>
                        </div>
                        <div className='w-1/2'></div>
                    </div>

                    <div className='flex justify-center gap-32 mt-16'>
                        <h3 className='my-auto text-2xl font-medium'>Voor de stage</h3>
                        <div className='flex-col w-1/3'>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'> {/*hier checklist secties mappen*/}
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center gap-32 mt-16'>
                        <div className='flex-col w-1/3'>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'> {/*hier checklist secties mappen*/}

                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                        </div>
                        <h3 className='my-auto text-2xl font-medium rounded-2xl border-solid-4'>Eerste dag</h3>
                    </div>


                    <div className='flex justify-center gap-32 mt-16'>
                        <h3 className='my-auto text-2xl font-medium'>Eerste week</h3>
                        <div className='flex-col w-1/3'>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'> {/*hier checklist secties mappen*/}
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center gap-32 mt-16'>
                        <div className='flex-col w-1/3'>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'> {/*hier checklist secties mappen*/}
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                        </div>
                        <h3 className='my-auto text-2xl font-medium'>Tijdens de stage</h3>
                    </div>

                    <div className='flex justify-center gap-32 mt-16'>
                        <h3 className='my-auto text-2xl font-medium'>Laatste dag</h3>
                        <div className='flex-col w-1/3'>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'> {/*hier checklist secties mappen*/}
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                            <div className='flex bg-[#1a3854] rounded-lg p-5 mb-3'>
                                <p className='align-left'>Item 1</p>
                                <p className='text-[#5ab38a] text-sm ml-auto'>27/10/2023</p>
                            </div>
                        </div>
                    </div>


                </div>


                <br />
                <br />
                <br />
                <br />
                <br />

            </main>

            <footer className='bg-[#102234] p-8 text-white flex px-24'>
                <h2 className=''>iCapps Logo here</h2>
                <div className='flex ml-auto gap-16'>
                    <p>info@icapps.com</p>
                    <p>Hangar 26/27 - Rijnkaai 100 B16 - 2000 Antwerpen</p>
                </div>
            </footer>

        </>
    )
}
export default Delen;