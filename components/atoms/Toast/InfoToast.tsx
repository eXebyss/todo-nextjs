const InfoToast = ({ text }: { text: string }) => {
	return (
		<div className="toast toast-top toast-end z-10 lg:z-0">
			<div className="alert alert-info">
				<span>{text}</span>
			</div>
		</div>
	);
};

export default InfoToast;
