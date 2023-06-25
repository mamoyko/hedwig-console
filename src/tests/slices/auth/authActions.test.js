import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../../../slices/auth/authActions";
import { authState } from "../../../slices/auth/authSlice";

const store = configureStore({
  reducer: (state = "", action) => {
    switch (action.type) {
      case "user/login/fulfilled":
      case "user/logout/fulfilled":
        return action.payload;
      default:
        return state;
    }
  },
});

describe("AuthActions", () => {
  describe("/user/login", () => {
    it("should test success callback", async () => {
      const values = { email: "123@123.com", password: "password" };

      const postSuccess = jest.spyOn(axios, "post").mockResolvedValueOnce({ data: { token: "123" } });
      await store.dispatch(loginUser(values));

      expect(postSuccess).toBeCalledWith("/user/login", values);
    });

    it("should test failed callback", async () => {
      const values = { email: "123@123.com", password: "password" };

      jest.spyOn(axios, "post").mockRejectedValueOnce({ response: { data: "error" } });
      const response = await store.dispatch(loginUser(values));

      expect(response.error.message).toBe("Rejected");
    });
  });

  describe("/user/logout", () => {
    it("should test success callback", async () => {
      const getSuccess = jest.spyOn(axios, "get").mockResolvedValueOnce({ data: { message: "logout" } });
      await store.dispatch(logoutUser());

      expect(getSuccess).toBeCalledWith("/user/logout");
    });

    it("should test failed callback", async () => {
      const postSuccess = jest.spyOn(axios, "get").mockRejectedValueOnce({ response: { data: "error" } });
      const response = await store.dispatch(logoutUser());

      expect(response.error.message).toBe("Rejected");
      expect(postSuccess).toBeCalledWith("/user/logout");

      jest.spyOn(axios, "get").mockRejectedValueOnce({ response: { error: "error" } });
      await store.dispatch(logoutUser());
    });
  });

  it("should return state values", async () => {
    const state = authState({ auth: "test" });

    expect(state).toBe("test");
  });
});