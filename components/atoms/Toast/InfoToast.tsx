const InfoToast = ({ text }: { text: string }) => {
	return (
		<div className="toast toast-top toast-end">
			<div className="alert alert-info">
				<span>{text}</span>
			</div>
		</div>
	);
};

export default InfoToast;
