import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import img1 from "../Assets/original-e0e275874b52009a537484d7785b9fa0 1.png";
import bg1 from "../Assets/grad-bg.png";
import bg2 from "../Assets/Rectangle_373.png";
import { Buttons, MiddleHeader } from "../Utils";
import { Container } from "reactstrap";
import imgDown2 from "../Assets/Saly-24.png";
import imgDown3 from "../Assets/Saly-26.png";
import imgDown4 from "../Assets/Saly-42.png";
const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
		AOS.init({ duration: 1000 });
	}, []);
	return (
		<>
			<HeroBanner />
			<WhatWeDo />
			<ProductServices />
			<NewsLetter />
			<SupportHeader />
			<SuportChannels />
			<GainHeader />
			<StandToGain />
			<CustomerHeader />
		</>
	);
};

export default Home;

const HeroBanner = () => {
	return (
		<div
			className=""
			style={{
				background: `url(${bg1})`,
			}}>
			<section className="container aboutScreen d-flex hero fullOverflow">
				<section className="row container my-auto">
					<div className="col-lg-6 d-flex h-100 my-auto">
						<div className="my-auto" data-aos="fade-up-right">
							<h1
								className="textColor text5 mb-3 mainText"
								data-aos="zoom-in"
								data-aos-delay="1000">
								Buy Data Easily
							</h1>
							<h2
								className="textColor2 text2 mb-3 mainText"
								data-aos="zoom-in"
								data-aos-delay="1000">
								GLO, MTN, 9Mobile, Airtel
							</h2>
							<p
								className="w-75 mb-5 fontReduce fontReduceMaxhead"
								data-aos="zoom-in"
								data-aos-delay="2000">
								In a few clicks, buy data to keep surfing the internet. You can
								buy whatever size of data plan for whichever network you desire.
								Get Started
							</p>
							<div className="d-flex p-2 w-75">
								<Link
									to={"/login"}
									className="text-decoration-none btn btn-primary1 text-capitalize px-4 py-3 hug">
									Get started
								</Link>
							</div>
						</div>
					</div>
					<div
						className="col-lg-6 h-100 my-auto d-flex"
						data-aos="fade-up-left">
						<img src={img1} alt="Banner" className="img-fluid mx-auto" />
					</div>
				</section>
			</section>
		</div>
	);
};

const WhatWeDo = () => {
	return (
		<div className="py-5 my-5">
			<section
				className="py-5"
				style={{
					background: `url(${bg2})`,
				}}>
				<MiddleHeader text={"Services We Render"} />
				<div className="d-flex justify-content-center">
					<p className="text-center w-50 w50 fontReduce">
						Enjoy Your data and airtime purchases with the best selling discount
						and Get Your Cable subscriptions in a moment and more...
					</p>
				</div>
			</section>
		</div>
	);
};

export const ProductServices = () => {
	let type = [
		{
			name: "data Services",
			description: `Mu'ujiza is a reliable and affordable platform for purchasing affordable data bundles and airtime top-ups for any Nigerian network. We offer competitive pricing for data plans from Airtel, MTN, 9mobile, and Glo.`,
		},
		{
			name: "Airtime Services",
			description: `Mu'ujiza offers convenient and rapid airtime top-up services at competitive rates. Our low charges and quick recharge services make it easy for customers to top up their airtime.`,
		},
		{
			name: "Cable Subscription",
			description: `At Mu'ujiza, we offer discounted rates for renewing your DSTV, GOTV, and Startimes subscriptions, allowing you to save money on your cable service. Our convenient access to subscription renewal saves you time and effort in obtaining your cable service.`,
		},
		{
			name: "WAEC/NECO scratch cards",
			description: `Mu'ujiza is your go-to source for various examination scratch cards, including those for Waec, Neco, and Nabteb. We take pride in providing top-quality service and aim to make our website your go-to destination after your first experience with us. Our priority is your satisfaction.`,
		},
		{
			name: " Swiftest Delivery   ",
			description: `At Mu'ujiza, we are committed to providing prompt delivery of all services purchased through our platform. We promise to deliver value for every transaction in a timely manner, ensuring that you receive the services you need in a timely and efficient manner.`,
		},
		{
			name: "good customer care service",
			description: `Mu'ujiza has a team of well-trained customer support agents available 24/7 to assist you with any issues you may have. We offer multiple channels of communication to ensure that you can easily reach us and receive prompt assistance.`,
		},
	];
	return (
		<Container>
			<div className=" product-service  pb-5">
				{type?.map((item, i) => (
					<div className="position-relative my-3 eachProduct" key={i}>
						{i % 2 !== 0 && (
							<>
								<div className="abs1" />
							</>
						)}
						<div className="p-3 productDiv pb-1 ">
							<strong className="text-end d-block">
								{i <= 10 ? "0" : ""}
								{i + 1}
							</strong>
							<h4 className="text-capitalize mb-4">{item?.name}</h4>
							<p className="pb-md-5 fontReduce">{item?.description}</p>
							<div className="pb-5 d-none d-md-block" />
							<div className="pb-5 d-none d-md-block" />
						</div>
					</div>
				))}
			</div>
		</Container>
	);
};

export const NewsLetter = () => {
	return (
		<>
			<Container className="py-5">
				<div className="bg-select-2 py-5">
					<h3 className="text-center pt-5 pb-4 text-white">
						Subscribe Newletters
					</h3>
					<div className="broderColor bg-white mx-auto w-50 w50 d-flex py-3">
						<input
							type="email"
							name="email"
							id=""
							className="form-control bg-transparent py-3 border-0 fontReduce"
							placeholder="example@mail.com"
						/>
						<Buttons
							title={"subscribe now"}
							width="mx-auto"
							css={"btn-primary1 text-capitalize py-1 px-3 me-2 me-lg-5"}
						/>
					</div>
				</div>
			</Container>
		</>
	);
};

const SupportHeader = () => {
	return (
		<div className="py-5">
			<section className="py-5">
				<MiddleHeader text={"Our Support Channels"} />
				<div className="d-flex justify-content-center">
					<p className="text-center w-50 w50 fontReduce">
						Our well trained customer support agents are always available 24/7
						to help you resolve any issues. We provide you with multiple ways to
						reach us and get fast help.
					</p>
				</div>
			</section>
		</div>
	);
};

export const SuportChannels = () => {
	let type = [
		// {
		//   name: "24/7 Livechat Support",
		//   description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis.`,
		//   image: imgDown1,
		// },
		{
			name: "Chat Us On Facebook",
			description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis.`,
			image: imgDown2,
		},
		{
			name: "Talk to us on Whatsapp",
			description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis.`,
			image: imgDown3,
		},
		{
			name: "Send Us Mail",
			description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis.`,
			image: imgDown4,
		},
	];
	return (
		<Container>
			<div className="d-grid product-service product-service2 py-5">
				{type?.map((item, i) => (
					<div className="" key={i}>
						<div className="p-3 productDiv py-5 px-4">
							<h4 className="text-capitalize mb-4">{item?.name}</h4>
							{/* <p className="pb-3 fontReduce">{item?.description}</p> */}
							<Link
								to={"/login"}
								className="text-decoration-none btn btn-primary1 text-capitalize px-4 py-3 hug">
								Get in touch
							</Link>
							<div className="pb-5" />
							<img
								src={item?.image}
								alt="Support"
								className="img-fluid mx-auto d-block imgDown"
							/>
						</div>
					</div>
				))}
			</div>
		</Container>
	);
};

export const GainHeader = () => {
	return (
		<div className="py-5">
			<section className="py-5">
				<MiddleHeader text={"What you stand to gain with us"} />
				<div className="d-flex justify-content-center">
					<p className="text-center w-50 w50 fontReduce">
						With Mu'ujiza, You will enjoy a fast data delivery with Optimal
						security and also enjoy the best offers and discount sales on all
						our products periodically
					</p>
				</div>
			</section>
		</div>
	);
};

export const StandToGain = () => {
	let type = [
		{
			name: "Optimized for Speed",
			description: `Our data delivery is super-fast. We understand that you need data and you need it NOW!`,
		},
		// {
		//   name: "Track all Activities",
		//   description: `You can track all purchases as they are all stored, you can also filter transactions per mobile line.`,
		// },
		{
			name: "Optimal Security",
			description: `We take the security of your account seriously, we are committed to preventing data loss or leak.`,
		},
		// {
		//   name: "Developer Friendly",
		//   description: `Our APIs are available, alongside documentation that is easy to comprehend and integrate`,
		// },
		{
			name: "Discounts & Bonuses",
			description: `Periodically, Mu'ujiza offers the best discounts and special deals on all of our services, including data, airtime, and cable subscriptions. Stay tuned for updates on our special offers and take advantage of the opportunity to save on these services.`,
		},
		// {
		//   name: "Wonderful Support",
		//   description: `We provide excellent 24/7 support through various channels; Facebook, WhatsApp and Ticket System.`,
		// },
	];
	return (
		<Container>
			<div className="d-grid product-service pb-5">
				{type?.map((item, i) => (
					<div className="eachProduct" key={i}>
						<div className="p-3 productDiv py-md-5 rounded">
							<h4 className="text-capitalize mb-4">{item?.name}</h4>
							<p className="fontReduce">{item?.description}</p>
						</div>
					</div>
				))}
			</div>
		</Container>
	);
};

const CustomerHeader = () => {
	return (
		<div className="py-5">
			<section className="py-5">
				<MiddleHeader text={"Hear our customers speak"} />
				<div className="d-flex justify-content-center">
					<p className="text-center w-50 w50 fontReduce">
						Ever since i started business with Mu'ujiza it has been all
						smiles...they have the best customer service team ever...prompt and
						fast response to issues. Kemtech enterprises thanks for always being
						true.
					</p>
				</div>
			</section>
		</div>
	);
};
