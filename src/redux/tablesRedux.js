//selectors
export const getAllTables = state => state.tables;
export const getTableById = (state, id) => state.tables.find(table => table.id === id);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_SINGLE_TABLE = createActionName('UPDATE_SINGLE_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const updateSingleTable = payload => ({ type: UPDATE_SINGLE_TABLE, payload });

export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
    .then(res => res.json())
    .then(tables => dispatch(updateTables(tables)));
  };
};

export const updateTablesRequest = (updatedTable) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTable),
    };
    fetch(`http://localhost:3131/api/tables/${updatedTable.id}`, options)
      .then(() => dispatch(updateSingleTable(updatedTable)))
  }
}

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case UPDATE_SINGLE_TABLE:
      return statePart.map(table => table.id === action.payload.id ? action.payload : table);
    default:
      return statePart;
  };
};
export default tablesReducer;