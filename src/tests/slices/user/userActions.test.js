import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { getUserInfo } from "../../../slices/user/userActions";

const store = configureStore({
  reducer: (state = "", action) => {
    switch (action.type) {
      case "user/me/fulfilled":
        return action.payload;
      default:
        return state;
    }
  },
});

describe("UserActions", () => {
  describe("/user/me", () => {
    it("should test success callback", async () => {
      const getSuccess = jest.spyOn(axios, "get").mockResolvedValueOnce({ data: { id: "123" } });
      await store.dispatch(getUserInfo());

      expect(getSuccess).toBeCalledWith("/user/me");
    });

    it("should test failed callback", async () => {
      jest.spyOn(axios, "get").mockRejectedValueOnce({ response: { data: "error" } });
      const response = await store.dispatch(getUserInfo());

      expect(response.error.message).toBe("Rejected");

      jest.spyOn(axios, "get").mockRejectedValueOnce({ response: {} });
      const response2 = await store.dispatch(getUserInfo());

      expect(response2.error.message).toBe("Rejected");
    });
  });
});