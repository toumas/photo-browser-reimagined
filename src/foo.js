const ADD = 'APP/FOO/ADD';

export default function reducer(state = '', action = {}) {
  switch (action.type) {
    case ADD:
      return action.bar;

    default:
      return state;
  }
}

export function addBar(bar) {
  return { type: ADD, bar };
}

export const addBarAsync = bar => (dispatch) => {
  setTimeout(() => {
    dispatch(addBar(bar));
  }, 1000);
};

export function getFoo(state) {
  return state.foo;
}
