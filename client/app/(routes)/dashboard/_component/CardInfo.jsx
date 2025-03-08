import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';
function CardInfo({ incomeList, totalExpense }) {
    const [totalIncome, setTotalIncome] = useState(0);
    const [numOfIncomes, setNumOfIncomes] = useState(0);

    useEffect(() => {
        console.log("Updated incomeList:", incomeList);
        console.log("Updated totalExpense:", totalExpense);
    
        if (!incomeList || incomeList.length === 0) {
            setTotalIncome(0);
            setNumOfIncomes(0);
        } else {
            const total = incomeList.reduce((sum, income) => sum + (income.amount || 0), 0);
            setTotalIncome(total);
            setNumOfIncomes(incomeList.length);
        }
    }, [incomeList, totalExpense]); // ✅ Ensure this runs whenever incomeList or totalExpense changes
    
    return (
       <div> 
        {incomeList? <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Income</h2>
                    <h2 className='font-bold text-2xl'>₹{totalIncome}</h2>
                </div>
                <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Spend</h2>
                    <h2 className='font-bold text-2xl'>₹{totalExpense}</h2>
                </div>
                <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>No. Of Incomes</h2>
                    <h2 className='font-bold text-2xl'>{numOfIncomes}</h2>
                </div>
                <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
            </div>
        </div>
        :<div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            :{[1,2,3].map((item,index)=>(
            <div key={index} className="w-full bg-slate-200 rounded-lg
        h-[110] animate-pulse">
          </div>
        ))}
        </div>
        }
        </div>
    );
}


export default CardInfo;
