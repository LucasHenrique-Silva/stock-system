
import { Router } from "express";


export const Routes = Router();
//CREATE
import createProductRoutes from "./create/createProduct.routes";
import { createUserRoutes } from "./create/createUser.routes";
import { createProductRoutesBarcode } from "./create/createProductBarcode.routes";
import { createCategoryRoutes } from "./create/createCategory.routes";
import { createStockEntryRoutes } from "./create/createStockEntry.routes";
import { createStockExitRoutes } from "./create/createStockExit.routes";
Routes.use("/create", createStockExitRoutes);
Routes.use("/create", createStockEntryRoutes);
Routes.use("/create", createProductRoutes);
Routes.use("/create", createUserRoutes);
Routes.use("/create", createProductRoutesBarcode);
Routes.use("/create", createCategoryRoutes);

//FIND
import { findUserRoutes } from "./find/findUser.routes";
import { findProductRoutes } from "./find/findProduct.routes";
import { findProductBarcodeRoutes } from "./find/findProductBarcode.routes";
import { findCategoryRoute } from "./find/findCategory.routes";
import { findStockEntryRoutes } from "./find/findStockEntry.routes";
import { findStockExitRoutes } from "./find/findStockExit.routes";
Routes.use("/find/stock-exits", findStockExitRoutes);
Routes.use("/find/stock-entries", findStockEntryRoutes);
Routes.use("/find/users", findUserRoutes);
Routes.use("/find", findProductRoutes);
Routes.use("/find", findProductBarcodeRoutes);
Routes.use("/find", findCategoryRoute)


//DELETE
import { deleteUserRoutes } from "./delete/deleteUser.routes";
import { deleteProductRoutes } from "./delete/deleteProduct.routes";
import { deleteProductBarCodeRoutes } from "./delete/deleteProductBarCode.routes";
import { deleteCategoryRoutes } from "./delete/deleteCategory.routes";
Routes.use("/delete", deleteProductBarCodeRoutes);
Routes.use("/delete", deleteUserRoutes);
Routes.use("/delete", deleteProductRoutes);
Routes.use("/delete", deleteCategoryRoutes)

//UPDATE
import { updateUserRoutes } from "./update/updateUser.routes";
import { updateProductRoutes } from "./update/updateProduct.routes";
import { updateProductBarcodeRoutes } from "./update/updateProductBarcode.routes";
import { updateCategoryRoutes } from "./update/updateCategore.routes";
Routes.use("/update", updateProductBarcodeRoutes);
Routes.use("/update", updateUserRoutes);
Routes.use("/update", updateProductRoutes);
Routes.use("/update", updateCategoryRoutes)


//REPORTS
import { FinancialReportRoutes } from "./reports/FinancialReport.routes";

Routes.use("/reports", FinancialReportRoutes);

//AUTH
import { authRoutes } from "./auth/login.routes";
Routes.use("/auth", authRoutes);


