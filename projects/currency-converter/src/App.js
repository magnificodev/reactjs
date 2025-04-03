// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
    const [amount, setAmount] = useState();
    const [source, setSource] = useState("USD");
    const [destination, setDestination] = useState("EUR");
    const [result, setResult] = useState();
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const convert = async () => {
            try {
                setIsLoading(true);
                setErrMsg("");
                const response = await fetch(
                    `https://api.frankfurter.app/latest?amount=${amount}&from=${source}&to=${destination}`,
                    { signal }
                );

                const data = await response.json();
                if (data.rates) {
                    setResult(data.rates[destination]);
                } else {
                    throw new Error();
                }
            } catch (err) {
                if (err.name !== "AbortError") setErrMsg(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        if (!amount) return;
        if (source === destination) {
            return setErrMsg("Cannot convert the two same");
        }
        convert();

        return () => controller.abort();
    }, [amount, source, destination]);

    return (
        <div>
            <input
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
                value={amount || ""}
            />
            <select onChange={(e) => setSource(e.target.value)} value={source}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <select
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
            >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>
                {errMsg
                    ? errMsg
                    : isLoading
                    ? "Loading..."
                    : amount
                    ? `${result} ${destination}`
                    : "OUTPUT"}
            </p>
        </div>
    );
}
