import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InfoState {
  username: string | null;
  token: string | null;
}

const initialState: InfoState = {
  username: null,
  token: null,
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<{ username: string; token: string }>) {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    clearUserInfo(state) {
      state.username = null;
      state.token = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = infoSlice.actions;
export default infoSlice.reducer;
