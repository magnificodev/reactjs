import { connect } from "react-redux";
import formatCurrency from "../../utils/formatCurrency";

function BalanceDisplay({ balance }) {
    return <div className="balance">{formatCurrency(balance)}</div>;
}

const mapStateToProps = (state) => ({
    balance: state.account.balance,
});

export default connect(mapStateToProps)(BalanceDisplay);
