import React, { useState, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { Buttons } from "../../Utils";
import { GlobalState } from "../../Data/Context";
import { MakeBonus } from ".";
import LoadMore, { BottomTab } from "../../Components/LoadMore";
import { WalletHistoryList } from "../users/wallet/[id]";

const Bonus = () => {
	let [isBonus, setIsBonus] = useState(false),
		toggleBonus = () => {
			setIsBonus(!isBonus);
		};

	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("give bonus history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="bg-white aboutScreen">
				<Container className="py-5">
					<Buttons
						title={"give bonus"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
						width={"w-25 w25"}
						onClick={toggleBonus}
						style={{ borderRadius: "30px" }}
					/>
					<BonusHistory />
				</Container>
			</div>
			<MakeBonus isOpen={isBonus} back={toggleBonus} />
		</>
	);
};

export default Bonus;

const BonusHistory = () => {
	let { bonus, getManualBonusHistory } =
		useContext(GlobalState);

	let [data, setData] = useState(null);

	useEffect(() => {
		setData(bonus?.give_bonus);
	}, [bonus?.give_bonus]);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getManualBonusHistory("manage-bonus", {
			limit: Number(
				bonus?.paginate_bonus?.nextPage * bonus?.paginate_bonus?.limit
			),
		});
		setLoading(false);
	};

	if (!data) return;
	// console.log({ data });

	return (
		<div className="pb-5 my-5">
			<WalletHistoryList state={data} />
			<BottomTab state={data} paginate={bonus?.paginate_bonus} />
			<LoadMore
				next={bonus?.paginate_bonus?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};
