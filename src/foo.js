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

export function getFoo(state) {
  return state.foo;
}
