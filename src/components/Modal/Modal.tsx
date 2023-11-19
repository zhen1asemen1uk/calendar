import { FC, ReactNode } from "react";

import stl from "./Modal.module.css";

interface IModal {
	handleClose: () => void;
	show: boolean;
	children: ReactNode;
}

const Modal: FC<IModal> = ({ handleClose, show, children }) => {
	const showHideClassName = show ? `${stl.active}` : "";

	return (
		<div className={`${stl.modal} ${showHideClassName}`} onClick={handleClose}>
			<section
				onClick={(e) => e.stopPropagation()}
				className={stl.modal_content}>
				{children}
			</section>
		</div>
	);
};
export default Modal;
