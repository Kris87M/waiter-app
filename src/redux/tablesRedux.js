//selectors

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const ACTION_TYPE = createActionName('ACTION_TYPE');
// action creators
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case ACTION_TYPE:
      return statePart;
    default:
      return statePart;
  };
};
export default tablesReducer;