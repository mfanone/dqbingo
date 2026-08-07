import React from 'react';

function FloatingPanel({ title, onClose, children }) {
	return (
		<div className="floating-panel-backdrop" onClick={onClose}>
			<div
				className="floating-panel"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<button
					className="floating-panel-close"
					onClick={onClose}
					aria-label={`Close ${title}`}
				>
					&times;
				</button>
				<div className="floating-panel-body">{children}</div>
			</div>
		</div>
	);
}

export default FloatingPanel;
