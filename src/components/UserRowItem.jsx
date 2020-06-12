import React from "react";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const UserRowItem = (props) => {
  const userID = parseInt(props.userID, 10);
  const { guid, age, name } = props.value;
  return (
    <tr key={userID}>
      <td key={`id_${guid}`}>{(userID+1)}</td>
      <td key={`nf_${guid}`}>{name.first}</td>
      <td key={`nl_${guid}`}>{name.last}</td>
      <td key={`age_${guid}`}>{age}</td>
      <td key={`actoions_${guid}`}>
        <span
          key={`actedit_${guid}`}
        className='actions'>
          <Link key={`lnk_ed_${guid}`}
            to={`/edit/${userID}`}><Button variant="outline-secondary">Edit</Button></Link>
        </span>
        <span key={`actdelete_${guid}`}
        className='actions'>
        <Link to="/" onClick={(() => {})} ><Button variant="outline-danger">Del</Button></Link>
        </span>
      </td>
    </tr>
  );
}
export default UserRowItem;
