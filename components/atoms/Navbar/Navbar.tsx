import { CopyIcon, RefreshIcon, TrashIcon } from '@/icons';
import { InfoToast, SuccessToast } from '../Toast';
import useNavbar from './useNavbar';
import { ICollectionData } from '@/interfaces';

interface INavbarProps {
	currentCollectionData: ICollectionData;
	successMessage: string;
	setSuccessMessage: (message: string) => void;
	infoMessage: string;
	setInfoMessage: (message: string) => void;
}

const Navbar = ({
	currentCollectionData,
	successMessage,
	setSuccessMessage,
	infoMessage,
	setInfoMessage,
}: INavbarProps) => {
	const { copyToClipboard, refreshCollectionId, deleteCollectionId } =
		useNavbar(
			successMessage,
			setSuccessMessage,
			currentCollectionData,
			infoMessage,
			setInfoMessage
		);

	return (
		<nav className="navbar grid lg:flex gap-y-4 lg:gap-y-0 justify-center w-full mx-auto my-4 rounded-2xl shadow-lg text-center gap-x-4 p-4">
			<h1 className="normal-case lg:text-xl block">
				Collection ID:{' '}
				<span className="font-bold">
					{currentCollectionData?.todoCollection?.id}
				</span>
			</h1>

			<div className="flex gap-x-4 justify-evenly">
				<button
					className="btn lg:btn-ghost"
					type="button"
					title="Copy"
					onClick={copyToClipboard}
				>
					<CopyIcon />
				</button>
				<button
					className="btn lg:btn-ghost"
					type="button"
					title="Refresh"
					onClick={refreshCollectionId}
				>
					<RefreshIcon />
				</button>
				<button
					className="btn lg:btn-ghost"
					type="button"
					title="Delete"
					onClick={deleteCollectionId}
				>
					<TrashIcon />
				</button>
			</div>

			{infoMessage && <InfoToast text={infoMessage} />}
			{successMessage && <SuccessToast text={successMessage} />}
		</nav>
	);
};

export default Navbar;
