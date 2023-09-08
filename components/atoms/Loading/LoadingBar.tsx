export enum ELoadingBarSize {
	xs = 'xs',
	sm = 'sm',
	md = 'md',
	lg = 'lg',
}

const LoadingBar = ({ size = ELoadingBarSize.sm }: { size: string }) => {
	return <span className={`loading loading-bars loading-${size}`}></span>;
};

export default LoadingBar;
