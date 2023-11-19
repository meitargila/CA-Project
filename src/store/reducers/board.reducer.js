export const SET_BOARDS = "SET_BOARDS";
export const ADD_BOARD = "ADD_BOARD";
export const REMOVE_BOARD = "REMOVE_BOARD";
export const UPDATE_BOARD = "UPDATE_BOARD";

const initialState = {
  boards: null,
  filterBy: null,
};

export function boardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BOARDS:
      return {
        ...state,
        boards: action.boards,
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.board],
      };
    case REMOVE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.boardId),
      };
    case UPDATE_BOARD:
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.board.id ? action.board : board
        ),
      };
    default:
      return state;
  }
}