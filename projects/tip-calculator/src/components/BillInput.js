function BillInput({ bill, onBillUpdated, children }) {
    return (
        <div>
            <label>
                {children}
                <input
                    type="number"
                    value={bill}
                    onChange={(e) => onBillUpdated(e.target.value)}
                />
            </label>
        </div>
    );
}

export default BillInput;
