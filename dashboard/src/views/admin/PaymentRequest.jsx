import {FixedSizeList as List} from "react-window";
import {forwardRef} from "react";

const handleOnWheel = ({deltaY}) => {
    console.log("handleOnWheel", deltaY)
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props}></div>
))


const PaymentRequest = () => {
    
    const Row = ({index, style}) => {
        return (
            <div style={style} className="flex text-sm">
                <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
                <div className="w-[25%] p-2 whitespace-nowrap">$1212</div>
                <div className="w-[25%] p-2 whitespace-nowrap">
                    <span className="py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-xs">pending</span>
                </div>
                <div className="w-[25%] p-2 whitespace-nowrap">19 Nov 2023</div>
                <div className="w-[25%] p-2 whitespace-nowrap">
                    <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm">Confirm</button>
                </div>
            </div>
        )
    }
    
    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full bg-[#283046] p-4 rounded-md">
                <h2 className="text-xl font-medium pb-5 text-white">Withdraw Request</h2>
                <div className="w-full">
                    <div className="w-full overflow-x-auto text-white">
                        <div className="flex bg-[#161d31] uppercase min-w-[340px]">
                            <div className="w-[25%] p-2 text-white">No</div>
                            <div className="w-[25%] p-2 text-white">Amount</div>
                            <div className="w-[25%] p-2 text-white">Status</div>
                            <div className="w-[25%] p-2 text-white">Date</div>
                            <div className="w-[25%] p-2 text-white">Action</div>
                        </div>
                        {
                            <List style={{
                                minWidth: "340px",
                            }} className="List" height={450} itemCount={100} itemSize={35} outerElementType={outerElementType}>
                                {Row}
                            </List>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PaymentRequest
