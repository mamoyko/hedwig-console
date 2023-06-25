import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { getAuditTrailList } from "../../../slices/auditTrail/auditTrailActions";
import { auditTrailState } from "../../../slices/auditTrail/auditTrailSlice";

const store = configureStore({
  reducer: (state = "", action) => {
    switch (action.type) {
      case "getAuditTrailList/fulfilled":
        return action.payload;
      default:
        return state;
    }
  },
});

describe("AuditTrailActions", () => {
  describe("/blasts/audit-trail", () => {
    it("should test success callback", async () => {
      const params = { page: 1, limit: 10 };
      const getSuccess = jest.spyOn(axios, "get").mockResolvedValueOnce({ data: { id: "123" } });
      await store.dispatch(getAuditTrailList(params));

      expect(getSuccess).toBeCalledWith("/blasts/audit-trail", { params: params });
    });

    it("should test failed callback", async () => {
      jest.spyOn(axios, "get").mockRejectedValueOnce({ response: { data: "error" } });
      const response = await store.dispatch(getAuditTrailList());

      expect(response.error.message).toBe("Rejected");

      jest.spyOn(axios, "get").mockRejectedValueOnce({ response: {} });
      const response2 = await store.dispatch(getAuditTrailList());

      expect(response2.error.message).toBe("Rejected");
    });
  });

  it("should return state values", async () => {
    const state = auditTrailState({ auditTrail: "test" });

    expect(state).toBe("test");
  });
});