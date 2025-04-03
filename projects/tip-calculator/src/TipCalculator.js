import { useState } from "react";

import BillInput from "./components/BillInput";
import TipPercentage from "./components/TipPercentage";
import Message from "./components/Message";
import Button from "./components/Button";

function TipCalculator() {
    const [bill, setBill] = useState(0);
    const [percentage, setPercentage] = useState(20);
    const [fPercentage, setFPercentage] = useState(0);

    const handleUpdateBill = (num) => {
        setBill(num);
    };

    const handleUpdatePercentage = (num) => {
        setPercentage(num);
    };

    const handleUpdateFPercentage = (num) => {
        setFPercentage(num);
    };

    const handleReset = () => {
        setBill(0);
        setPercentage(0);
        setFPercentage(0);
    };

    return (
        <div>
            <BillInput bill={bill} onBillUpdated={handleUpdateBill}>
                How much was the bill?
            </BillInput>
            <TipPercentage
                tip={percentage}
                onPercentageUpdated={handleUpdatePercentage}
            >
                How did you like the service?
            </TipPercentage>
            <TipPercentage
                tip={fPercentage}
                onPercentageUpdated={handleUpdateFPercentage}
            >
                How did your friend like the service?
            </TipPercentage>

            {bill > 0 && (
                <>
                    <Message
                        bill={bill}
                        percentage={percentage}
                        fPercentage={fPercentage}
                    />
                    <Button onReset={handleReset} />
                </>
            )}
        </div>
    );
}

export default TipCalculator;
