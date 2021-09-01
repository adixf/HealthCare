import React, { useState } from 'react'
import Charts from './Charts'
import Distributions from './Distributions'
import Options from './Options'
import Recipients from './Recipients'
import Volunteers from './Volunteers'

export default function AdminMain() {

    const [step, setStep] = useState(0)


    const renderSwitch = () => {
        switch(step) {
            case 0:
                return <Options 
                            showDistributions={() => setStep(1)}
                            showRecipients={() => setStep(2)}
                            showVolunteers={() => setStep(3)}
                            showCharts={() => setStep(4)}
                        />

            case 1:
                return <Distributions back={() => setStep(0)}/>

            case 2:
                return <Recipients back={() => setStep(0)}/>
    
            case 3:
                return <Volunteers back={() => setStep(0)}/>

            case 4:
                return <Charts back={() => setStep(0)}/>

            default:
                return <div>error</div>
        }
    }

    return (
        <div>
        {
            renderSwitch()
        }
        </div>
    )
}