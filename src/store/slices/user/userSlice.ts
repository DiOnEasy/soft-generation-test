import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { RootState } from "../../store";
import { config } from "../../../config";

// Инициализация Firebase
const firebaseConfig = config.firebaseConfig;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Создание асинхронного Thunk для аутентификации через Google
export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Получаем данные пользователя сразу после успешного входа
    const userDocRef = doc(firestore, "users", result.user.uid);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();
    localStorage.setItem("userId", result.user.uid);
    return { user: result.user, userData };
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as User | null,
    userData: null as any | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userData = action.payload.userData;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default authSlice.reducer;

export const selectUserData = (state: RootState) => state.auth.userData;
