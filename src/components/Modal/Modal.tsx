import { FC, ReactNode } from "react";

import stl from "./Modal.module.css";

interface IModal {
	isModal: boolean;
	isModalSet: (set: boolean, child: ReactNode | null) => void;
	children: ReactNode | null;
}

const Modal: FC<IModal> = (props) => {
	const { isModal, isModalSet, children } = props;

	return (
		<div
			className={isModal ? `${stl.modal} ${stl.active}` : stl.modal}
			onClick={() => {
				isModalSet(false, null);
			}}>
			<div
				className={stl.modal_content}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
