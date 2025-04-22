import userRoute from "./user.js";
import invoiceRoute from "./invoice.js";

const registerRoutes = (app) => {
  // all routes here
  app.use("/api/user", userRoute);
  app.use("/api/invoice", invoiceRoute);
};

export default registerRoutes;
