import './MDLoading.css';
import { Modal } from '@mui/material';

function MDLoading({ open }) {
    return (
        <Modal open={open} >
            <div className='deleteModal_cont' >
                <h2>Deleting ...</h2>
            </div>
        </Modal>
    );
}

export default MDLoading