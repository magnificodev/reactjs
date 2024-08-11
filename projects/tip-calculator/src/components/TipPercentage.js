function TipPercentage({ tip, onPercentageUpdated, children }) {
    return (
        <div>
            <label>
                {children}
                <select
                    value={tip}
                    onChange={(e) =>
                        onPercentageUpdated(Number(e.target.value))
                    }
                >
                    <option value="0">Dissastified (0%)</option>
                    <option value="5">It was okay (5%)</option>
                    <option value="10">It was good (10%)</option>
                    <option value="20">Absolutely amazing! (20%)</option>
                </select>
            </label>
        </div>
    );
}

export default TipPercentage;
