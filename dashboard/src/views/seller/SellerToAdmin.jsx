import {useState} from "react";
import {IoMdClose} from "react-icons/io";
import {FaList} from "react-icons/fa";


const SellerToAdmin = () => {


    
    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full bg-secondary px-4 py-4 rounded-md h-[calc(100vh-140px)]">
                <div className="flex w-full h-full relative gap-10">
                 
                    {/*  message options */}
                    <div className="w-full  md:pl-4">
                        <div className="flex justify-between items-center">
                            <div className="flex justify-start items-center gap-3">
                                <div className="relative">
                                    <img className="w-[54px] h-[54px] ring-[3px] ring-green-500  max-w-[55px] p-[2px] rounded-full" src="http://localhost:5173//public/images/admin.jpg" alt=""/>
                                    <div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                                </div>
                                <h2 className="text-white font-semibold">Support</h2>
                            </div>
                        </div>
                        
                        <div className="py-4">
                            <div className="bg-slate-800 h-[calc(100vh-310px)] px-2 rounded-md overflow-y-auto">
                                {/* Received message */}
                                <div className="w-full flex justify-start items-center">
                                    <div className="flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                        <div>
                                            <img className="w-[38px] h-[38px] ring-[2px] ring-white  max-w-[38px] p-[2px] rounded-full" src="http://localhost:5173//public/images/admin.jpg" alt=""/>
                                        </div>
                                        <div className="flex justify-center items-start flex-col bg-orange-500 shadow-lg shadow-orange-500/50  text-white py-1 px-2 rounded-sm">
                                            <span>How are you?</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Send message */}
                                <div className="w-full flex justify-end items-center">
                                    <div className="flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                        <div className="flex justify-center items-center flex-col bg-blue-500 shadow-lg shadow-blue-500/50  text-white py-1 px-2 rounded-sm">
                                            <span>How are you?</span>
                                        </div>
                                        <div>
                                            <img className="w-[38px] h-[38px] ring-[2px] ring-white  max-w-[38px] p-[2px] rounded-full" src="http://localhost:5173//public/images/admin.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Send Message */}
                                <div className="w-full flex justify-end items-center">
                                    <div className="flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                        <div className="flex justify-center items-center flex-col bg-blue-500 shadow-lg shadow-blue-500/50  text-white py-1 px-2 rounded-sm">
                                            <span>How are you?</span>
                                        </div>
                                        <div>
                                            <img className="w-[38px] h-[38px] ring-[2px] ring-white  max-w-[38px] p-[2px] rounded-full" src="http://localhost:5173//public/images/admin.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                        
                        {/* Write Message */}
                        <form className="flex gap-3  items-center">
                            <input className="w-full flex justify-between px-3 border-slate-500 border items-center py-[8px] focus:border-blue-500 rounded-md outline-none bg-transparent text-white" type="text" placeholder="Input your message"/>
                            <button className="bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 font-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center transition-all duration-300">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SellerToAdmin
