// SCSS
import classes from './Modal.module.scss'

const Modal = ({open, handleModalClose, title, children }) => {
  return (
    <div
      className={`modal fade ${classes.modalWindow} ${open ? 'show' : ''}`}
      tabIndex="-1"
      style={{display: open ? 'block' : 'none'}}
    >
      <div className="modal-dialog modal-xl modal-fullscreen-md-down pb-5">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button
              type="button"
              className={`btn-close ${classes.closeBtn}`}
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => handleModalClose(false)}
            >
              <img width="45" src="https://img.icons8.com/color/45/000000/close-window.png" alt="Close" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
