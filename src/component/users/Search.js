import { useState, Fragment } from "react";
import PropTypes from 'prop-types'

const Search = ({ searchUsers, ShowClear, ClearUsers, SetAlert }) => {
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (text === '') {
            SetAlert();
        }
        else {
            searchUsers(text);
            setText('');
        }
    }

    return (
        <Fragment>
            <form className='form' onSubmit={onSubmit}>
                <input type='text' value={text} name='text' onChange={onChange} placeholder='Search Users' />
                <input type='submit' className='btn btn-dark btn-block' value='Search'></input>
            </form>
            {ShowClear && (<input type='button' value='Clear' className='btn btn-light btn-block' onClick={ClearUsers}></input>)}
        </Fragment>
    );
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    ShowClear: PropTypes.bool.isRequired,
    ClearUsers: PropTypes.func.isRequired,
    SetAlert: PropTypes.func.isRequired
}

export default Search;