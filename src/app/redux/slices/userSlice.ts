import { AppUser } from "@/app/interfaces";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchUser } from "../thunk/getUserThunk";

interface UserState {
  user: AppUser | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true,
};



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppUser>) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
    editUser: (state, action: PayloadAction<Partial<AppUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUser, clearUser, editUser } = userSlice.actions;
export default userSlice.reducer;
