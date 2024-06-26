import React, { useState } from 'react';
import List from './List';

// Hold: editId, actionId
  
const ListTable = ({  lists,
                      handleSelect,
                      handleCreate,
                      handleUpdate,
                      handleDelete,
                      handleMove }) => {

  const [editId, setEditId] = useState(-1);
  const [actionId, setActionId] = useState(-1);

  const handleEdit = (myList) => {
    if (editId >= 0) {
      // Cancel current edit 
      const index  = lists.findIndex(obj => obj.id === myList.id);  // Index of list in edit mode
      handleCancelEdit(lists[index]);
    }
    setEditId(myList.id);
  };
  
  const handleCancelEdit = () => {
    // Delete list with temporary id = 0
    const index  = lists.findIndex(obj => obj.id === 0);
    if (index > -1) {
      lists.splice(index, 1); 
    }
    setEditId(-1);
  };

  const handleActionable = (myList) => {
    // Set one list actionable or withdraw actionable 
    if (actionId === myList.id) {
      setActionId(-1);
    } else {
      setActionId(myList.id);
    } 
  };
  
  const handleSave = (myList) => {
    if (myList.id === 0) {
      // Create new list
      handleCancelEdit(myList);
      handleCreate(myList);
    } else {
      // Update existing list
      handleCancelEdit(myList);
      handleUpdate(myList);
    }
  }

  const onCreate = () => {
    lists.push({id: 0});
    setEditId(0);
  };

  return (
    <div className="list-card">
      <div className="list-info tasks-caption">
        <div className="list-info">
          <div className="list-cell list-task">Lists</div>
          <div className="list-cell list-actions"><button className="task-button" onClick={onCreate}>*</button></div>
        </div>
        <hr className="task-line-caption"></hr>
      </div>

      {lists.map(myList => (
        <div className="task-card">
          <List
            key={myList.id}
            myList={myList} 
            editable={editId === myList.id}
            actionable={actionId === myList.id}
            handleSelect={handleSelect}
            handleDelete={handleDelete}
            handleMove={handleMove}
            handleEdit={handleEdit}
            handleCancelEdit={handleCancelEdit}
            handleActionable={handleActionable} 
            handleSave={handleSave}
          />
        </div>
      ))}
    </div>
  )
};

export default ListTable;
