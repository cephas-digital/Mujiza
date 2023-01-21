import React, { useState, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { Buttons } from "../../Utils";
import { GlobalState } from "../../Data/Context";
import { MakeWallet } from ".";
import LoadMore, { BottomTab } from "../../Components/LoadMore";
import { WalletHistoryList } from "../users/wallet/[id]";

const Bonus = () => {
	let [isWallet, setIsWallet] = useState(false),
		toggleWallet = () => {
			setIsWallet(!isWallet);
		};

	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("manual wallet history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="bg-white aboutScreen">
				<Container className="py-5">
					<Buttons
						title={"manual top up"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
						width={"w-25 w25"}
						onClick={toggleWallet}
						style={{ borderRadius: "30px" }}
					/>
					<ManualHistory />
				</Container>
			</div>
			<MakeWallet isOpen={isWallet} back={toggleWallet} />
		</>
	);
};

export default Bonus;

const ManualHistory = () => {
	let { wallet, getManualBonusHistory } = useContext(GlobalState);

	let [data, setData] = useState(null);

	useEffect(() => {
		setData(wallet?.manual);
	}, [wallet?.manual]);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getManualBonusHistory("manual-funding", {
			limit: Number(
				wallet?.paginate_manual?.nextPage * wallet?.paginate_manual?.limit
			),
		});
		setLoading(false);
	};

	if (!data) return;
	// console.log({ data });

	return (
		<div className="pb-5 my-5">
			<WalletHistoryList state={data} />
			<BottomTab state={data} paginate={wallet?.paginate_manual} />
			<LoadMore
				next={wallet?.paginate_manual?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};
