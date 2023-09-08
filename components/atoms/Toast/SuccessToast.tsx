const SuccessToast = ({ text }: { text: string }) => {
	return (
		<div className="toast toast-top toast-end">
			<div className="alert alert-success">
				<span>{text}</span>
			</div>
		</div>
	);
};

export default SuccessToast;
