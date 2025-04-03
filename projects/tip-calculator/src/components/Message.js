function Message({ bill, percentage, fPercentage }) {
    let myBill = Number(bill)
    let tipAverage = (myBill * ((percentage + fPercentage) / 2)) / 100;
    let total = myBill + tipAverage;
    return (
        <h1 className="message">
            You pay ${total} (${myBill} + ${tipAverage} tip)
        </h1>
    );
}

export default Message;
